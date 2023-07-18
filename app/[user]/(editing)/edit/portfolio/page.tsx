import Portfolio from "@/components/edit/portfolio/portfolio";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";

export default async function Page({ params }: { params: { user: string } }) {
  const portfolios = await getUserPortfolios(params.user);

  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <Portfolio portfolios={portfolios} />
    </div>
  );
}

const getUserPortfolios = async (id: string) => {
  const { data: portfoiloData, error: portfolioError } = await supabase
    .from("avatars")
    .select()
    .eq("user_id", id);

  const portfolios = [];
  for (const portfolio of portfoiloData!) {
    const { data: tagData, error: tagError } = await supabase
      .from("tags")
      .select("tag")
      .eq("avatar_id", portfolio.id);
    
    const tags = tagData?.map((tag: any) => Object.values(tag)[0]) || [];

    const SupabasePublicURL = "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public"

    let url = `${SupabasePublicURL}/thumbnail/${portfolio.user_id + "/" + portfolio.thumbnail}`
    if(portfolio.thumbnail === null)
      url =  '/VerticalModel.png'

    const newPortfolio = {
      ...portfolio,
      tags,
      thumbnailUrl: url,
    }
    portfolios.push(newPortfolio);
  }

  return portfolios;
};
