import Portfolio from "@/components/user/info/Portfolio";
import { supabase } from "@/lib/database";

export const revalidate = 0;

export default async function Page(props: any) {
  const { params } = props;
  const portfolio = await getPortfoilo(params.user);

  return <Portfolio user={params.user} portfolio={portfolio} />;
}

const getPortfoilo = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select(`*, animations(*)`)
    .eq("user_id", id);
  return data;
};
