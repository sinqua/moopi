import { supabase, supabaseAuth } from "@/lib/database";
import ProfileCard from "@/components/edit//profileCard/profileCard";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const profileImage = await getUserProfileImage(params.user);
  const links = await getLinks(params.user);
  const profile = await getProfile(params.user);
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
        links={links}
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
    .eq("is_profile", true)
    .limit(1)
    .single();

  return data;
};

const getLinks = async (id: string) => {
  const { data, error } = await supabase
    .from("links")
    .select(`*`)
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Links not found");
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

const getUserProfileImage = async (id: string) => {
  const SupabasePublicURL = "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public"

  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`image`)
    .eq("user_id", id);

  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  if (profileData![0].image) {
    return { image: `${SupabasePublicURL}/profile-image/${profileData![0].image}`}
  } else {
    return authData![0];
  }
};

const getMostUsedTags = async () => {
  const { data, error } = await supabase
    .from("tags")
    .select("*", { count: "exact" });

  const countByGroupTag: any = {};
  data!.forEach((row) => {
    const tag = row.tag!;
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
