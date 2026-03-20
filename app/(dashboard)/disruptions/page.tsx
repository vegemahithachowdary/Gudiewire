'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WEATHER_ALERTS, AQI_DATA, CURRENT_DISRUPTIONS } from '@/lib/mock-data';
import { AlertTriangle, Cloud, Droplets, Wind, Eye } from 'lucide-react';

export default function DisruptionsPage() {
  const [selectedZone, setSelectedZone] = useState('HSR Layout, Bangalore');

  const getDisruptionSeverityStyles = (severity: string) => {
    const styles: Record<string, string> = {
      low: 'border-green-200 bg-green-50 text-green-800',
      medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      high: 'border-orange-200 bg-orange-50 text-orange-800',
      critical: 'border-red-200 bg-red-50 text-red-800',
    };
    return styles[severity] || 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Disruption Monitor</h1>
        <p className="text-muted-foreground">Real-time weather and environmental alerts for your area</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickStatCard
          label="Temperature"
          value="34°C"
          unit="Current"
          icon={<Cloud className="w-5 h-5" />}
          color="text-orange-600"
        />
        <QuickStatCard
          label="Air Quality Index"
          value={AQI_DATA.aqi}
          unit={AQI_DATA.level.replace('_', ' ')}
          icon={<Wind className="w-5 h-5" />}
          color="text-red-600"
        />
        <QuickStatCard
          label="Visibility"
          value="2km"
          unit="Low visibility warning"
          icon={<Eye className="w-5 h-5" />}
          color="text-yellow-600"
        />
      </div>

      {/* Active Alerts */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Active Weather Alerts
          </CardTitle>
          <CardDescription>Severe disruptions affecting your earnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {WEATHER_ALERTS.map((alert) => (
            <div key={alert.id} className="p-4 bg-white border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground capitalize">{alert.type} Alert</h4>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-orange-200">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Impact on Earnings</p>
                  <p className="font-bold text-red-600 text-lg">-{alert.impactOnEarnings}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Start</p>
                  <p className="font-semibold text-sm text-foreground">{new Date(alert.startTime).toLocaleTimeString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold text-sm text-foreground">{alert.endTime ? '6 hours' : 'Ongoing'}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Disruptions by Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Current Disruptions</CardTitle>
          <CardDescription>Zone-specific disruptions affecting delivery work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {CURRENT_DISRUPTIONS.map((disruption) => (
            <div
              key={disruption.id}
              className={`p-4 border rounded-lg ${getDisruptionSeverityStyles(disruption.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold capitalize">{disruption.type.replace('_', ' ')}</h4>
                  <p className="text-sm mt-1">{disruption.location}</p>
                </div>
                <span className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-sm font-semibold">
                  {disruption.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm mb-2">{disruption.description}</p>
              {disruption.affectsEarnings && (
                <p className="text-sm font-medium text-orange-700 bg-white bg-opacity-50 px-2 py-1 rounded w-fit">
                  ⚠️ May affect earnings
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AQI Details */}
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Details</CardTitle>
          <CardDescription>Current pollution levels for {AQI_DATA.city}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">AQI Level</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 font-bold rounded-full">
                {AQI_DATA.aqi} - {AQI_DATA.level.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Health Advisory: Avoid outdoor activities. Sensitive groups should stay indoors.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                ⚠️ Use N95 masks
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                ⚠️ Reduce delivery hours
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-1">Last Updated</p>
              <p className="font-semibold text-foreground">{new Date(AQI_DATA.updatedAt).toLocaleTimeString()}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-1">Forecast</p>
              <p className="font-semibold text-foreground">Moderate (AQI 150)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Tips During Disruptions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Always check weather alerts before starting your shift</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Reduce working hours during high AQI or extreme weather</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>We automatically detect disruptions and process claims</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Use the mobile app for real-time push notifications</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

interface QuickStatCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

function QuickStatCard({ label, value, unit, icon, color }: QuickStatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{unit}</p>
          </div>
          <div className={`p-3 rounded-lg bg-primary/10 ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
