import { supabase, supabaseAuth } from "@/lib/database";


export default async function Page({ params }: { params: { user: string } }) {

  return (
    <div>결제수단</div>
  );
}