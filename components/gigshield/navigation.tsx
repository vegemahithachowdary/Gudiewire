'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  variant?: 'auth' | 'dashboard';
}

export const Navigation: React.FC<NavigationProps> = ({ variant = 'auth' }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (variant === 'auth') {
    return (
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">GigShield</span>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground hidden sm:inline">GigShield</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name.split(' ')[0]}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-2">
            <div className="text-sm text-muted-foreground py-2">
              Welcome, {user?.name.split(' ')[0]}
            </div>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
