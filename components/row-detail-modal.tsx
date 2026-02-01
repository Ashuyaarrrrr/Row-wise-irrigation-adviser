'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Calendar, Sprout, AlertTriangle, Lightbulb } from 'lucide-react';
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

interface RowDetailModalProps {
  row: RowWithAdvisory;
  onClose: () => void;
}

export function RowDetailModal({ row, onClose }: RowDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl border-primary bg-background shadow-lg">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{row.id} - {row.cropType}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{row.growthStage}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {/* Crop Age & Growth Stage */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-secondary p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Crop Age
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{row.cropAge} days</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sprout className="h-4 w-4" />
                Growth Stage
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{row.growthStage}</p>
            </div>
          </div>

          {/* Irrigation Details */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="mb-3 font-semibold text-foreground">Irrigation Recommendation</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Decision</p>
                <p className="mt-1 text-lg font-bold text-primary">{row.irrigationDecision}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="mt-1 text-lg font-bold text-primary">{row.irrigationMinutes} minutes</p>
              </div>
            </div>
          </div>

          {/* Fertilizer Type */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="mb-3 font-semibold text-foreground">Fertilizer Type</h3>
            <div className="inline-block rounded-full bg-primary px-4 py-2 text-primary-foreground font-medium">
              {row.fertilizerRecommendation}
            </div>
          </div>

          {/* Risk Alert */}
          {row.riskAlert.includes('⚠️') && (
            <div className="rounded-lg border-l-4 border-l-destructive bg-destructive/10 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h4 className="font-semibold text-destructive">Risk Alert</h4>
                  <p className="mt-1 text-sm text-foreground">{row.riskAlert}</p>
                </div>
              </div>
            </div>
          )}

          {/* Best Practice Tip */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex gap-3">
              <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Best Practice Tip</h4>
                <p className="mt-1 text-sm text-foreground">{row.bestPracticeTip}</p>
              </div>
            </div>
          </div>

          {/* Key Farming Advice */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h4 className="mb-2 font-semibold text-foreground">Key Farming Advice</h4>
            <p className="text-sm text-foreground leading-relaxed">{row.advice}</p>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <Button onClick={onClose} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
}
