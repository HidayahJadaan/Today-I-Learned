import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aigvrzfbwquobswctixl.supabase.co/rest/v1/facts";
const supabaseKey =
""
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
