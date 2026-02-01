'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Droplet, Zap } from 'lucide-react';
import { RowTable } from './row-table';
import { RowDetailModal } from './row-detail-modal';
import { MetricCard } from './metric-card';
import type { RowData } from '@/types';

interface GreenhouseData {
  greenhouseName: string;
  numberOfRows: number;
  soilType: string;
  irrigationType: string;
  rows: RowData[];
}

interface RowWithAdvisory extends RowData {
  growthStage: string;
  irrigationDecision: string;
  irrigationMinutes: number;
  fertilizerRecommendation: string;
  advice: string;
  riskAlert: string;
  cropAge: number;
  bestPracticeTip: string;
}

interface AdvisoryDashboardProps {
  data: GreenhouseData | null;
  onBack: () => void;
}

function calculateGrowthStage(plantingDate: string, cropType: string): string {
  const plantDate = new Date(plantingDate);
  const today = new Date();
  const daysOld = Math.floor((today.getTime() - plantDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysOld < 7) return 'Germination';
  if (daysOld < 21) return 'Seedling';
  if (daysOld < 45) return 'Vegetative Growth';
  if (daysOld < 60) return 'Flowering';
  return 'Fruiting';
}

function generateAdvisory(
  row: RowData,
  soilType: string,
  irrigationType: string
): Omit<RowWithAdvisory, 'id' | 'cropType' | 'plantingDate' | 'soilMoisture'> {
  const plantDate = new Date(row.plantingDate);
  const today = new Date();
  const cropAge = Math.floor((today.getTime() - plantDate.getTime()) / (1000 * 60 * 60 * 24));
  const growthStage = calculateGrowthStage(row.plantingDate, row.cropType);

  // Determine irrigation decision based on soil moisture and growth stage
  let irrigationMinutes = 0;
  let irrigationDecision = 'Skip';
  if (row.soilMoisture < 30) {
    irrigationDecision = 'Urgent';
    irrigationMinutes = cropAge > 30 ? 45 : 30;
  } else if (row.soilMoisture < 50) {
    irrigationDecision = `${irrigationType === 'Drip' ? 20 : 30} minutes`;
    irrigationMinutes = irrigationType === 'Drip' ? 20 : 30;
  } else if (row.soilMoisture < 70) {
    irrigationDecision = `${irrigationType === 'Drip' ? 10 : 15} minutes`;
    irrigationMinutes = irrigationType === 'Drip' ? 10 : 15;
  }

  // Fertilizer recommendation based on growth stage
  let fertilizerRecommendation = 'Balanced NPK';
  if (growthStage === 'Vegetative Growth') {
    fertilizerRecommendation = 'High N';
  } else if (growthStage === 'Flowering' || growthStage === 'Fruiting') {
    fertilizerRecommendation = 'High K';
  }

  // Risk alert based on soil type and crop
  let riskAlert = 'Normal';
  if (soilType === 'Clay' && row.soilMoisture > 75) {
    riskAlert = '⚠️ High Humidity – Disease Risk';
  } else if (soilType === 'Sandy' && row.soilMoisture < 40) {
    riskAlert = '⚠️ Drought Stress – Monitor closely';
  }

  // Crop-specific advice
  const adviceMap: Record<string, string> = {
    Tomato: 'Ensure consistent watering. Mulch to retain moisture and prevent fruit crack.',
    Capsicum: 'Maintain 60-70% soil moisture. Avoid waterlogging.',
    Cucumber: 'Keep soil consistently moist. Provide climbing support and shade in extreme heat.',
    Lettuce: 'Water frequently but lightly. Harvest before bolting in hot weather.',
  };

  const bestPracticeTips: Record<string, string> = {
    Tomato: 'Prune suckers for better air circulation and reduce disease risk.',
    Capsicum: 'Hand-pollinate flowers in the morning for better fruit set.',
    Cucumber: 'Train on trellises to save space and improve air circulation.',
    Lettuce: 'Harvest outer leaves first to extend production cycle.',
  };

  return {
    growthStage,
    irrigationDecision,
    irrigationMinutes,
    fertilizerRecommendation,
    advice: adviceMap[row.cropType] || 'Follow standard practices for your crop.',
    riskAlert,
    cropAge,
    bestPracticeTip: bestPracticeTips[row.cropType] || 'Monitor plant health regularly.',
  };
}

export function AdvisoryDashboard({ data, onBack }: AdvisoryDashboardProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  if (!data) return null;

  const advisoryRows: RowWithAdvisory[] = data.rows.map((row) => ({
    ...row,
    ...generateAdvisory(row, data.soilType, data.irrigationType),
  }));

  // Calculate metrics
  const waterSavedPercent = Math.round(
    100 - (advisoryRows.filter((r) => r.irrigationDecision !== 'Skip').length / advisoryRows.length) * 100
  );
  const fertilizerEfficiency = Math.round((advisoryRows.filter((r) => r.riskAlert === 'Normal').length / advisoryRows.length) * 100);
  const rowsNeedingAttention = advisoryRows.filter((r) => r.riskAlert.includes('⚠️')).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{data.greenhouseName}</h1>
            <p className="text-sm text-muted-foreground">
              {data.soilType} soil • {data.irrigationType} irrigation • {data.rows.length} rows
            </p>
          </div>
          <Button onClick={onBack} variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Summary Metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Water Saved Today"
            value={`${waterSavedPercent}%`}
            icon={<Droplet className="h-5 w-5" />}
            color="bg-blue-50"
            borderColor="border-blue-200"
          />
          <MetricCard
            title="Fertilizer Efficiency"
            value={`${fertilizerEfficiency}%`}
            icon={<Zap className="h-5 w-5" />}
            color="bg-green-50"
            borderColor="border-green-200"
          />
          <MetricCard
            title="Rows Needing Attention"
            value={rowsNeedingAttention}
            icon={<AlertCircle className="h-5 w-5" />}
            color={rowsNeedingAttention > 0 ? 'bg-orange-50' : 'bg-green-50'}
            borderColor={rowsNeedingAttention > 0 ? 'border-orange-200' : 'border-green-200'}
          />
        </div>

        {/* Row-Wise Advisory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Row-Wise Advisory</CardTitle>
            <CardDescription>Click on any row to see detailed recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <RowTable rows={advisoryRows} onRowClick={(index) => setSelectedRowIndex(index)} />
          </CardContent>
        </Card>
      </div>

      {/* Row Detail Modal */}
      {selectedRowIndex !== null && (
        <RowDetailModal
          row={advisoryRows[selectedRowIndex]}
          onClose={() => setSelectedRowIndex(null)}
        />
      )}
    </div>
  );
}
