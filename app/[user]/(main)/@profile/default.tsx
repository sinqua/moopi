import { supabase, supabaseAuth } from "@/lib/database";
import User from "@/components/user/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Default(props: any) {
  const { params } = props;
  const profileImageData = getUserProfileImage(params.user);
  const nicknameData = getUserNickname(params.user);
  const profileData = getUserProfile(params.user);
  const slotData = getSlot(params.user);

  const avatar = await getUserAvatar(params.user);
  const modelUrlData = CreateModelUrl(params.user, avatar.vrm);

  const [
    profileImage,
    nickname,
    profile,
    slot,
    modelUrl,
  ] = await Promise.all([
    profileImageData,
    nicknameData,
    profileData,
    slotData,
    modelUrlData,
  ]);

  const tags = profile.tags.map((tag: any) => {
    return tag.tag;
  });

  const session = await getServerSession(authOptions);

  return (
    <User
      session={session}
      profileImage={profileImage.image}
      nickname={nickname.nickname}
      profileDescription={profile.description}
      tags={tags}
      profile={profile}
      id={params.user}
      slot={slot}
      avatarID={avatar.id}
      modelUrl={modelUrl?.signedUrl}
      animation={avatar.animation!}
      thumbnailUrl={`${params.user}/${avatar.thumbnail}`}
    />
  );
}

const getUserAvatar = async (id: string) => {
  // if (process.env.NEXT_PUBLIC_WEBSITE === "http://localhost:3000") {
  //   return { id: undefined, vrm: undefined, animation: undefined, thumbnail: undefined };
  // }

  const { data, error } = await supabase
    .from("avatars")
    .select("id, vrm, animation, thumbnail")
    .eq("user_id", id)
    .eq("is_profile", true);

  return data![0];
};

const getUserNickname = async (id: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select()
    .eq("id", id);

  return data![0];
};

const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`id, description, image, tags (tag)`)
    .eq("user_id", id);

  return data![0];
};

const getUserProfileImage = async (id: string) => {
  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  return authData![0];
};

const getSlot = async (id: string) => {
  const { data, error } = await supabase
    .from("slots")
    .select()
    .eq("user_id", id)
    .limit(1)
    .single();

  return data;
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