import PriceInfo from "@/components/edit/priceInfo/priceInfo";
import { supabase, supabaseAuth } from "@/lib/database";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const detail = await getUserDetail(params.user);

  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <PriceInfo detail={detail} />
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
