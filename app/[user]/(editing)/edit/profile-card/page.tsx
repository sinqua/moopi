import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";
import ProfileCard from "@/components/edit//profileCard/profileCard";

export default async function Page({ params }: { params: { user: string } }) {
  const profileImage = await getUserProfileImage(params.user);
  const profile = await getUserProfile(params.user);
  const avatar = await getMainAvatar(params.user);
  const tags = profile.tags.map((tag: any) => {
    return { value: tag.tag, label: tag.tag };
  });

  const mostUsedTags = await getMostUsedTags();

  return (
    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
      <ProfileCard
        avatar={avatar}
        profileImage={profileImage.image}
        profile={profile}
        tags={tags}
        mostUsedTags={mostUsedTags}
      />
    </div>
  );
}

const getMainAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select(`*, animations(*)`)
    .eq("user_id", id)
    .eq("is_profile", true);

  return data;
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

const getMostUsedTags = async () => {
  const { data, error } = await supabase
    .from("tags")
    .select("*", { count: "exact" });

  const countByGroupTag: any = {};
  data!.forEach((row) => {
    const tag = row.tag;
    if (countByGroupTag[tag]) {
      countByGroupTag[tag]++;
    } else {
      countByGroupTag[tag] = 1;
    }
  });
  const countArray = Object.entries(countByGroupTag);
  countArray.sort((a: any, b: any) => b[1] - a[1]);

  const slicedCountByGroupTag = Object.fromEntries(countArray.slice(0, 5));

  const options = Object.keys(slicedCountByGroupTag).map((tag: any) => {
    return { value: tag, label: tag };
  });

  return options;
};
