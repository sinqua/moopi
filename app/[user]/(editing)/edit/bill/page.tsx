import { supabase, supabaseAuth } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <div>결제수단</div>
    </div>
  );
}
