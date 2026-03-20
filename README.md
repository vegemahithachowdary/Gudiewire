# Guidewire Frontend

Professional insurance platform built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Dashboard**: Claims, policy management, fraud verification, disruptions
- **Auth**: Login/Signup with forms
- **Onboarding**: Multi-step flow (location, income, risk preference, hours, platform)
- **Responsive**: Mobile-first design with sidebar/navigation
- **Modern UI**: 50+ shadcn/ui components (tables, charts, forms, modals)

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui, Tailwind CSS
- **State**: React Context
- **Charts**: Recharts
- **Forms**: react-hook-form, Zod
- **Icons**: Lucide React

## 📦 Quick Start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## 📁 Structure

```
app/
├── (auth)/          # Login/Signup
├── (dashboard)/     # Main app
└── (onboarding)/    # Wizard flow
components/
├── gigshield/       # Custom theme
└── ui/              # shadcn components
lib/                 # Utils, types, mock data
public/              # Assets
```

## 🎯 Pages

- `/` - Landing
- `/login`, `/signup`
- `/dashboard/*` - Claims, Policy, Fraud, Settings
- `/onboarding/*` - Multi-step setup

## 🔮 Future

- API integration
- Real-time updates
- PWA support
- Dark mode toggle

Hackathon-ready insurance platform!
