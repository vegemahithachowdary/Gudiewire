import { User, Policy, Claim, Disruption, WeatherAlert, AQIData, EarningsData, FraudFlag } from './types';

// Current logged-in user
export const CURRENT_USER: User = {
  id: 'user_001',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@example.com',
  name: 'Rajesh Kumar',
  platform: 'swiggy',
  city: 'Bangalore',
  weeklyIncomeRange: '15k-20k',
  workingHours: {
    startTime: '09:00',
    endTime: '21:00',
    daysPerWeek: 6,
  },
  riskPreference: 'medium',
  profileComplete: true,
  createdAt: new Date('2024-01-15'),
  activatedAt: new Date('2024-01-20'),
  riskScore: 62,
};

// User Policy
export const USER_POLICY: Policy = {
  id: 'policy_001',
  userId: 'user_001',
  status: 'active',
  weeklyPremium: 85,
  coverageAmount: 50000,
  riskScore: 62,
  locationRiskFactor: 1.2,
  activatedAt: new Date('2024-01-20'),
  createdAt: new Date('2024-01-15'),
};

// Sample Claims
export const SAMPLE_CLAIMS: Claim[] = [
  {
    id: 'claim_001',
    userId: 'user_001',
    policyId: 'policy_001',
    status: 'paid',
    amount: 1500,
    reason: 'weather_disruption',
    triggeredAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    approvedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    paidAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    notes: 'Heavy rainfall disrupted operations. Payout approved.',
  },
  {
    id: 'claim_002',
    userId: 'user_001',
    policyId: 'policy_001',
    status: 'approved',
    amount: 2000,
    reason: 'weather_disruption',
    triggeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    approvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Heatwave alert triggered automatic payout.',
  },
  {
    id: 'claim_003',
    userId: 'user_001',
    policyId: 'policy_001',
    status: 'manual_review',
    amount: 2500,
    reason: 'weather_disruption',
    triggeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    fraudFlag: true,
    notes: 'Under verification due to unusual pattern.',
  },
  {
    id: 'claim_004',
    userId: 'user_001',
    policyId: 'policy_001',
    status: 'processing',
    amount: 1800,
    reason: 'weather_disruption',
    triggeredAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    notes: 'Dust storm detected in zone. Processing payout.',
  },
];

// Weather Alerts
export const WEATHER_ALERTS: WeatherAlert[] = [
  {
    id: 'weather_001',
    city: 'Bangalore',
    type: 'rain',
    severity: 'high',
    description: 'Heavy rainfall expected. Reduce visibility and slippery roads.',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    impactOnEarnings: 35,
  },
  {
    id: 'weather_002',
    city: 'Bangalore',
    type: 'heatwave',
    severity: 'medium',
    description: 'Temperature expected to reach 38°C. Stay hydrated.',
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    impactOnEarnings: 20,
  },
];

// AQI Data
export const AQI_DATA: AQIData = {
  city: 'Bangalore',
  aqi: 156,
  level: 'heavily_polluted',
  updatedAt: new Date(Date.now() - 30 * 60 * 1000),
};

// Current Disruptions
export const CURRENT_DISRUPTIONS: Disruption[] = [
  {
    id: 'disruption_001',
    userId: 'user_001',
    type: 'weather',
    severity: 'high',
    location: 'HSR Layout, Bangalore',
    description: 'Heavy rainfall causing traffic congestion and order delays',
    affectsEarnings: true,
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'disruption_002',
    userId: 'user_001',
    type: 'aqi',
    severity: 'medium',
    location: 'Koramangala, Bangalore',
    description: 'Air quality degraded. Recommend avoiding peak hours.',
    affectsEarnings: false,
    detectedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];

// Weekly Earnings Data
export const EARNINGS_DATA: EarningsData[] = [
  { date: 'Mon', amount: 2800, ordersCount: 42 },
  { date: 'Tue', amount: 3100, ordersCount: 48 },
  { date: 'Wed', amount: 2500, ordersCount: 35 },
  { date: 'Thu', amount: 3400, ordersCount: 52 },
  { date: 'Fri', amount: 3800, ordersCount: 58 },
  { date: 'Sat', amount: 4200, ordersCount: 65 },
  { date: 'Sun', amount: 2900, ordersCount: 40 },
];

// Monthly Earnings (for analytics)
export const MONTHLY_EARNINGS: EarningsData[] = [
  { date: 'Week 1', amount: 18500, ordersCount: 270 },
  { date: 'Week 2', amount: 19800, ordersCount: 295 },
  { date: 'Week 3', amount: 17200, ordersCount: 240 },
  { date: 'Week 4', amount: 21400, ordersCount: 325 },
];

// Fraud Flags
export const FRAUD_FLAG_EXAMPLE: FraudFlag = {
  id: 'fraud_flag_001',
  claimId: 'claim_003',
  reason: 'Multiple claims within 24 hours from same location',
  riskScore: 78,
  requiresVerification: true,
  verificationDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
  selfieRequired: true,
  videoRequired: false,
};

// Dashboard Summary Data
export const DASHBOARD_SUMMARY = {
  weeklyEarnings: 17800,
  monthlyEarnings: 76900,
  totalClaimsValue: 7000,
  activePolicies: 1,
  weeklyAverageOrders: 48,
  riskScore: 62,
  claimsPaid: 3,
  pendingClaims: 1,
  incomeProtected: 50000,
  premiumPerWeek: 85,
};

// Settings/Preferences
export const USER_SETTINGS = {
  notifications: {
    weatherAlerts: true,
    claimUpdates: true,
    paymentNotifications: true,
    promotionalEmails: false,
  },
  payment: {
    upiId: 'rajesh.kumar@okhdfcbank',
    bankAccount: {
      accountHolder: 'RAJESH KUMAR',
      accountNumber: '****6789',
      ifsc: 'HDFC0000001',
    },
  },
};

// Analytics Data
export const RISK_TRENDS = [
  { date: 'Mar 1', score: 45, factor: 'Weather' },
  { date: 'Mar 5', score: 52, factor: 'Weather' },
  { date: 'Mar 10', score: 58, factor: 'Traffic' },
  { date: 'Mar 15', score: 62, factor: 'AQI' },
  { date: 'Mar 20', score: 62, factor: 'Stable' },
];

// Onboarding Questions & Answers for form
export const ONBOARDING_FLOW = [
  {
    step: 1,
    title: 'Which platform do you deliver for?',
    subtitle: 'Select your primary delivery platform',
  },
  {
    step: 2,
    title: 'Which city are you based in?',
    subtitle: 'We will tailor coverage for your location',
  },
  {
    step: 3,
    title: 'What is your weekly income range?',
    subtitle: 'This helps us calculate your coverage amount',
  },
  {
    step: 4,
    title: 'How many hours do you work per day?',
    subtitle: 'Average working hours to assess risk',
  },
  {
    step: 5,
    title: 'What is your risk preference?',
    subtitle: 'Choose your insurance coverage level',
  },
];
