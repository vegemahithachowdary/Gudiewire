'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DASHBOARD_SUMMARY, CURRENT_DISRUPTIONS, SAMPLE_CLAIMS } from '@/lib/mock-data';
import { AlertTriangle, TrendingUp, Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  const getClaimStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': 'bg-green-100 text-green-800',
      'approved': 'bg-blue-100 text-blue-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'manual_review': 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome back, {user?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Your income protection dashboard. Stay updated with live disruption alerts.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Weekly Earnings"
          value={`₹${DASHBOARD_SUMMARY.weeklyEarnings.toLocaleString()}`}
          subtitle="Last 7 days"
          icon={<TrendingUp className="w-5 h-5" />}
          color="text-primary"
        />
        <SummaryCard
          title="Income Protected"
          value={`₹${DASHBOARD_SUMMARY.incomeProtected.toLocaleString()}`}
          subtitle="Active coverage"
          icon={<Shield className="w-5 h-5" />}
          color="text-accent"
        />
        <SummaryCard
          title="Premium/Week"
          value={`₹${DASHBOARD_SUMMARY.premiumPerWeek}`}
          subtitle="Auto deducted Friday"
          icon={<AlertCircle className="w-5 h-5" />}
          color="text-yellow-600"
        />
        <SummaryCard
          title="Risk Score"
          value={`${DASHBOARD_SUMMARY.riskScore}/100`}
          subtitle="Moderate risk"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Policy Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Policy Status
              </CardTitle>
              <CardDescription>Your active coverage details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Active Protection</p>
                  <p className="text-sm text-muted-foreground">Swiggy • Bangalore • Medium Risk</p>
                </div>
                <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full font-medium">
                  ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Coverage Amount</p>
                  <p className="text-lg font-bold text-foreground">₹50,000</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Activated</p>
                  <p className="text-sm font-semibold text-foreground">Jan 20, 2024</p>
                </div>
              </div>
              <Link href="/dashboard/policy">
                <Button variant="outline" className="w-full">
                  View Full Policy Details
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Claims */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Claims
              </CardTitle>
              <CardDescription>Your claim history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SAMPLE_CLAIMS.slice(0, 3).map((claim) => (
                  <div key={claim.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {claim.status === 'paid' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {claim.status === 'approved' && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                        {claim.status === 'processing' && (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                        {claim.status === 'manual_review' && (
                          <AlertTriangle className="w-4 h-4 text-purple-600" />
                        )}
                        <span className="font-medium text-foreground">₹{claim.amount}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded font-medium ${getClaimStatusColor(claim.status)}`}>
                        {claim.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(claim.triggeredAt).toLocaleDateString()} • {claim.reason.replace('_', ' ')}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/claims">
                <Button variant="outline" className="w-full mt-4">
                  View All Claims
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Disruptions */}
          <Card className={CURRENT_DISRUPTIONS.length > 0 ? 'border-orange-200 bg-orange-50/50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Active Disruptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {CURRENT_DISRUPTIONS.length > 0 ? (
                <div className="space-y-3">
                  {CURRENT_DISRUPTIONS.map((disruption) => (
                    <div
                      key={disruption.id}
                      className={`p-3 rounded-lg border ${
                        disruption.severity === 'high'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <p className="font-semibold text-sm text-foreground capitalize">
                        {disruption.type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{disruption.description}</p>
                      <div className="mt-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            disruption.severity === 'high'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {disruption.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active disruptions. Safe to work!</p>
              )}
              <Link href="/dashboard/disruptions">
                <Button variant="outline" className="w-full mt-4">
                  Live Monitor
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Claims Paid</span>
                <span className="font-semibold text-foreground">₹{SAMPLE_CLAIMS.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Claims</span>
                <span className="font-semibold text-foreground">{SAMPLE_CLAIMS.filter(c => c.status !== 'paid' && c.status !== 'rejected').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membership</span>
                <span className="font-semibold text-foreground">2 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification</span>
                <span className="font-semibold text-accent">Verified ✓</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function SummaryCard({ title, value, subtitle, icon, color }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={`p-2 rounded-lg bg-primary/10 text-primary ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// For Icons import
import { FileText } from 'lucide-react';
