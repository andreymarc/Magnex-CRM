-- ============================================
-- MIGRATION: Add Subdomain Support for Multi-Tenant
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Add subdomain column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subdomain VARCHAR(100);

-- Step 2: Add unique constraint on subdomain (allows NULL for existing records)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_subdomain ON profiles(subdomain) WHERE subdomain IS NOT NULL;

-- Step 3: Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_subdomain_lookup ON profiles(subdomain);

-- ============================================
-- DONE! Subdomain support is now enabled.
-- Each company can have a unique subdomain like: companyname.magnex-crm.com
-- ============================================


