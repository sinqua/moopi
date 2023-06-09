import { SupabaseClientOptions, createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
  {
    db: {
      schema: "next_auth",
    },
  }
);

export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    db: {
      schema: "public",
    }
  }
);
