import { CreateImageUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import Avatar from "@/components/user/Avatar";
import ProfileCard from "@/components/user/ProfileCard";
import TabBar from "@/components/user/TabBar";
import { supabase, supabaseAuth } from "@/lib/database";
import Description from "@/components/user/Description";
import User from "@/components/user/user";
import Portfolio from "@/components/user/Portfolio";
import Price from "@/components/user/Price";

export default async function Page({
  params,
}: {
  params: { user: string; content: string };
}) {
  const nickname = await getUserNickname(params.user);
  const profileImage = await getUserProfileImage(params.user);
  const profile = await getUserProfile(params.user);
  const detail = await getUserDetail(params.user);
  const slot = await getUserSlot(params.user);

  const tags = profile.tags.map((tag: any) => {
    return tag.tag;
  });
  const descriptionObject = JSON.parse(detail.description);
  const description = await CreateHtml(descriptionObject);
  const priceInfoObject = JSON.parse(detail.price_info);
  const priceInfo = await CreateHtml(priceInfoObject);

  const avatar = await getUserAvatar(params.user);
  const portfolio = await getPortfoilo(params.user); 

  console.log("nickname", nickname);
  console.log("tags", tags);
  console.log("detail", detail);
  console.log("descriptionObject", descriptionObject);
  console.log("description", description);

  const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/three/${params.user}/${avatar.id}`;

  return (
    <>
      <User
        IframeUrl={IframeUrl}
        profileImage={profileImage.image}
        nickname={nickname.nickname}
        profileDescription={profile.description}
        tags={tags}
        profile={profile}
        id={params.user}
        description={description}
        priceInfo={priceInfo}
        slot={slot}
      />
      <TabBar />

      {params.content === "description" && (
        <Description description={description} />
      )}
      {params.content === "portfolio" && <Portfolio user={params.user} portfolio={portfolio} />}
      {params.content === "price" && <Price priceInfo={priceInfo} />}
    </>
  );
}

const getPortfoilo = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select()
    .eq("user_id", id);

  return data;
}

const getUserAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("avatars")
    .select()
    .eq("user_id", id)
    .eq("is_profile", true);

  return data![0];
}

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

const getUserSlot = async (id: string) => {
  const { data, error } = await supabase
    .from("slots")
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
