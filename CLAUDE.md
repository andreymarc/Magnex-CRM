# Magnex CRM

Full-stack Customer Relationship Management SaaS application with multi-tenant architecture.

## Tech Stack

**Frontend:**
- React 18.2 + React Router 6
- Vite (build tool)
- Tailwind CSS (with RTL support)
- Recharts (analytics visualization)

**Backend:**
- Supabase (PostgreSQL + Auth + Row Level Security)

**Deployment:**
- Netlify

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard/        # Main CRM app
│   │   ├── Leads/        # Lead management
│   │   ├── Contacts/     # Customer/vendor database
│   │   ├── Tasks/        # Task management
│   │   ├── Deals/        # Sales pipeline
│   │   ├── Schedule/     # Calendar/events
│   │   ├── Documents/    # File storage
│   │   ├── Analytics/    # Reports & charts
│   │   ├── Payments/     # Invoices
│   │   ├── Settings/     # User settings
│   │   ├── Sidebar.jsx   # Navigation
│   │   └── AIAssistant.jsx
│   ├── LandingPage.jsx   # Public home page
│   ├── LoginPage.jsx     # Authentication
│   ├── RegisterPage.jsx  # User registration
│   └── ProtectedRoute.jsx
├── services/             # Supabase API layer
│   ├── leadsService.js
│   ├── contactsService.js
│   ├── tasksService.js
│   ├── dealsService.js
│   ├── eventsService.js
│   ├── documentsService.js
│   └── invoicesService.js
├── context/
│   └── AuthContext.jsx   # Authentication state
├── hooks/
│   └── useFeatureAccess.js  # Plan-based feature gating
├── lib/
│   └── supabase.js       # Supabase client
├── data/                 # Mock data fallbacks
├── App.jsx               # Routes & layout
└── main.jsx              # Entry point

database/
└── schema.sql            # PostgreSQL schema
```

## Environment Variables

```
VITE_SUPABASE_URL=<supabase-project-url>
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
```

## Routes

| Path | Component | Auth |
|------|-----------|------|
| `/` | LandingPage | No |
| `/pricing` | PricingPage | No |
| `/login` | LoginPage | No |
| `/register` | RegisterPage | No |
| `/dashboard` | Dashboard | Yes |
| `/dashboard/leads` | LeadsList | Yes |
| `/dashboard/contacts` | ContactsList | Yes |
| `/dashboard/tasks` | TasksList | Yes |
| `/dashboard/deals` | DealsList | Yes |
| `/dashboard/schedule` | ScheduleList | Yes |
| `/dashboard/documents` | DocumentsList | Yes |
| `/dashboard/analytics` | AnalyticsDashboard | Yes |
| `/dashboard/payments` | PaymentsList | Yes |
| `/dashboard/settings` | SettingsPage | Yes |

## Key Patterns

### Services with Mock Fallback
Each service (e.g., `leadsService.js`) checks if Supabase is configured. Falls back to mock data in `/src/data/` if not.

### Multi-Tenancy
- All data tables include `user_id` column
- Row Level Security (RLS) policies isolate user data
- `auth.users(id)` foreign key relationship

### Component Pattern
Each feature has a list component and modal for create/edit:
- `LeadsList.jsx` + `LeadModal.jsx`
- `ContactsList.jsx` + `ContactModal.jsx`
- etc.

### Authentication
- `AuthContext` provides user state globally
- `ProtectedRoute` wrapper redirects unauthenticated users
- Supabase handles email/password auth

## Database Tables

Core entities in `database/schema.sql`:
- `profiles` - User profiles and trial status
- `leads` - Prospect tracking with scoring
- `contacts` - Customers, vendors, partners
- `tasks` - To-dos and reminders
- `events` - Calendar appointments
- `documents` - File metadata
- `deals` - Sales pipeline stages
- `invoices` - Payment tracking

## Notes

- RTL/Hebrew language support throughout UI
- 30-day free trial model
- Mobile-responsive with collapsible sidebar
