import { supabase } from "@/lib/database";
import MainCanvas from "../../../../components/MainCanvas";

export default async function Page({
  params,
}: {
  params: { user: string; avatar: number };
}) {
  const { vrm, animation } = await GetFileName(params.avatar);
  const modelUrl = await CreateModelUrl(params.user, vrm);
  const animationUrl = await CreateAnimationUrl(animation);

  return (
    <div className="h-full">
      <MainCanvas
        modelUrl={modelUrl?.signedUrl}
        animationUrl={animationUrl?.signedUrl}
      />
    </div>
  );
}

async function CreateModelUrl(userId: string, filename: any) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { signedUrl: undefined };
  }
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 60);

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
    .createSignedUrl(filepath, 60);

  return data;
}

async function GetFileName(avatar: number) {
  if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
    return { vrm: undefined, animation: undefined };
  }
  const { data, error } = await supabase
    .from("avatars")
    .select("vrm, animation")
    .eq("id", avatar);

  console.log(data);

  return data![0];
}
