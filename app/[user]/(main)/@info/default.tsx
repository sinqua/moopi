import Description from "@/components/user/Description";
import { supabase } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {
  return <div>@info, default.tsx</div>
}
