import { DeliveryPlatform, IncomeRange, RiskLevel } from './types';

// Delivery Platforms
export const DELIVERY_PLATFORMS: Record<DeliveryPlatform, { label: string; icon: string }> = {
  swiggy: { label: 'Swiggy', icon: '🍔' },
  zomato: { label: 'Zomato', icon: '🍕' },
  amazon: { label: 'Amazon', icon: '📦' },
  zepto: { label: 'Zepto', icon: '⚡' },
  dunzo: { label: 'Dunzo', icon: '🚗' },
  flipkart: { label: 'Flipkart', icon: '🛍️' },
  other: { label: 'Other', icon: '🚚' },
};

// Income Ranges
export const INCOME_RANGES: Record<IncomeRange, { label: string; min: number; max: number }> = {
  'below-5k': { label: 'Below ₹5,000', min: 0, max: 5000 },
  '5k-10k': { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  '10k-15k': { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  '15k-20k': { label: '₹15,000 - ₹20,000', min: 15000, max: 20000 },
  'above-20k': { label: 'Above ₹20,000', min: 20000, max: 100000 },
};

// Risk Levels
export const RISK_LEVELS: Record<RiskLevel, { label: string; description: string; premiumMultiplier: number }> = {
  low: {
    label: 'Conservative',
    description: 'Lower risk, predictable routes',
    premiumMultiplier: 0.8,
  },
  medium: {
    label: 'Balanced',
    description: 'Standard coverage for most routes',
    premiumMultiplier: 1.0,
  },
  high: {
    label: 'Aggressive',
    description: 'High-risk routes, peak hours',
    premiumMultiplier: 1.3,
  },
};

// Indian Cities
export const INDIAN_CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Indore',
  'Coimbatore',
  'Kochi',
  'Visakhapatnam',
  'Surat',
  'Vadodara',
  'Nagpur',
  'Bhopal',
  'Gurgaon',
];

// Working Hours Options
export const WORKING_HOURS_OPTIONS = [
  { label: '4-6 hours', value: 5 },
  { label: '6-8 hours', value: 7 },
  { label: '8-10 hours', value: 9 },
  { label: '10-12 hours', value: 11 },
  { label: '12+ hours', value: 13 },
];

// Premium Calculation
export const BASE_WEEKLY_PREMIUM = 50; // Base ₹50 per week

// Risk Multipliers
export const RISK_MULTIPLIERS = {
  platform: {
    swiggy: 1.0,
    zomato: 1.05,
    amazon: 1.1,
    zepto: 1.2,
    dunzo: 0.95,
    flipkart: 1.15,
    other: 1.0,
  },
  location: {
    'tier-1': 1.2,
    'tier-2': 1.0,
    'tier-3': 0.8,
  },
  weather: {
    normal: 1.0,
    rainy: 1.3,
    heatwave: 1.25,
    coldwave: 1.15,
    dust: 1.2,
    flood: 1.5,
  },
};

// Claim Status Colors
export const CLAIM_STATUS_COLORS: Record<string, string> = {
  processing: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  manual_review: 'bg-purple-100 text-purple-800',
};

// Disruption Colors
export const DISRUPTION_COLORS: Record<string, string> = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-orange-600 bg-orange-50',
  critical: 'text-red-600 bg-red-50',
};

// Coverage Details
export const COVERAGE_DETAILS = {
  weatherDisruption: {
    title: 'Weather-Based Disruption',
    description: 'Automatic payout when severe weather impacts your earnings',
  },
  accidentCoverage: {
    title: 'Accident Coverage',
    description: 'Financial protection in case of accidents while delivering',
  },
  vehicleBreakdown: {
    title: 'Vehicle Breakdown',
    description: 'Coverage for unexpected vehicle maintenance',
  },
  incomeProtection: {
    title: 'Income Protection',
    description: 'Replaces lost income during covered disruptions',
  },
};

// Feature Flags
export const FEATURES = {
  liveUpdates: true,
  fraudDetection: true,
  analyticsV2: true,
  autoPayouts: true,
};
