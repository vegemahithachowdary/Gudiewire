'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2, Check } from 'lucide-react';
import Link from 'next/link';

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    handleSignup();
  };

  const handleSignup = async () => {
    try {
      await signup(email, phone, password);
      router.push('/dashboard/onboarding/platform-selection');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  if (step === 1) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Enter your email and phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStep1} className="space-y-4">
            {error && (
              <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Continue'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Set Your Password</CardTitle>
        <CardDescription>Create a secure password for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStep2} className="space-y-4">
          {error && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <ul className="text-xs text-muted-foreground space-y-1 mt-2">
              <li className={password.length >= 8 ? 'text-green-600' : ''}>
                {password.length >= 8 ? <Check className="inline w-3 h-3 mr-1" /> : '○ '} At least 8 characters
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <Input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            {confirmPassword && (
              <p className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {password === confirmPassword ? (
                  <>
                    <Check className="inline w-3 h-3 mr-1" /> Passwords match
                  </>
                ) : (
                  <>Passwords do not match</>
                )}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || password.length < 8 || password !== confirmPassword}
            className="w-full bg-primary hover:bg-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep(1)}
            disabled={isLoading}
            className="w-full"
          >
            Back
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
