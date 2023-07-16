import PortfolioCanvas from "../portfolio/PortfolioCanvas";
import { supabase } from "@/lib/database";

export const revalidate = 0;
interface PortfolioProps {
  user: any;
  portfolio: { [x: string]: any }[] | null;
}

export default function Portfolio(props: PortfolioProps) {
  const { user, portfolio } = props;

  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
        {portfolio!.map(async (work: any, index: any) => {
          const modelUrl = await CreateModelUrl(work.user_id, work.vrm);
          const animationUrl = await CreateAnimationUrl(work.animation);
          const thumbnailUrl = await CreateImageUrl(
            work.user_id,
            work.thumbnail
          );

          return (
            <PortfolioCanvas
              userId={user}
              avatarId={work.id}
              modelUrl={modelUrl?.signedUrl}
              animationUrl={animationUrl?.signedUrl}
              thumbnailUrl={thumbnailUrl?.signedUrl}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

async function CreateImageUrl(userId: string, filename: any) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { signedUrl: undefined };
  }

  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("image")
    .createSignedUrl(filepath, 3600);

  return data;
}

async function CreateModelUrl(userId: string, filename: any) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { signedUrl: undefined };
  }
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);

  return data;
}

async function CreateAnimationUrl(animationId: number) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { signedUrl: undefined };
  }

  const { data: filename, error: error1 } = await supabase
    .from("animations")
    .select("file")
    .eq("id", animationId);

  const filepath = `${filename![0].file}`;

  const { data, error } = await supabase.storage
    .from("animation")
    .createSignedUrl(filepath, 3600);

  return data;
}
