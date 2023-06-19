import { supabase, supabaseAuth } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {

  return (
    <div>포트폴리오</div>
  );
}