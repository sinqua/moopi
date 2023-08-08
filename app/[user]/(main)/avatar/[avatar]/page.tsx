import React from "react";
import AvatarModal from "@/components/user/profile/AvatarModal";
import { supabase, supabaseAuth } from "@/lib/database";

export const revalidate = 0;

export default async function Avatar(props: any) {
  const { params } = props;

  console.log("params", params)
  const profileData = getProfile(params.user);
  const authData = getAuth(params.user);
  const avatarData = getAvatar(params.avatar);
  const portfoliosData = getUserPortfolios(params.user);

  const [
    profile,
    auth,
    avatar,
    portfolios,
  ] = await Promise.all([
    profileData,
    authData,
    avatarData,
    portfoliosData,
  ]);

  const tags = avatar.tags.map((tag: any) => {
    return tag.tag;
  });
  const modelUrl = await createModelUrl(params.user, avatar?.vrm);


  return (
    <AvatarModal
      profile={profile}
      nickname={auth.nickname}
      avatar={avatar}
      tags={tags}
      portfolios={portfolios}
      modelUrl={modelUrl?.signedUrl}
      animation={avatar?.animation}
    />
  );
}

const getAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select('*, tags (tag)')
    .eq("id", id)
    .limit(1)
    .single();
    console.log("id", id)
    console.log("data", data)

  if (data) return data;
  else {
    throw new Error("Avatar not found");
  }
};

const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*,  tags (tag)`)
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Profile not found");
  }
};

const getAuth = async (id: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("User not found");
  }
};

async function createModelUrl(userId: string, filename: any) {
  if(!filename) return { signedUrl: "" };

  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);

  if (data) return data;
  else{
    throw new Error("Model not found");
  }
}

const getUserPortfolios = async (id: string) => {
  // const { data: portfoiloData, error: portfolioError } = await supabase
  //   .from("avatars")
  //   .select()
  //   .eq("user_id", id);

  // const portfolios = [];
  // for (const portfolio of portfoiloData!) {
  //   const { data: tagData, error: tagError } = await supabase
  //     .from("tags")
  //     .select("tag")
  //     .eq("avatar_id", portfolio.id);

  //   const tags = tagData?.map((tag: any) => Object.values(tag)[0]) || [];
  //   portfolio.tags! = tags;

  //   const { data: anmiationData, error: animationError } = await supabase
  //     .from("animations")
  //     .select()
  //     .eq("id", portfolio.animation);
  //   portfolio.animation = anmiationData![0];

  //   const url = await CreateImageUrl(
  //     portfolio.user_id + "/" + portfolio.thumbnail
  //   );
  //   portfolio.thumbnailUrl = url ? url!.signedUrl : "";

  //   portfolios.push(portfolio);
  // }

  // return portfolios;
};
