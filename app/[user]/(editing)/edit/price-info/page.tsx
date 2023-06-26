import PriceInfo from "@/components/edit/priceInfo/priceInfo";
import { supabase, supabaseAuth } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {
  const profile = await getUserProfile(params.user);
  const detail = await getUserDetail(params.user);

  return (
    <PriceInfo profile={profile} detail={detail} />
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