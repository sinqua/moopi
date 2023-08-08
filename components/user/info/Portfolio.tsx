import { Suspense } from "react";
import PortfolioCanvas from "../../portfolio/PortfolioCanvas";
import { supabase } from "@/lib/database";

export const revalidate = 0;
interface PortfolioProps {
  user: any;
  portfolio: { [x: string]: any }[] | null;
}

const SupabasePublicURL =
  "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

export default function Portfolio(props: PortfolioProps) {
  const { user, portfolio } = props;

  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
        {portfolio!.map(async (work: any, index: any) => {
          const modelUrl = await CreateModelUrl(work.user_id, work.vrm);
          const avatar = await getAvatarInfo(work.id);

          return (
            <Suspense fallback={''} key={index}>
              <PortfolioCanvas
                userId={user}
                avatarId={work.id}
                modelUrl={modelUrl?.signedUrl}
                animation={avatar?.animation}
                thumbnailUrl={`${SupabasePublicURL}/thumbnail/${work.user_id}/${work.thumbnail}`}
              />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}

async function getAvatarInfo(id: string) {
  const { data, error } = await supabase
    .from("avatars")
    .select(`*, animations(*)`)
    .eq("id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Avatar not found");
  }
}

async function CreateModelUrl(userId: string, filename: any) {
  if (process.env.NEXT_PUBLIC_ENV === "Development") {
    return { signedUrl: undefined };
  }
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);

  return data;
}
