import React from "react";
import AvatarModal from "@/components/profile/AvatarModal";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";

export default async function Avatar(props: any) {
  const { params } = props;

  const { vrm, animation, thumbnail } = await GetFileName(params.avatar);
  const modelUrl = await CreateModelUrl(params.user, vrm);
  const animationUrl = await CreateAnimationUrl(animation);
  const profileImage = await getUserProfileImage(params.user);
  const nickname = await getUserNickname(params.user);

  const avatarInfo = await getAvatarInfo(params.id);
  const tags = avatarInfo.tags.map((tag: any) => {
    return tag.tag;
  });

  return (
    <AvatarModal
      userId={props.params.user}
      avatarId={props.params.avatar}
      profileImage={profileImage.image}
      nickname={nickname.nickname}
      avatarInfo={avatarInfo}
      tags={tags}
      modelUrl={modelUrl?.signedUrl}
      animationUrl={animationUrl?.signedUrl}
      portfolios={null}
    />
  );
}

const getUserProfileImage = async (id: string) => {
  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`image`)
    .eq("user_id", id);

  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  if (profileData![0].image) {
    const url = await CreateImageUrl(profileData![0].image);
    return { image: url!.signedUrl };
  }
  return authData![0];
};

const getUserNickname = async (id: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select()
    .eq("id", id);

  return data![0];
};

const getAvatarInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select(`id, description, name, tags (tag), created_at`)
    .eq("id", id);

  return data![0];
};

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
