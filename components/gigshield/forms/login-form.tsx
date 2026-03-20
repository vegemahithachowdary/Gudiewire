'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(phone, otp);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again. (Try 000000 or 123456)');
    }
  };

  if (!otpSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle>Welcome to GigShield</CardTitle>
          <CardDescription>Enter your phone number to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOtp} className="space-y-4">
            {error && (
              <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 py-2 bg-muted text-muted-foreground text-sm font-medium rounded-lg border border-input">
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  disabled={isLoading}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">We'll send you an OTP to verify</p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full bg-primary hover:bg-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Verify Phone Number</CardTitle>
        <CardDescription>Enter the OTP sent to +91 {phone}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">OTP</label>
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <Input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('');
                    newOtp[i] = e.target.value;
                    setOtp(newOtp.join(''));
                    if (e.target.value && i < 5) {
                      const nextInput = document.querySelector(
                        `input[data-otp-index="${i + 1}"]`
                      ) as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  data-otp-index={i}
                  disabled={isLoading}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Try OTP: 000000 or 123456</p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || otp.length < 6}
            className="w-full bg-primary hover:bg-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Login'
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setOtpSent(false);
              setOtp('');
              setError('');
            }}
            disabled={isLoading}
            className="w-full"
          >
            Change Phone Number
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
