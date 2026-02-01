'use client';

import { useState } from 'react';
import { FormSetup } from '@/components/form-setup';
import { AdvisoryDashboard } from '@/components/advisory-dashboard';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface GreenhouseData {
  greenhouseName: string;
  numberOfRows: number;
  soilType: string;
  irrigationType: string;
  rows: RowData[];
}

interface RowData {
  id: string;
  cropType: string;
  plantingDate: string;
  soilMoisture: number;
}

export default function AdvisoryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [greenhouseData, setGreenhouseData] = useState<GreenhouseData | null>(null);

  const handleFormSubmit = (data: GreenhouseData) => {
    setGreenhouseData(data);
    setSubmitted(true);
  };

  const handleBackToForm = () => {
    setSubmitted(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {!submitted ? (
          <FormSetup onSubmit={handleFormSubmit} />
        ) : (
          <AdvisoryDashboard data={greenhouseData} onBack={handleBackToForm} />
        )}
      </main>
      <Footer />
    </>
  );
}
