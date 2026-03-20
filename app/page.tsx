'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navigation } from '@/components/gigshield/navigation';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, AlertTriangle, FileText, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="auth" />

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Income Protection for Delivery Workers
              </h1>
              <p className="text-lg text-muted-foreground">
                GigShield provides weather-based parametric insurance designed specifically for delivery workers across India. Get automatic payouts when disruptions impact your earnings—no paperwork, no waiting.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary px-8">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="px-8">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-3xl opacity-20" />
                <div className="relative bg-card border border-border rounded-lg p-8 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium">Weekly Earnings</span>
                    <span className="text-lg font-bold text-primary">₹18,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <span className="text-sm font-medium">Protected</span>
                    <span className="text-lg font-bold text-accent">₹50,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-100/50 rounded-lg">
                    <span className="text-sm font-medium">Weekly Premium</span>
                    <span className="text-lg font-bold">₹85</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Active Disruptions</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-yellow-100/50 text-yellow-800 text-xs rounded">Heavy Rain</span>
                      <span className="px-2 py-1 bg-orange-100/50 text-orange-800 text-xs rounded">AQI High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Income Protection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All the features you need to protect your earnings from weather and disruptions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Automatic Payouts"
              description="Get paid instantly when severe weather impacts your earnings—no claims to file."
            />
            <FeatureCard
              icon={<AlertTriangle className="w-8 h-8" />}
              title="Real-Time Monitoring"
              description="Live weather and AQI alerts for your zone with payout predictions."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Zero Paperwork"
              description="AI-powered verification with no documentation needed for claims."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="24h Payouts"
              description="Approved claims are transferred to your account within 24 hours."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Transparent Pricing"
              description="Clear, predictable premiums based on your location and risk profile."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Support"
              description="Join thousands of protected delivery workers across India."
            />
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="px-4 py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What We Cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CoverageItem
              emoji="🌧️"
              title="Rain Disruption"
              description="Heavy rainfall causing traffic and reduced orders"
            />
            <CoverageItem
              emoji="🌡️"
              title="Extreme Heat"
              description="High temperatures affecting work capacity"
            />
            <CoverageItem
              emoji="🌪️"
              title="Dust & AQI"
              description="Air quality degradation impacting health"
            />
            <CoverageItem
              emoji="🚗"
              title="Zone Bans"
              description="Delivery platform restrictions in your zone"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Protect Your Income?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of delivery workers who are already protecting their earnings with GigShield.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 h-12 text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="px-8 h-12 text-lg">
                Already a Member?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 GigShield. Income protection for gig workers.</p>
            <div className="flex gap-6 justify-center mt-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface CoverageItemProps {
  emoji: string;
  title: string;
  description: string;
}

function CoverageItem({ emoji, title, description }: CoverageItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
