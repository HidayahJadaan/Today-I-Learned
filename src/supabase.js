import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aigvrzfbwquobswctixl.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZ3ZyemZid3F1b2Jzd2N0aXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMzUwMzMsImV4cCI6MjAyMDkxMTAzM30.qAQxTboiA5MnAhjVKbbIpji6UxqcMy8I00JtNNGIuBk"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
