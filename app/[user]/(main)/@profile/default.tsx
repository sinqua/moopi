import { supabase, supabaseAuth } from "@/lib/database";
import User from "@/components/user/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("profiles").select();

  console.log(data)
  if (data)
    return data.map((profile: any) => ({
      user: profile.user_id,
    }));
  else {
    throw new Error("User not found");
  }
}

export default async function Default({ params } : { params: { user: string }}) {
  const slotData = getSlot(params.user);
  const avatarData = getAvatar(params.user);
  const profileData = getProfile(params.user);
  const authData = getAuth(params.user);
  const sessionData = getServerSession(authOptions);

  const [slot, avatar, profile, auth, session] = await Promise.all([
    slotData,
    avatarData,
    profileData,
    authData,
    sessionData,
  ]);

  const tags = profile.tags.map((tag: any) => {
    return tag.tag;
  });

  const modelUrl = await createModelUrl(params.user, avatar?.vrm);

  return (
    <User
      session={session}
      tags={tags}
      profileImage={auth.image}
      nickname={auth.nickname}
      profileDescription={profile.description}
      profile={profile}
      id={params.user}
      slot={slot}
      avatarID={avatar.id}
      modelUrl={modelUrl.signedUrl}
      animation={avatar.animation}
      thumbnailUrl={`${params.user}/${avatar.thumbnail}`}
    />
  );
}

const getAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select()
    .eq("user_id", id)
    .eq("is_profile", true)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Avatar not found");
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

const getSlot = async (id: string) => {
  const { data, error } = await supabase
    .from("slots")
    .select()
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Slot not found");
  }
};

async function createModelUrl(userId: string, filename: any) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);

  if (data) return data;
  else {
    throw new Error("Model not found");
  }
}
