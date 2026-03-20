'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const CardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-muted rounded-lg w-1/3 mb-2" />
        <div className="h-4 bg-muted rounded-lg w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-8 bg-muted rounded-lg" />
        <div className="h-4 bg-muted rounded-lg w-3/4" />
      </CardContent>
    </Card>
  );
};

export const DashboardLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* List skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded-lg w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export const PageLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-muted rounded-lg w-1/3 mb-6" />
      <DashboardLoadingSkeleton />
    </div>
  );
};
