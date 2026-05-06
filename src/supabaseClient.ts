import { createClient } from '@supabase/supabase-js';

// يمكنك وضع روابط ومفاتيح Supabase الخاصة بك هنا مباشرة
// ستكون هذه البيانات مخفية داخل الكود ولن تظهر للمستخدمين في الموقع
const CONFIG_SUPABASE_URL = 'https://nyxkjdumcbdrnpqzuelo.supabase.co';
const CONFIG_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eGtqZHVtY2Jkcm5wcXp1ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzk0NTUsImV4cCI6MjA5MzY1NTQ1NX0.hlxvEaIHRAW-pKwb5XqqZqxVMcIz8Uoe8IzfQ1cwOkY';

const getUrl = () => {
  return import.meta.env.VITE_SUPABASE_URL || CONFIG_SUPABASE_URL;
};

const getKey = () => {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || CONFIG_SUPABASE_ANON_KEY;
};

export const isSupabaseConfigured = 
  Boolean(getUrl() && getUrl() !== 'YOUR_SUPABASE_URL_HERE' && getUrl() !== 'YOUR_SUPABASE_URL' && !getUrl().includes('YOUR_SURPABASE_URL') && getUrl() !== 'https://placeholder.supabase.co');

export const supabase = createClient(
  isSupabaseConfigured ? getUrl() : 'https://placeholder.supabase.co', 
  isSupabaseConfigured ? getKey() : 'placeholder'
);

