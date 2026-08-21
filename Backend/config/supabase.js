import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE URL exists:", !!process.env.SUPABASE_URL);
console.log(
  "SUPABASE SERVICE ROLE KEY exists:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default supabase;
