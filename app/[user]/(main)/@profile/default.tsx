import { CreateImageUrl } from "@/lib/storage";
import { supabase, supabaseAuth } from "@/lib/database";
import User from "@/components/user/user";

export const revalidate = 120;

export default async function Default(props: any) {
  const { params } = props;
  const profileImage = await getUserProfileImage(params.user);
  const nickname = await getUserNickname(params.user);
  const profile = await getUserProfile(params.user);
  const tags = profile.tags.map((tag: any) => {
    return tag.tag;
  });

  const slot = await getUserSlot(params.user);
  const avatar = await getUserAvatar(params.user);

  const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/three/${params.user}/${avatar?.id}`;

  return (
      <User
        IframeUrl={IframeUrl}
        profileImage={profileImage.image}
        nickname={nickname.nickname}
        profileDescription={profile.description}
        tags={tags}
        profile={profile}
        id={params.user}
        slot={slot}
      />
  );
}

const getUserAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select()
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

const getUserSlot = async (id: string) => {
  const { data, error } = await supabase
    .from("slots")
    .select()
    .eq("user_id", id);

  return data![0];
};
