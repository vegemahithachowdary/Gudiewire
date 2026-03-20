'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_CLAIMS } from '@/lib/mock-data';
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ClaimsPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const getClaimIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      'paid': <CheckCircle className="w-5 h-5 text-green-600" />,
      'approved': <CheckCircle className="w-5 h-5 text-blue-600" />,
      'processing': <Clock className="w-5 h-5 text-yellow-600" />,
      'manual_review': <AlertTriangle className="w-5 h-5 text-purple-600" />,
      'rejected': <XCircle className="w-5 h-5 text-red-600" />,
    };
    return icons[status] || <Clock className="w-5 h-5" />;
  };

  const getClaimStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': 'bg-green-100 text-green-800',
      'approved': 'bg-blue-100 text-blue-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'manual_review': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getClaimRowBgColor = (status: string) => {
    const colors: Record<string, string> = {
      'paid': 'hover:bg-green-50',
      'approved': 'hover:bg-blue-50',
      'processing': 'hover:bg-yellow-50',
      'manual_review': 'hover:bg-purple-50',
      'rejected': 'hover:bg-red-50',
    };
    return colors[status] || 'hover:bg-muted';
  };

  const filteredClaims = filter
    ? SAMPLE_CLAIMS.filter((claim) => claim.status === filter)
    : SAMPLE_CLAIMS;

  const stats = {
    total: SAMPLE_CLAIMS.length,
    paid: SAMPLE_CLAIMS.filter((c) => c.status === 'paid').length,
    processing: SAMPLE_CLAIMS.filter((c) => c.status === 'processing').length,
    pending: SAMPLE_CLAIMS.filter((c) => c.status === 'manual_review').length,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Claims & Payouts</h1>
        <p className="text-muted-foreground">View all your claims and their current status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Claims"
          value={stats.total}
          color="text-primary"
        />
        <StatCard
          label="Paid"
          value={stats.paid}
          color="text-green-600"
        />
        <StatCard
          label="Processing"
          value={stats.processing}
          color="text-yellow-600"
        />
        <StatCard
          label="Under Review"
          value={stats.pending}
          color="text-purple-600"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            !filter
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted-foreground/10'
          }`}
        >
          All Claims ({SAMPLE_CLAIMS.length})
        </button>
        <button
          onClick={() => setFilter('paid')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            filter === 'paid'
              ? 'bg-green-100 text-green-800'
              : 'bg-muted hover:bg-muted-foreground/10'
          }`}
        >
          Paid ({stats.paid})
        </button>
        <button
          onClick={() => setFilter('processing')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            filter === 'processing'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-muted hover:bg-muted-foreground/10'
          }`}
        >
          Processing ({stats.processing})
        </button>
        <button
          onClick={() => setFilter('manual_review')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
            filter === 'manual_review'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-muted hover:bg-muted-foreground/10'
          }`}
        >
          Review ({stats.pending})
        </button>
      </div>

      {/* Claims List */}
      <Card>
        <CardHeader>
          <CardTitle>Claim History</CardTitle>
          <CardDescription>Your claim timeline and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className={`p-4 border border-border rounded-lg transition-colors ${getClaimRowBgColor(claim.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getClaimIcon(claim.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">₹{claim.amount}</h3>
                        <span className={`px-2 py-1 text-xs rounded font-semibold ${getClaimStatusColor(claim.status)}`}>
                          {claim.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {claim.reason.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Triggered: {new Date(claim.triggeredAt).toLocaleDateString()} at{' '}
                        {new Date(claim.triggeredAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex gap-8 text-xs text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">Triggered</p>
                      <p>{new Date(claim.triggeredAt).toLocaleDateString()}</p>
                    </div>
                    {claim.approvedAt && (
                      <div>
                        <p className="font-medium text-foreground mb-1">Approved</p>
                        <p>{new Date(claim.approvedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                    {claim.paidAt && (
                      <div>
                        <p className="font-medium text-foreground mb-1">Paid</p>
                        <p>{new Date(claim.paidAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {claim.notes && (
                  <div className="mt-3 p-2 bg-muted rounded text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Note:</p>
                    <p>{claim.notes}</p>
                  </div>
                )}

                {claim.status === 'manual_review' && (
                  <Link href="/dashboard/fraud-verification">
                    <Button size="sm" variant="outline" className="mt-3 w-full">
                      Complete Verification
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">How long does claim processing take?</h4>
            <p className="text-sm text-muted-foreground">
              Most claims are processed within 24 hours. Weather-triggered claims are processed automatically within minutes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">What does "Under Review" mean?</h4>
            <p className="text-sm text-muted-foreground">
              Your claim requires verification. You may need to provide proof of presence or answer verification questions. Complete this to get paid.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Can I appeal a rejected claim?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Contact our support team with additional documentation. We review appeals within 48 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
