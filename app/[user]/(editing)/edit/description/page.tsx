import { supabase, supabaseAuth } from "@/lib/database";
import Description from "@/components/edit/description/description";

export default async function Page({ params }: { params: { user: string } }) {
  const profile = await getUserProfile(params.user);
  const detail = await getUserDetail(params.user);

  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <Description profile={profile} detail={detail} />
    </div>
  );
}

const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`id, description, image, tags (tag)`)
    .eq("user_id", id);

  return data![0];
};

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};
