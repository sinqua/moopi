import Description from "@/components/user/info/Description";
import { supabase } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {
  const detail = await getUserDetail(params.user);
  console.log(detail);
  const descriptionObject =
    detail.description && JSON.parse(detail.description);

  return <Description descriptionObject={descriptionObject} />;
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("User not found");
  }
};
