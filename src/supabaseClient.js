import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nmayzbioufmprtllptbf.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXl6YmlvdWZtcHJ0bGxwdGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjkwMzQsImV4cCI6MjA5NTg0NTAzNH0.ovzVVFOVbjpxoQqoQNwSJiat0kKdyV-3byw29Vu88jU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
