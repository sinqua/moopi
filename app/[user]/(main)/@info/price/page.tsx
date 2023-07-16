import Price from "@/components/user/Price";
import { supabase } from "@/lib/database";

export default async function Page(props: any) {
  const { params } = props;

  const detail = await getUserDetail(params.user);
  const priceInfoObject = JSON.parse(detail.price_info!);

  return <Price priceInfoObject={priceInfoObject} />;
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};
