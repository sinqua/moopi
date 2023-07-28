import { supabase, supabaseAuth } from "@/lib/database";
import Description from "@/components/edit/description/description";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const detail = await getUserDetail(params.user);

  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <Description detail={detail} />
    </div>
  );
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};
