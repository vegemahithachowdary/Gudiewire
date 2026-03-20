'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, FileText, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  type: 'no-claims' | 'no-alerts' | 'no-data' | 'no-disruptions';
  actionLabel?: string;
  actionHref?: string;
}

const emptyStateConfig = {
  'no-claims': {
    icon: FileText,
    title: 'No Claims Yet',
    description: 'Your claims will appear here once they are processed.',
  },
  'no-alerts': {
    icon: AlertCircle,
    title: 'No Active Alerts',
    description: 'Everything looks good. No disruptions detected in your area.',
  },
  'no-data': {
    icon: TrendingUp,
    title: 'No Data Available',
    description: 'Data will be available once you start earning.',
  },
  'no-disruptions': {
    icon: Zap,
    title: 'No Active Disruptions',
    description: 'Your area is clear. Safe to continue working.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  actionLabel,
  actionHref,
}) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{config.title}</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">{config.description}</p>
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button size="sm" className="bg-primary hover:bg-primary">
              {actionLabel}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
