'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/onboarding-context';
import { Navigation } from '@/components/gigshield/navigation';
import { Button } from '@/components/ui/button';
import { LocationSelectionForm } from '@/components/gigshield/forms/onboarding-forms';

export default function LocationPage() {
  const router = useRouter();
  const { updateData, data, nextStep, previousStep } = useOnboarding();

  const handleContinue = () => {
    if (data.city) {
      nextStep();
      router.push('/dashboard/onboarding/income-range');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation variant="auth" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">Step 2 of 5</h3>
              <span className="text-sm text-muted-foreground">40% complete</span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-primary rounded-full transition-all duration-300" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <LocationSelectionForm
              onSelect={(city) => updateData({ city })}
              selected={data.city}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                previousStep();
                router.push('/dashboard/onboarding/platform-selection');
              }}
              className="px-8"
            >
              Back
            </Button>
            <Button
              disabled={!data.city}
              onClick={handleContinue}
              className="px-8 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
