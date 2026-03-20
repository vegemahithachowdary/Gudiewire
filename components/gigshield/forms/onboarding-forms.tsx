'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DELIVERY_PLATFORMS, INCOME_RANGES, RISK_LEVELS, INDIAN_CITIES, WORKING_HOURS_OPTIONS } from '@/lib/constants';
import { DeliveryPlatform, IncomeRange, RiskLevel } from '@/lib/types';
import { Check } from 'lucide-react';

interface PlatformSelectionProps {
  onSelect: (platform: DeliveryPlatform) => void;
  selected?: DeliveryPlatform;
}

export const PlatformSelectionForm: React.FC<PlatformSelectionProps> = ({ onSelect, selected }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Which platform do you deliver for?</h2>
        <p className="text-muted-foreground">Select your primary delivery platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(DELIVERY_PLATFORMS).map(([key, platform]) => (
          <button
            key={key}
            onClick={() => onSelect(key as DeliveryPlatform)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selected === key
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl mr-3">{platform.icon}</span>
                <span className="font-semibold text-foreground">{platform.label}</span>
              </div>
              {selected === key && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface LocationSelectionProps {
  onSelect: (city: string) => void;
  selected?: string;
}

export const LocationSelectionForm: React.FC<LocationSelectionProps> = ({ onSelect, selected }) => {
  const [search, setSearch] = React.useState('');
  const filteredCities = INDIAN_CITIES.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Which city are you based in?</h2>
        <p className="text-muted-foreground">We'll tailor coverage for your location</p>
      </div>

      <Input
        type="text"
        placeholder="Search cities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
        {filteredCities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              selected === city
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{city}</span>
              {selected === city && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface IncomeRangeProps {
  onSelect: (range: IncomeRange) => void;
  selected?: IncomeRange;
}

export const IncomeRangeForm: React.FC<IncomeRangeProps> = ({ onSelect, selected }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">What's your weekly income range?</h2>
        <p className="text-muted-foreground">This helps us calculate your coverage amount</p>
      </div>

      <div className="space-y-3">
        {Object.entries(INCOME_RANGES).map(([key, range]) => (
          <button
            key={key}
            onClick={() => onSelect(key as IncomeRange)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selected === key
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">{range.label}</div>
                <div className="text-sm text-muted-foreground">Weekly earnings</div>
              </div>
              {selected === key && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface WorkingHoursProps {
  onSelect: (hours: number, daysPerWeek: number) => void;
  selectedHours?: number;
  selectedDays?: number;
}

export const WorkingHoursForm: React.FC<WorkingHoursProps> = ({
  onSelect,
  selectedHours,
  selectedDays,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">How many hours do you work per day?</h2>
        <p className="text-muted-foreground">Average working hours to assess risk</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Daily working hours</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WORKING_HOURS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option.value, selectedDays || 6)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedHours === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{option.label}</span>
                  {selectedHours === option.value && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Days per week</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[5, 6, 7].map((days) => (
              <button
                key={days}
                onClick={() => onSelect(selectedHours || 9, days)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  selectedDays === days
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className="font-semibold text-foreground">{days} days</div>
                <div className="text-xs text-muted-foreground">per week</div>
                {selectedDays === days && (
                  <Check className="w-5 h-5 text-primary mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RiskPreferenceProps {
  onSelect: (preference: RiskLevel) => void;
  selected?: RiskLevel;
}

export const RiskPreferenceForm: React.FC<RiskPreferenceProps> = ({ onSelect, selected }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">What's your risk preference?</h2>
        <p className="text-muted-foreground">Choose your insurance coverage level</p>
      </div>

      <div className="space-y-3">
        {Object.entries(RISK_LEVELS).map(([key, level]) => (
          <button
            key={key}
            onClick={() => onSelect(key as RiskLevel)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selected === key
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-foreground">{level.label}</div>
                <div className="text-sm text-muted-foreground">{level.description}</div>
              </div>
              {selected === key && (
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="text-sm font-medium text-primary">
              Premium multiplier: {(level.premiumMultiplier * 100).toFixed(0)}%
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
