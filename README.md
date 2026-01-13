# Magnex CRM

A modern, full-stack Customer Relationship Management (CRM) SaaS application built with React and Supabase. Designed for businesses to manage customers, track sales, handle invoicing, and streamline operations—all in one place.

## 🌟 Features

- **Customer Management**: Complete contact database with customer, vendor, and partner tracking
- **Lead Management**: Track and score leads with AI-powered insights
- **Sales Pipeline**: Visual deal tracking through customizable stages
- **Task Management**: Organize to-dos, reminders, and deadlines
- **Calendar & Scheduling**: Manage events and appointments
- **Document Storage**: Centralized file management
- **Invoicing & Payments**: Generate invoices and process payments via Stripe
- **Analytics Dashboard**: Real-time reports and visualizations
- **Multi-language Support**: English and Hebrew (RTL) with automatic detection
- **Multi-tenant Architecture**: Secure data isolation per user
- **Free Trial**: 30-day trial period with no credit card required

## 🚀 Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with RTL support
- **Recharts** - Data visualization library
- **React Icons** - Icon library

### Backend
- **Supabase** - PostgreSQL database with Row Level Security
- **Supabase Auth** - Authentication and user management
- **Stripe** - Payment processing and subscription management

### Deployment
- **Netlify** - Hosting and serverless functions
- **Netlify Functions** - Serverless API endpoints for Stripe webhooks

## 📋 Prerequisites

- Node.js 20+ and npm
- Supabase account (free tier available)
- Stripe account (for payment processing)
- Git (for version control)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Magnex-CRM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory. See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.
   
   Minimum required variables:
   ```bash
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   VITE_STRIPE_PRICE_ID_MONTHLY=your-monthly-price-id
   VITE_STRIPE_PRICE_ID_ANNUAL=your-annual-price-id
   ```

4. **Set up Supabase database**
   
   See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database setup instructions.
   - Run the SQL scripts in the `database/` directory
   - Configure Row Level Security policies
   - Set up authentication providers

5. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
Magnex-CRM/
├── public/                 # Static assets
│   ├── favicon.svg        # App favicon
│   ├── sitemap.xml        # SEO sitemap
│   └── robots.txt         # Search engine directives
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard/     # Main CRM application
│   │   │   ├── Leads/     # Lead management
│   │   │   ├── Contacts/  # Contact management
│   │   │   ├── Tasks/     # Task management
│   │   │   ├── Deals/     # Sales pipeline
│   │   │   ├── Schedule/  # Calendar/events
│   │   │   ├── Documents/ # File storage
│   │   │   ├── Analytics/ # Reports & charts
│   │   │   ├── Payments/  # Invoices & payments
│   │   │   └── Settings/  # User settings
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   ├── NotFound.jsx
│   │   └── ErrorBoundary.jsx
│   ├── context/           # React contexts
│   │   ├── AuthContext.jsx
│   │   └── LanguageContext.jsx
│   ├── services/          # API service layer
│   │   ├── leadsService.js
│   │   ├── contactsService.js
│   │   ├── tasksService.js
│   │   ├── dealsService.js
│   │   ├── eventsService.js
│   │   ├── documentsService.js
│   │   ├── invoicesService.js
│   │   └── stripeService.js
│   ├── lib/               # Library configurations
│   │   └── supabase.js
│   ├── hooks/             # Custom React hooks
│   │   └── useFeatureAccess.js
│   ├── utils/             # Utility functions
│   │   └── authErrors.js
│   ├── data/              # Mock data (fallback)
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── database/              # SQL scripts
│   ├── schema.sql         # Main database schema
│   ├── migration-multi-tenant.sql
│   ├── migration-stripe.sql
│   └── reset-database.sql
├── netlify/
│   └── functions/         # Serverless functions
│       ├── stripe-webhook.js
│       ├── create-checkout-session.js
│       └── create-portal-session.js
├── netlify.toml           # Netlify configuration
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔐 Authentication

The app uses Supabase Auth for authentication:
- Email/password authentication
- Magic link (passwordless) login
- Email verification
- Password reset functionality

## 💳 Payment Integration

Stripe integration for subscription management:
- Monthly and annual subscription plans
- Secure checkout via Stripe Checkout
- Webhook handling for subscription events
- Customer portal for subscription management

## 🌍 Internationalization

- **Languages**: English and Hebrew
- **RTL Support**: Full right-to-left layout for Hebrew
- **Auto-detection**: Detects user location and sets language accordingly
- **Manual switching**: Users can change language preference

## 🚢 Deployment

### Deploy to Netlify

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

**Quick deploy:**
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Set these in Netlify dashboard (Site settings > Environment variables):
- All `VITE_*` variables (for build-time)
- `STRIPE_SECRET_KEY` (for serverless functions)
- `STRIPE_WEBHOOK_SECRET` (for serverless functions)
- `SUPABASE_SERVICE_ROLE_KEY` (for serverless functions)

## 📚 Documentation

- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables setup guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase database setup
- [DEPLOY.md](./DEPLOY.md) - Deployment instructions
- [CLAUDE.md](./CLAUDE.md) - Technical architecture overview

## 🔒 Security

- Row Level Security (RLS) policies for data isolation
- Secure authentication via Supabase
- HTTPS enforced (automatic on Netlify)
- Environment variables for sensitive data
- No sensitive keys in frontend code

## 🧪 Testing

Currently, the project doesn't include automated tests. Manual testing checklist:
- [ ] User registration and login
- [ ] All CRUD operations (leads, contacts, tasks, etc.)
- [ ] Payment flow (test mode)
- [ ] Email verification
- [ ] Language switching
- [ ] RTL layout (Hebrew)
- [ ] Mobile responsiveness
- [ ] Error handling

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For support, email: support@magnex-crm.com

## 🗺️ Roadmap

- [ ] Automated testing suite
- [ ] Advanced analytics features
- [ ] Email integration
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Webhook integrations
- [ ] Custom fields and workflows

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

**Built with ❤️ for modern businesses**

