import React from "react"
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

export function MetricCard({ title, value, icon, color, borderColor }: MetricCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor} ${color}`}>
      <div className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </Card>
  );
}
