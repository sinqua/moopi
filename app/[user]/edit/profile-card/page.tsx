// "use client";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";
import ProfileCard from "@/components/edit//profileCard/profileCard";

// const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default async function Page({ params }: { params: { user: string } }) {
  const profileImage = await getUserProfileImage(params.user);
  const profile = await getUserProfile(params.user);
  const tags = profile.tags.map((tag: any) => {
    return { value: tag.tag, label: tag.tag};
  });

  return (
    <ProfileCard profileImage={profileImage.image} profile={profile} tags={tags}/>
  );
}

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