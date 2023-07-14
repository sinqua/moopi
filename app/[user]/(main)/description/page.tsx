import Description from "@/components/user/Description";
import { supabase } from "@/lib/database";

export default async function Page(props: any) {
  const { params } = props;

  const detail = await getUserDetail(params.user);
  const descriptionObject = JSON.parse(detail.description);

  return <Description descriptionObject={descriptionObject} />;
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};


