import { CreateImageUrl2 } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import Avatar from "@/components/user/Avatar";
import ProfileCard from "@/components/user/ProfileCard";
import TabBar from "@/components/user/TabBar";

export default async function Page({ params }: { params: { id: string } }) {
  const nickname = await getUserNickname(params.id);
  const profileImage = await getUserProfileImage(params.id);
  const profile = await getUserProfile(params.id);
  const detail = await getUserDetail(params.id);

  const tags = profile.body.user.tags.map((tag: any) => {
    return tag.tag;
  });
  const descriptionObject = JSON.parse(detail.body.detail.description);
  const description = await CreateHtml(descriptionObject);

  return (
    <div className="w-full flex flex-col items-center font-sans grow">
      <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
        <Avatar IframeUrl={IframeUrl} />
        <ProfileCard
          profileImage={profileImage.body.auth.image}
          nickname={nickname.body.user.nickname}
          description={profile.body.user.description}
          tags={tags}
          profile={profile.body.user}
          id={params.id}
        />
      </div>
      <TabBar description={description}/>
    </div>
  );
}

const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs`;

const getUserNickname = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE + "/api/user/nickname", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return res.json();
};

const getUserProfileImage = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE + "/api/user/image", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return res.json();
};

const getUserProfile = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE + "/api/user/profile", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return res.json();
};

const getUserDetail = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE + "/api/user/detail", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return res.json();
};

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateImageUrl2(arr[i].insert.image).then(async (url) => {
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
