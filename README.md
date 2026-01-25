# aSaaSin Template

Modern SaaS boilerplate using Next.js App Router, Supabase, Tailwind CSS, Polar, and TinaCMS for a fast, production‑ready start.

## ✨ Features

- Next.js 15 App Router: routing, SSR/SSG, API routes
- Supabase: authentication, database, storage
- Polar: subscriptions and one‑time payments
- TinaCMS: visual editing for landing, blog, and docs
- Tailwind CSS: utility‑first styling with dark mode
- SEO metadata and Open Graph
- UI kit with landing sections (Hero, Pricing, FAQ, etc.)

## ✅ Prerequisites

- Node.js (LTS)
- Yarn
- Git

## 🚀 Quick start

```
# Clone
git clone https://github.com/AntonWeigel/template.asaasin.dev.git
cd template.asaasin.dev

# Install
yarn install

# Dev
yarn dev
# App: http://localhost:3000
```

## ⚙️ Environment

Create a local environment file and fill in values.

```
cp .env.example .env

# General
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false

# Feature flags
ENABLE_AUTH=true
ENABLE_SUPABASE=true
ENABLE_RESEND=false
ENABLE_OPENAI=false
ENABLE_POLAR=false

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# TinaCMS (optional for local; required for production editing)
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
TINA_SEARCH_TOKEN=

# Resend (emails/newsletter)
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
RESEND_NOTIFICATION_EMAIL=

# Polar (payments)
POLAR_API_KEY=
POLAR_WEBHOOK_SECRET=
POLAR_SUCCESS_URL=http://localhost:3000/success?checkout_id={CHECKOUT_ID}

# OpenAI (optional)
OPENAI_API_KEY=
```

## 🎛️ Feature flags

Feature flags control optional integrations. Set these in `.env` to enable/disable functionality:

- `ENABLE_AUTH=true`: Authentication pages and protected routes
- `ENABLE_SUPABASE=true`: Database connections and auth (required if ENABLE_AUTH=true)
- `ENABLE_RESEND=false`: Email sending and newsletter features
- `ENABLE_OPENAI=false`: AI-powered features
- `ENABLE_POLAR=false`: Payment and subscription handling
- `NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false`: Global maintenance redirect (public flag for middleware)

Default configuration enables auth and Supabase for core functionality. Other integrations are opt-in.

## 🗄️ Supabase setup

1. Create a project at supabase.com.
2. In Project settings → API, copy Project URL, anon key, and service role key into `.env`.
3. Apply DB schema and initialize storage buckets:

```
yarn setup
```

Notes:
- `NEXT_PUBLIC_SUPABASE_URL`: project API URL (safe to expose).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon key for browser/server calls that require no elevated privileges (safe to expose).
- `SUPABASE_SERVICE_ROLE_KEY`: service role key for privileged server tasks (never expose to the browser).

## 💳 Polar setup

Environment:

```
POLAR_API_KEY=
POLAR_WEBHOOK_SECRET=
POLAR_SUCCESS_URL=https://your-domain/success?checkout_id={CHECKOUT_ID}
```

Steps:
- Create products in Polar for one‑time purchases and/or subscriptions.
- Store each Polar `product_id` in the DB mapping (table `subscription_plans`, unique by `(name, billing_cycle)`).
- Webhook endpoint: `/api/webhooks/polar` with signature verification using `POLAR_WEBHOOK_SECRET`.

Enable webhook events:
- `subscription.created`
- `subscription.updated`
- `subscription.canceled`
- `order.created`
- `order.refunded`

Flows:
- Subscription: after authentication, a server action creates a Polar checkout and redirects; success returns to `POLAR_SUCCESS_URL`.
- One‑time purchase: a server action creates checkout and redirects immediately; authentication not required.

Local development:
- Run the app and expose port 3000 via a tunnel (e.g., ngrok).
- Use the tunnel URL for `POLAR_SUCCESS_URL` and in Polar's webhook settings pointing to `/api/webhooks/polar`.

## ✉️ Resend setup

- Create an account and API key.
- Create an Audience for newsletters.
- Verify the sending domain.
- Set `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_NOTIFICATION_EMAIL` in `.env`.

## 📈 Google Analytics

- Create a GA4 property and copy the Measurement ID (`G-XXXXXXXXXX`).
- Set `NEXT_PUBLIC_GA_ID` in `.env`.
- Tracking is wired via `@next/third-parties/google` in the root layout; no manual script tag needed.

## ✍️ TinaCMS

- Works locally without credentials.
- When connecting to Tina Cloud for production editing, set:
    - `NEXT_PUBLIC_TINA_CLIENT_ID`
    - `TINA_TOKEN`
    - `TINA_SEARCH_TOKEN`

## 📁 Folder structure

```
.
├── app              # App Router pages & API routes
├── components       # Reusable UI components
├── layout           # Layout wrappers
├── constants        # Shared constants (colors, SEO, enums, maps)
├── hooks            # React hooks
├── services         # Supabase & Polar wrappers
├── types            # Global TS types
├── utils            # Helper functions
├── content          # Markdown docs + TinaCMS data
└── public           # Static assets
```

## 🧪 Using this template

- Mark this repository as a template in Settings.
- For private templates, grant purchasers the GitHub repository role Read; this is sufficient to use "Use this template" and create a new repository without write access.

## 🔒 Security notes

- Keep the Supabase service role key server‑only.
- Verify webhook signatures and make handlers idempotent (unique constraints + upserts).
- Rotate keys if compromised; lock down production (webhook secrets, allowlists, least privilege).

## 🚀 Deploy

Deploy on any Next.js‑compatible platform.  
Set the equivalent production environment variables in the hosting provider before starting the app.
