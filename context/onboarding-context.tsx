'use client';

import React, { createContext, useContext, useState } from 'react';
import { DeliveryPlatform, IncomeRange, RiskLevel } from '@/lib/types';

interface OnboardingData {
  platform?: DeliveryPlatform;
  city?: string;
  incomeRange?: IncomeRange;
  workingHours?: {
    hours: number;
    daysPerWeek: number;
  };
  riskPreference?: RiskLevel;
}

interface OnboardingContextType {
  currentStep: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  isComplete: boolean;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({});

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isComplete =
    !!data.platform &&
    !!data.city &&
    !!data.incomeRange &&
    !!data.workingHours &&
    !!data.riskPreference;

  const resetOnboarding = () => {
    setCurrentStep(1);
    setData({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        setStep: setCurrentStep,
        updateData,
        nextStep,
        previousStep,
        isComplete,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
