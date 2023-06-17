import { CreateImageUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import Avatar from "@/components/user/Avatar";
import ProfileCard from "@/components/user/ProfileCard";
import TabBar from "@/components/user/TabBar";
import { supabase, supabaseAuth } from "@/lib/database";

export default async function Page({ params }: { params: { id: string } }) {
  const nickname = await getUserNickname(params.id);
  const profileImage = await getUserProfileImage(params.id);
  const profile = await getUserProfile(params.id);
  const detail = await getUserDetail(params.id);

  const tags = profile.tags.map((tag: any) => {
    return tag.tag;
  });
  const descriptionObject = JSON.parse(detail.description);
  const description = await CreateHtml(descriptionObject);

  return (
    <div className="w-full flex flex-col items-center font-sans grow">
      <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
        <Avatar IframeUrl={IframeUrl} />
        <ProfileCard
          profileImage={profileImage.image}
          nickname={nickname.nickname}
          description={profile.description}
          tags={tags}
          profile={profile}
          id={params.id}
        />
      </div>
      <TabBar description={description} />
    </div>
  );
}

const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs`;

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

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateImageUrl(arr[i].insert.image).then(async (url) => {
        arr[i].insert.image = url!.signedUrl;
        arr[i].attributes = {
          display: "inline-block",
        };
      });
    }
  }

  var cfg = {};
  var converter = new QuillDeltaToHtmlConverter(arr, cfg);
  var html = converter.convert();
  return html;
};
