'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FRAUD_FLAG_EXAMPLE, SAMPLE_CLAIMS } from '@/lib/mock-data';
import { AlertTriangle, Camera, Video, Upload, CheckCircle } from 'lucide-react';

export default function FraudVerificationPage() {
  const [verificationStep, setVerificationStep] = useState<'info' | 'selfie' | 'complete'>('info');
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const flaggedClaim = SAMPLE_CLAIMS.find((c) => c.fraudFlag);

  if (!flaggedClaim) {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Identity Verification</h1>
          <p className="text-muted-foreground">No active verification required at this time</p>
        </div>

        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="pt-6 text-center py-12">
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Account Verified</h3>
            <p className="text-muted-foreground mb-6">
              Your account is fully verified. All claims will be processed automatically.
            </p>
            <Button href="/dashboard/claims" variant="outline">
              View Claims
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Identity Verification Required</h1>
        <p className="text-muted-foreground">Complete verification to approve your claim</p>
      </div>

      {/* Alert */}
      <Card className="border-2 border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <AlertTriangle className="w-5 h-5" />
            Verification Needed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-orange-900">
          <p className="font-medium">
            Your claim for ₹{flaggedClaim.amount} is under review. We detected an unusual pattern and need to verify your identity.
          </p>
          <div className="bg-white/50 p-3 rounded border border-orange-200">
            <p className="text-sm font-medium mb-2">Reason for review:</p>
            <p className="text-sm">{FRAUD_FLAG_EXAMPLE.reason}</p>
          </div>
          <p className="text-sm">
            Complete verification below to approve your claim. You have until{' '}
            <span className="font-semibold">
              {new Date(FRAUD_FLAG_EXAMPLE.verificationDeadline).toLocaleDateString()}
            </span>{' '}
            to submit.
          </p>
        </CardContent>
      </Card>

      {/* Verification Process */}
      {verificationStep === 'info' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">What We Need</CardTitle>
            <CardDescription>Simple verification to approve your claim</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <VerificationItem
                icon={<Camera className="w-5 h-5" />}
                title="Selfie with ID"
                description="Take a clear photo of yourself holding your Aadhar or driver's license"
                required={true}
              />
              <VerificationItem
                icon={<Video className="w-5 h-5" />}
                title="Quick Video"
                description="Record a 30-second video confirming your work details (optional but recommended)"
                required={false}
              />
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Good lighting, clear face visible</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>ID document must be fully visible</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>No filters or face masks in photo/video</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>File size under 10MB</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => setVerificationStep('selfie')}
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground h-12"
            >
              Start Verification
            </Button>
          </CardContent>
        </Card>
      )}

      {verificationStep === 'selfie' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Upload Your Documents</CardTitle>
            <CardDescription>Step 1 of 2: Selfie with ID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selfie Upload */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Selfie with ID Document</h4>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Take a Selfie</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Hold up your ID document and take a clear selfie
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelfieUploaded(true);
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File or Take Photo
                </Button>
                {selfieUploaded && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    File uploaded successfully
                  </div>
                )}
              </div>
            </div>

            {/* Optional Video Upload */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Verification Video <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </h4>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Video className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Record a Video</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Optional: Record a 30-second video for faster approval
                </p>
                <Button
                  variant="outline"
                  onClick={() => setVideoUploaded(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File or Record Video
                </Button>
                {videoUploaded && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Video uploaded successfully
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-4 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setVerificationStep('info')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                disabled={!selfieUploaded}
                onClick={() => setVerificationStep('complete')}
                className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                Submit Verification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {verificationStep === 'complete' && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div>
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground">Verification Submitted!</h2>
              <p className="text-muted-foreground mt-2">Thank you for completing verification</p>
            </div>

            <div className="bg-white/50 border border-accent/20 rounded-lg p-4 space-y-2 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Claim Amount</span>
                <span className="font-semibold text-foreground">₹{flaggedClaim.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                  UNDER REVIEW
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expected Approval</span>
                <span className="font-semibold text-foreground">24-48 hours</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your documents have been submitted. We'll review them and process your claim as soon as possible. You'll receive a notification when we update your claim status.
            </p>

            <Button
              href="/dashboard/claims"
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8"
            >
              View Your Claims
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6 text-sm text-muted-foreground space-y-2">
          <p className="font-medium text-foreground">Privacy & Security</p>
          <p>
            Your documents are encrypted and stored securely. We use them only for claim verification and comply with all privacy regulations.
          </p>
          <p>
            Need help? <a href="#" className="text-primary font-medium hover:underline">Contact support</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface VerificationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  required: boolean;
}

function VerificationItem({ icon, title, description, required }: VerificationItemProps) {
  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg">
      <div className="text-primary flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">
          {title}
          {required && <span className="text-red-600 ml-1">*</span>}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}
