'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Zap,
  AlertTriangle,
  FileText,
  Settings,
  Home,
  Shield,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';

interface MobileNavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: MobileNavLink[] = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: '/dashboard/policy',
    label: 'Policy',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    href: '/dashboard/claims',
    label: 'Claims',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex items-center justify-around">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-3 flex-1',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.icon}
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu drawer for additional options */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute bottom-24 right-4 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1">
            <Link
              href="/dashboard/disruptions"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <AlertTriangle className="w-4 h-4" />
              Disruptions
            </Link>
            <Link
              href="/dashboard/fraud-verification"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <Zap className="w-4 h-4" />
              Verification
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
