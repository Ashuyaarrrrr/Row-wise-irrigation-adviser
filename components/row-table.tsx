'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { RowData } from '@/types';

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

interface RowTableProps {
  rows: RowWithAdvisory[];
  onRowClick: (index: number) => void;
}

export function RowTable({ rows, onRowClick }: RowTableProps) {
  const getIrrigationColor = (decision: string) => {
    if (decision === 'Skip') return 'text-gray-500';
    if (decision === 'Urgent') return 'text-destructive font-semibold';
    return 'text-primary font-medium';
  };

  const getFertilizerColor = (rec: string) => {
    if (rec === 'High N') return 'bg-blue-50 text-blue-700 border border-blue-200';
    if (rec === 'High K') return 'bg-purple-50 text-purple-700 border border-purple-200';
    return 'bg-green-50 text-green-700 border border-green-200';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow className="hover:bg-secondary">
            <TableHead className="font-semibold text-foreground">Row ID</TableHead>
            <TableHead className="font-semibold text-foreground">Crop</TableHead>
            <TableHead className="font-semibold text-foreground">Growth Stage</TableHead>
            <TableHead className="font-semibold text-foreground">Irrigation</TableHead>
            <TableHead className="font-semibold text-foreground">Fertilizer</TableHead>
            <TableHead className="font-semibold text-foreground">Soil Moisture</TableHead>
            <TableHead className="font-semibold text-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              className="cursor-pointer transition-colors hover:bg-secondary"
              onClick={() => onRowClick(index)}
            >
              <TableCell className="font-medium text-primary">{row.id}</TableCell>
              <TableCell>{row.cropType}</TableCell>
              <TableCell className="text-sm">{row.growthStage}</TableCell>
              <TableCell className={`font-medium ${getIrrigationColor(row.irrigationDecision)}`}>
                {row.irrigationDecision}
              </TableCell>
              <TableCell>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getFertilizerColor(row.fertilizerRecommendation)}`}>
                  {row.fertilizerRecommendation}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${row.soilMoisture}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{row.soilMoisture}%</span>
                </div>
              </TableCell>
              <TableCell>
                <button className="text-sm font-medium text-primary hover:underline">View Details</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
