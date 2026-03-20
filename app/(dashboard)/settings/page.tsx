'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { USER_SETTINGS, CURRENT_USER } from '@/lib/mock-data';
import { Bell, Lock, CreditCard, User, LogOut, Phone, Mail } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(USER_SETTINGS.notifications);

  const handleLogout = () => {
    logout();
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
              <Input value={user?.name || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
              <Input value={user?.phone || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <Input value={user?.email || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Delivery Platform</label>
              <Input value={user?.platform || ''} disabled className="bg-muted capitalize" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">City</label>
              <Input value={user?.city || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Member Since</label>
              <Input
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>Manage your payment and payout accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-3">UPI for Premium Deduction</label>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="font-semibold text-foreground">{USER_SETTINGS.payment.upiId}</p>
              <p className="text-xs text-muted-foreground mt-1">Verified ✓ • Auto-deducted every Friday</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-3">Bank Account for Payouts</label>
            <div className="p-3 bg-muted rounded-lg border border-border space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Account Holder</p>
                <p className="font-semibold text-foreground">{USER_SETTINGS.payment.bankAccount.accountHolder}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-mono text-sm text-foreground">{USER_SETTINGS.payment.bankAccount.accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IFSC Code</p>
                <p className="font-mono text-sm text-foreground">{USER_SETTINGS.payment.bankAccount.ifsc}</p>
              </div>
              <p className="text-xs text-accent mt-2">Verified ✓</p>
            </div>
          </div>

          <Button variant="outline">Change Payment Methods</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Control how and when you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationToggle
            label="Weather Alerts"
            description="Get notified about weather events that may impact your earnings"
            enabled={notifications.weatherAlerts}
            onChange={() => toggleNotification('weatherAlerts')}
          />
          <NotificationToggle
            label="Claim Updates"
            description="Status updates on your claims and payouts"
            enabled={notifications.claimUpdates}
            onChange={() => toggleNotification('claimUpdates')}
          />
          <NotificationToggle
            label="Payment Notifications"
            description="Confirmations when your weekly premium is deducted"
            enabled={notifications.paymentNotifications}
            onChange={() => toggleNotification('paymentNotifications')}
          />
          <NotificationToggle
            label="Promotional Emails"
            description="New features, updates, and special offers"
            enabled={notifications.promotionalEmails}
            onChange={() => toggleNotification('promotionalEmails')}
          />
          <Button variant="outline">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-muted rounded-lg border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Account Status</p>
            <p className="text-sm text-accent">
              ✓ Verified • ✓ 2FA Enabled • ✓ Secure Password
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-foreground text-sm">Privacy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your data is encrypted end-to-end</li>
              <li>• We comply with all Indian data protection laws</li>
              <li>• Your information is never shared with third parties without consent</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">View Privacy Policy</Button>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
          <CardDescription>Application preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Use dark theme for the app</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Automatic Updates</p>
                <p className="text-xs text-muted-foreground">Keep the app automatically updated</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-red-900 text-sm">Logout</h4>
            <p className="text-sm text-red-800 mb-3">Sign out from this device</p>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="border-t border-red-200 pt-4">
            <h4 className="font-medium text-red-900 text-sm">Delete Account</h4>
            <p className="text-sm text-red-800 mb-3">
              Permanently delete your account and all associated data
            </p>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button variant="outline">Contact Support</Button>
          <Button variant="outline">View FAQ</Button>
          <Button variant="outline">Report Issue</Button>
        </CardContent>
      </Card>
    </div>
  );
}

interface NotificationToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

function NotificationToggle({ label, description, enabled, onChange }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
      <div className="flex-1">
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={enabled}
        onChange={onChange}
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  );
}
