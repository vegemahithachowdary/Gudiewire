'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/onboarding-context';
import { useAuth } from '@/context/auth-context';
import { Navigation } from '@/components/gigshield/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RiskPreferenceForm } from '@/components/gigshield/forms/onboarding-forms';
import { Loader2 } from 'lucide-react';

export default function RiskPreferencePage() {
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();
  const { updateData, data, resetOnboarding } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (data.riskPreference) {
      setIsSubmitting(true);
      // Simulate completing onboarding
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetOnboarding();
      router.push('/dashboard');
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
              <h3 className="text-sm font-medium text-foreground">Step 5 of 5</h3>
              <span className="text-sm text-muted-foreground">100% complete</span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full w-full bg-primary rounded-full transition-all duration-300" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <RiskPreferenceForm
              onSelect={(risk) => updateData({ riskPreference: risk })}
              selected={data.riskPreference}
            />

            {/* Summary card */}
            {data.riskPreference && (
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground mb-3">Your Coverage Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform:</span>
                      <span className="font-medium text-foreground capitalize">{data.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City:</span>
                      <span className="font-medium text-foreground">{data.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income Range:</span>
                      <span className="font-medium text-foreground capitalize">{data.incomeRange?.replace('-', ' - ₹')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage Level:</span>
                      <span className="font-medium text-foreground capitalize">{data.riskPreference}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/onboarding/working-hours')}
              disabled={isSubmitting}
              className="px-8"
            >
              Back
            </Button>
            <Button
              disabled={!data.riskPreference || isSubmitting || authLoading}
              onClick={handleContinue}
              className="px-8 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Activating...
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
