// User and Auth Types
export interface User {
  id: string;
  phone: string;
  email: string;
  name: string;
  platform: DeliveryPlatform;
  city: string;
  weeklyIncomeRange: IncomeRange;
  workingHours: WorkingHours;
  riskPreference: RiskLevel;
  profileComplete: boolean;
  createdAt: Date;
  activatedAt?: Date;
  riskScore: number;
}

export type DeliveryPlatform = 'swiggy' | 'zomato' | 'amazon' | 'zepto' | 'dunzo' | 'flipkart' | 'other';

export type IncomeRange = 'below-5k' | '5k-10k' | '10k-15k' | '15k-20k' | 'above-20k';

export interface WorkingHours {
  startTime: string; // HH:MM format
  endTime: string;
  daysPerWeek: number;
}

export type RiskLevel = 'low' | 'medium' | 'high';

// Policy Types
export interface Policy {
  id: string;
  userId: string;
  status: 'active' | 'inactive' | 'expired';
  weeklyPremium: number;
  coverageAmount: number;
  riskScore: number;
  locationRiskFactor: number;
  activatedAt: Date;
  createdAt: Date;
}

// Claims Types
export interface Claim {
  id: string;
  userId: string;
  policyId: string;
  status: ClaimStatus;
  amount: number;
  reason: ClaimReason;
  triggeredAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  proofUrl?: string;
  notes?: string;
  fraudFlag?: boolean;
}

export type ClaimStatus = 'processing' | 'approved' | 'paid' | 'rejected' | 'manual_review';

export type ClaimReason = 'weather_disruption' | 'accident' | 'vehicle_breakdown' | 'illness' | 'other';

// Disruption Types
export interface Disruption {
  id: string;
  userId: string;
  type: DisruptionType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  affectsEarnings: boolean;
  detectedAt: Date;
  resolvedAt?: Date;
}

export type DisruptionType = 'weather' | 'aqi' | 'traffic' | 'zone_ban' | 'platform_outage';

// Weather and AQI Types
export interface WeatherAlert {
  id: string;
  city: string;
  type: 'rain' | 'heatwave' | 'coldwave' | 'dust' | 'flood';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  startTime: Date;
  endTime?: Date;
  impactOnEarnings: number; // percentage reduction
}

export interface AQIData {
  city: string;
  aqi: number;
  level: 'good' | 'satisfactory' | 'moderately_polluted' | 'heavily_polluted' | 'severe';
  updatedAt: Date;
}

// Analytics Types
export interface EarningsData {
  date: string;
  amount: number;
  ordersCount: number;
}

export interface RiskTrendData {
  date: string;
  score: number;
  factor: string;
}

// Fraud Detection Types
export interface FraudFlag {
  id: string;
  claimId: string;
  reason: string;
  riskScore: number;
  requiresVerification: boolean;
  verificationDeadline: Date;
  selfieRequired: boolean;
  videoRequired: boolean;
  verifiedAt?: Date;
}

export interface VerificationSubmission {
  fraudFlagId: string;
  selfieUrl?: string;
  videoUrl?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock Data Types
export interface MockDataConfig {
  userCount: number;
  claimsPerUser: number;
  disruptionDensity: number;
}
