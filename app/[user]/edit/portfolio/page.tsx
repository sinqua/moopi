import Portfolio from "@/components/edit/portfolio/portfolio";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";

export default async function Page({ params }: { params: { user: string } }) {
  const portfolios = await getUserPortfolios(params.user);

  return <Portfolio portfolios={portfolios} />;
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
    portfolio.tags = tags;

    const { data: anmiationData, error: animationError } = await supabase
      .from("animations")
      .select()
      .eq("id", portfolio.animation);
    portfolio.animation = anmiationData![0];

    const url = await CreateImageUrl(
      portfolio.user_id + "/" + portfolio.thumbnail
    );
    portfolio.thumbnailUrl = url!.signedUrl;

    portfolios.push(portfolio);
  }

  return portfolios;
};
