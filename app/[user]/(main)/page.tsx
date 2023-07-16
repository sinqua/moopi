import Description from "@/components/user/Description";
import { supabase } from "@/lib/database";

export async function generateStaticParams() {
    const { data, error } = await supabase.from("profiles").select();
  
    console.log(data)
    if (data)
      return data.map((profile: any) => ({
        user: profile.user_id,
      }));
    else {
      throw new Error("User not found");
    }
  }
  

export default async function Page({ params } : { params: { user: string }}) {

  const detail = await getUserDetail(params.user);
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
