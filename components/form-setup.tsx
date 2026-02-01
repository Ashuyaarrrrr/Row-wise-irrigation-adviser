'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Leaf, Plus, Trash2 } from 'lucide-react';

interface RowData {
  id: string;
  cropType: string;
  plantingDate: string;
  soilMoisture: number;
}

interface FormSetupProps {
  onSubmit: (data: any) => void;
}

export function FormSetup({ onSubmit }: FormSetupProps) {
  const [greenhouseName, setGreenhouseName] = useState('');
  const [numberOfRows, setNumberOfRows] = useState(3);
  const [soilType, setSoilType] = useState('');
  const [irrigationType, setIrrigationType] = useState('');
  const [rows, setRows] = useState<RowData[]>(
    Array.from({ length: 3 }, (_, i) => ({
      id: `R${i + 1}`,
      cropType: '',
      plantingDate: '',
      soilMoisture: 50,
    }))
  );

  const handleRowChange = (index: number, field: string, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow: RowData = {
      id: `R${rows.length + 1}`,
      cropType: '',
      plantingDate: '',
      soilMoisture: 50,
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (!greenhouseName || !soilType || !irrigationType) {
      alert('Please fill in all greenhouse setup fields');
      return;
    }

    const allRowsValid = rows.every((row) => row.cropType && row.plantingDate);
    if (!allRowsValid) {
      alert('Please fill in all row details');
      return;
    }

    onSubmit({
      greenhouseName,
      numberOfRows: rows.length,
      soilType,
      irrigationType,
      rows,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">GrowAdvisor</h1>
            <p className="text-sm text-muted-foreground">Intelligent Irrigation & Fertilizer Advisory System</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="space-y-6">
          {/* Section A: Greenhouse Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Greenhouse Setup</CardTitle>
              <CardDescription>Configure your greenhouse details (one-time setup)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Greenhouse Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., North Farm Greenhouse"
                    value={greenhouseName}
                    onChange={(e) => setGreenhouseName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Input id="rows" type="number" value={numberOfRows} disabled className="bg-muted" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="soil">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Loamy">Loamy</SelectItem>
                      <SelectItem value="Clay">Clay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation">Irrigation Type</Label>
                  <Select value={irrigationType} onValueChange={setIrrigationType}>
                    <SelectTrigger id="irrigation">
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Drip">Drip</SelectItem>
                      <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section B: Row-Wise Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Row-Wise Configuration</CardTitle>
              <CardDescription>Configure each row with crop details and conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rows.map((row, index) => (
                <Card key={index} className="border-l-4 border-l-primary bg-card">
                  <CardContent className="pt-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{row.id}</h3>
                      {rows.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRow(index)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor={`crop-${index}`}>Crop Type</Label>
                        <Select
                          value={row.cropType}
                          onValueChange={(value) => handleRowChange(index, 'cropType', value)}
                        >
                          <SelectTrigger id={`crop-${index}`}>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tomato">Tomato</SelectItem>
                            <SelectItem value="Capsicum">Capsicum</SelectItem>
                            <SelectItem value="Cucumber">Cucumber</SelectItem>
                            <SelectItem value="Lettuce">Lettuce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date-${index}`}>Planting Date</Label>
                        <Input
                          id={`date-${index}`}
                          type="date"
                          value={row.plantingDate}
                          onChange={(e) => handleRowChange(index, 'plantingDate', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`moisture-${index}`}>
                          Soil Moisture: {row.soilMoisture}%
                        </Label>
                        <Slider
                          id={`moisture-${index}`}
                          min={0}
                          max={100}
                          step={1}
                          value={[row.soilMoisture]}
                          onValueChange={(value) => handleRowChange(index, 'soilMoisture', value[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={handleAddRow}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-secondary bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Row
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Generate Advisory →
          </Button>
        </div>
      </div>
    </div>
  );
}
