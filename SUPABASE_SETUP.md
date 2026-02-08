# Supabase Setup Guide for Valentine Vibes 💘

This application uses Supabase for storing responses and powering the real-time dashboard.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Note your **Project URL** and **Anon Key** (in Settings > API).

## 2. Run SQL Schema

Go to the **SQL Editor** in your Supabase dashboard and run the following script to set up the database:

```sql
-- Create the table for responses
create table valentine_responses (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Core Profile Data
  profile_type text not null,       -- e.g. 'old-school', 'strategique'
  gender text,                      -- Q1
  age_range text,                   -- Q2
  country text,                     -- Q3
  status text,                      -- Q4
  duration text,                    -- Q5
  
  -- Key Metrics for Dashboard
  celebrate_attitude text,          -- Q6
  importance_level integer,         -- Q7 (1-5)
  social_pressure text,             -- Q8
  budget_range text,                -- Q9
  gift_preference text,             -- Q10
  financial_stress text,            -- Q12
  social_influence_level text,      -- Q16
  social_network text,              -- Q17

  -- Raw Answers (JSON) for full export
  answers jsonb not null
);

-- Enable Row Level Security (RLS)
alter table valentine_responses enable row level security;

-- Create Policy: Allow anonymous users to INSERT responses
create policy "Enable insert for everyone" 
on valentine_responses for insert 
with check (true);

-- Create Policy: Allow anonymous users to SELECT (for public dashboard stats)
-- Ideally restrict to specific columns or aggregations in production, but okay for demo.
create policy "Enable read access for everyone" 
on valentine_responses for select 
using (true);

-- Enable Realtime for this table
alter publication supabase_realtime add table valentine_responses;
```

## 3. Environment Variables

Create a `.env` file in the root of your project (`valentine-vibes-check`) and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 4. Restart Development Server

After adding the `.env` file, restart your dev server:

```bash
npm run dev
```

Your dashboard will now display LIVE data from real users! 🚀
