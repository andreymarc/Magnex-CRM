# Environment Variables Setup

This document describes all required environment variables for Magnex CRM.

## Frontend Environment Variables (Vite)

These variables are prefixed with `VITE_` and are available in the browser. Set them in your `.env` file or Netlify dashboard.

### Supabase Configuration
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get:**
1. Go to your Supabase project: https://app.supabase.com
2. Navigate to Settings > API
3. Copy the "Project URL" (this is your `VITE_SUPABASE_URL`)
4. Copy the "anon public" key (this is your `VITE_SUPABASE_ANON_KEY`)

### Stripe Configuration (Frontend)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id_here
VITE_STRIPE_PRICE_ID_ANNUAL=price_your_annual_price_id_here
```

**How to get:**
1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to Developers > API keys
3. Copy the "Publishable key" (this is your `VITE_STRIPE_PUBLISHABLE_KEY`)
4. Navigate to Products > Create or select a product
5. Copy the Price IDs for monthly and annual plans

## Backend Environment Variables (Netlify Functions)

These variables are used by serverless functions and should be set in Netlify dashboard only, NOT in `.env` file.

### Stripe Secret Key
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**How to get:**
1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to Developers > API keys
3. Copy the "Secret key" (reveal it first if needed)

### Stripe Webhook Secret
```bash
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**How to get:**
1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to Developers > Webhooks
3. Create a webhook endpoint pointing to: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Copy the "Signing secret"

### Supabase Service Role Key
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ WARNING:** This key has admin access. Never expose it in frontend code or commit it to git.

**How to get:**
1. Go to your Supabase project: https://app.supabase.com
2. Navigate to Settings > API
3. Copy the "service_role" key (keep this secret!)

## Setup Instructions

### Local Development

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Fill in the `VITE_*` variables with your actual values

3. The backend variables (STRIPE_SECRET_KEY, etc.) are not needed for local development unless you're testing Netlify functions locally

### Production (Netlify)

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add all variables:
   - All `VITE_*` variables (for build-time)
   - `STRIPE_SECRET_KEY` (for serverless functions)
   - `STRIPE_WEBHOOK_SECRET` (for serverless functions)
   - `SUPABASE_SERVICE_ROLE_KEY` (for serverless functions)

4. Make sure to set them for the "Production" context

## Security Notes

- ✅ The `.env` file is already in `.gitignore` - never commit it
- ✅ Never commit `.env.local`, `.env.production`, etc.
- ✅ Never expose `SUPABASE_SERVICE_ROLE_KEY` or `STRIPE_SECRET_KEY` in frontend code
- ✅ Use different keys for development and production
- ✅ Rotate keys if they're ever exposed

## Example .env File

Create a `.env` file in the project root with this structure:

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_MONTHLY=price_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_ANNUAL=price_xxxxxxxxxxxxx
```

