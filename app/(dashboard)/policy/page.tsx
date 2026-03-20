'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { USER_POLICY, USER_SETTINGS, CURRENT_USER } from '@/lib/mock-data';
import { COVERAGE_DETAILS } from '@/lib/constants';
import { Shield, MapPin, Zap, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export default function PolicyPage() {
  const [premiumDetails, setPremiumDetails] = React.useState({
    basePremium: 50,
    riskMultiplier: 1.0,
    locationMultiplier: 1.2,
    finalPremium: 85,
  });

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Your Policy</h1>
        <p className="text-muted-foreground">Manage your coverage and premium details</p>
      </div>

      {/* Active Policy Card */}
      <Card className="border-2 border-accent/30 bg-accent/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Active Policy
              </CardTitle>
              <CardDescription>Your current income protection coverage</CardDescription>
            </div>
            <span className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold">
              ACTIVE
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Coverage Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Coverage Amount</p>
              <p className="text-2xl font-bold text-foreground">₹50,000</p>
              <p className="text-xs text-muted-foreground mt-2">Maximum weekly payout</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Weekly Premium</p>
              <p className="text-2xl font-bold text-primary">₹{USER_POLICY.weeklyPremium}</p>
              <p className="text-xs text-muted-foreground mt-2">Auto-deducted every Friday</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Activated</p>
              <p className="text-2xl font-bold text-foreground">{new Date(USER_POLICY.activatedAt).toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground mt-2">Policy status: Active</p>
            </div>
          </div>

          {/* Location & Risk Info */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Your Profile & Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start p-4 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">{CURRENT_USER.city}</p>
                  <p className="text-sm text-muted-foreground">Location risk: {(USER_POLICY.locationRiskFactor * 100).toFixed(0)}%</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-4 bg-muted rounded-lg">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Risk Score: {USER_POLICY.riskScore}/100</p>
                  <p className="text-sm text-muted-foreground">Moderate risk profile</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Premium Breakdown
          </CardTitle>
          <CardDescription>How your weekly premium is calculated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium text-foreground">Base Premium</span>
              <span className="font-bold">₹{premiumDetails.basePremium}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">↓ Risk Multiplier ({(premiumDetails.riskMultiplier * 100).toFixed(0)}%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium text-foreground">Location Factor ({(premiumDetails.locationMultiplier * 100).toFixed(0)}%)</span>
              <span className="font-bold">×{premiumDetails.locationMultiplier}</span>
            </div>
            <div className="border-t-2 border-primary my-2" />
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <span className="font-semibold text-lg text-foreground">Final Premium</span>
              <span className="font-bold text-2xl text-primary">₹{premiumDetails.finalPremium}/week</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3">
            💡 Your premium is automatically calculated based on your location, working hours, and platform. It's reviewed monthly.
          </p>
        </CardContent>
      </Card>

      {/* Coverage Details */}
      <Card>
        <CardHeader>
          <CardTitle>What You're Covered For</CardTitle>
          <CardDescription>Complete protection against income-impacting events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(COVERAGE_DETAILS).map(([key, coverage]) => (
              <div key={key} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">{coverage.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{coverage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Where your premium is deducted and payouts are sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">UPI Account</p>
            <p className="font-bold text-foreground text-lg">{USER_SETTINGS.payment.upiId}</p>
            <p className="text-xs text-muted-foreground mt-2">Verified ✓</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Bank Account</p>
            <div className="font-bold text-foreground">
              <p>{USER_SETTINGS.payment.bankAccount.accountHolder}</p>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                {USER_SETTINGS.payment.bankAccount.accountNumber}
              </p>
              <p className="text-sm font-normal text-muted-foreground">
                IFSC: {USER_SETTINGS.payment.bankAccount.ifsc}
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Update Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="h-12">
          Download Policy Document
        </Button>
        <Button variant="outline" className="h-12">
          Contact Support
        </Button>
      </div>
    </div>
  );
}
