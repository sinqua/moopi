import { supabase } from "@/lib/database";
import EmbedCanvas from "@/components/embed/EmbedCanvas";

export const revalidate = 0;

export default async function Page({ params }: { params: { avatar: string } }) {
  const avatar = await getAvatarInfo(params.avatar);
  const modelUrlData = avatar.user_id && await CreateModelUrl(avatar.user_id, avatar.vrm);

  return (
    <div className="relative h-full">
      <EmbedCanvas
        modelUrl={modelUrlData && modelUrlData?.signedUrl}
        animation={avatar?.animation}
        thumbnail={avatar?.thumbnail}
        userID={avatar?.user_id}
      />
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

    if(data) return data;
    else {
      throw new Error("Avatar not found");
    }
}


async function CreateModelUrl(userId: string, filename: any) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);
  
  return data;
}