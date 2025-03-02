
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xouynokcgyuvzxuzwxlt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvdXlub2tjZ3l1dnp4dXp3eGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNTIzNDgsImV4cCI6MjA1NTcyODM0OH0._hBx_VyXT8VhdCeKlF-bDC3Sxmg5ZBvc0mAtW1RTDNA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
