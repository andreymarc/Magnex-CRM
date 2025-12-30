# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your Magnex CRM.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `magnex-crm` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Click "Create new project"
6. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon public** key (this is your `VITE_SUPABASE_ANON_KEY`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2

## Step 4: Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Open the file `database/schema.sql` from this project
3. Copy the entire SQL content
4. Paste it into the Supabase SQL Editor
5. Click "Run" to execute the SQL
6. This will create all the necessary tables for:
   - Leads (ניהול מתעניינים)
   - Contacts (ניהול לקוחות)
   - Tasks (ניהול משימות והתראות)
   - Events (ניהול יומן אירועים)
   - Documents (ניהול מסמכים בענן)
   - Projects (ניהול פרויקטים)
   - Service Calls (ניהול קריאות שירות)
   - Campaigns (ריכוז ובקרת נתוני קמפיינים)
   - Forms (טפסי קליטה אוטומטים)
   - Deals
   - Email Integration (חיבור תיבת אימייל)

## Step 5: Set Up Authentication (Optional but Recommended)

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable the authentication methods you want (Email, Google, etc.)
3. Configure the settings as needed

## Step 6: Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

This will install `@supabase/supabase-js` and other dependencies.

## Step 7: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/dashboard/leads` in your browser
3. Try creating a new lead
4. If you see an error about Supabase not being configured, check your `.env` file

## Troubleshooting

### Error: "Supabase URL and Anon Key are not configured"

- Make sure your `.env` file exists in the root directory
- Make sure the variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your development server after creating/modifying the `.env` file
- Make sure there are no spaces around the `=` sign in your `.env` file

### Error: "Failed to load leads"

- Check that you've run the SQL schema in Step 4
- Verify your API keys are correct
- Check the Supabase dashboard for any error messages
- Make sure Row Level Security (RLS) policies allow your operations

### Database Connection Issues

- Verify your project is active in Supabase dashboard
- Check that your database password is set correctly
- Ensure your IP is not blocked (Supabase allows all IPs by default)

## Next Steps

Once Supabase is set up, you can start implementing features:

1. ✅ **Lead Management** - Already implemented! Check `/dashboard/leads`
2. **Contact Management** - Coming next
3. **Task Management** - Coming next
4. And more...

## Security Notes

- Never commit your `.env` file to git (it's already in `.gitignore`)
- The `anon` key is safe to use in client-side code, but don't expose your `service_role` key
- Row Level Security (RLS) policies are set up to protect your data
- Customize the RLS policies in `database/schema.sql` based on your needs

## Support

If you encounter issues:
1. Check the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Check the browser console for error messages
3. Verify your Supabase project is active and running

