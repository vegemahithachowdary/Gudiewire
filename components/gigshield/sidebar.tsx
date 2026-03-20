'use client';

import React from 'react';
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
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarLinks: SidebarLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: '/dashboard/policy',
    label: 'Policy & Premium',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    href: '/dashboard/disruptions',
    label: 'Disruption Monitor',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    href: '/dashboard/claims',
    label: 'Claims & Payouts',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    href: '/dashboard/fraud-verification',
    label: 'Verification',
    icon: <Zap className="w-5 h-5" />,
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

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar sticky top-0 h-screen">
      <div className="flex items-center gap-2 p-6 border-b border-sidebar-border">
        <Shield className="w-6 h-6 text-sidebar-primary" />
        <span className="font-bold text-sidebar-foreground">GigShield</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                {link.icon}
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/20 rounded-lg p-4">
          <p className="text-xs text-sidebar-foreground font-semibold mb-2">Current Status</p>
          <div className="space-y-1 text-xs text-sidebar-foreground/70">
            <p>Policy: Active ✓</p>
            <p>Risk Score: Low</p>
            <p>Verified: Yes ✓</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
