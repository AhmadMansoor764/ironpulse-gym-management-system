import { createClient } from "@supabase/supabase-js";

console.log("========== SUPABASE UPLOAD TEST ==========");
console.log("Bucket:", "gym-member-images");
console.log("File:", req.file?.originalname);
console.log("Mime:", req.file?.mimetype);
console.log("Size:", req.file?.size);
console.log("SUPABASE_URL exists:", Boolean(process.env.SUPABASE_URL));
console.log(
  "SUPABASE_SERVICE_ROLE_KEY exists:",
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
);
console.log("==========================================");

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
