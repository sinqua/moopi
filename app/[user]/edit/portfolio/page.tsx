import Portfolio from "@/components/edit/portfolio/portfolio";
import { supabase, supabaseAuth } from "@/lib/database";

export default async function Page({ params }: { params: { user: string } }) {
  const portfolios = await getUserPortfolios(params.user);
  console.log("portfolios", portfolios);

  return <Portfolio portfolios={portfolios} />;
}

const getUserPortfolios = async (id: string) => {
  const { data: portfoiloData, error: portfolioError } = await supabase
    .from("avatars")
    .select()
    .eq("user_id", id);

  portfoiloData?.map(async (portfolio: any) => {
    const { data, error } = await supabase
      .from("tags")
      .select('tag')
      .eq("avatar_id", portfolio.id);

    console.log("data", data);
  });

  return portfoiloData;
};
