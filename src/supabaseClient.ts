import { createClient } from '@supabase/supabase-js';

const getUrl = () => localStorage.getItem('SUPABASE_URL') || import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const getKey = () => localStorage.getItem('SUPABASE_ANON_KEY') || import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const isSupabaseConfigured = 
  Boolean(localStorage.getItem('SUPABASE_URL')) || 
  (Boolean(import.meta.env.VITE_SUPABASE_URL) && import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL');

export const supabase = createClient(getUrl(), getKey());

