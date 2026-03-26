import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://reuguerhjiitmliphtji.supabase.co';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJldWd1ZXJoamlpdG1saXBodGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0Njg0NzgsImV4cCI6MjA5MDA0NDQ3OH0.f7iO_XoVvqSTY8se3TWL9PTzTUH7AO08E5iUS54dRhs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
