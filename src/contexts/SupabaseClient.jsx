import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL='https://ytxapdcxrcrhhpdlrkwd.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGFwZGN4cmNyaGhwZGxya3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzU0MDQsImV4cCI6MjAxMTA1MTQwNH0.szlk-bCxomSVlpEbhRrf9FCnMlf9h9EA5u2efOahqDQ'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
