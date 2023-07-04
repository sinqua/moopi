import { supabase } from "@/lib/database";
import MainCanvas from "../../../../components/MainCanvas";

export default async function Page(props: any) {
  const { vrm, animation, thumbnail } = await GetFileName(props.params.avatar);
  const thumbnaillUrl = await CreateImageUrl(props.params.user, thumbnail);
  const modelUrl = await CreateModelUrl(props.params.user, vrm);
  const animationUrl = await CreateAnimationUrl(animation);

  return (
    <div className="relative h-full">
      <MainCanvas
        userId={props.params.user}
        avatarId={props.params.avatar}
        modelUrl={modelUrl?.signedUrl}
        animationUrl={animationUrl?.signedUrl}
        thumbnailUrl={thumbnaillUrl?.signedUrl}
      />
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

async function GetFileName(avatar: number) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { vrm: undefined, animation: undefined, thumbnail: undefined };
  }
  const { data, error } = await supabase
    .from("avatars")
    .select("vrm, animation, thumbnail")
    .eq("id", avatar);

  return data![0];
}
