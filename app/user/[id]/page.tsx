import { CreateImageUrl2 } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import parse from "html-react-parser";

import ClipLoader from "react-spinners/ClipLoader";

import "react-quill/dist/quill.snow.css";
import Avatar from "@/components/user/Avatar";
import ProfileCard, { ProfileCardProps } from "@/components/user/ProfileCard";
import TabBar from "@/components/user/TabBar";

const getUserDetail = async (id: string) => {
  const res = await fetch("/api/user/detail", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  })
  return res.json();
};

const countOccurrences = (str: any, word: any) => {
  const regex = new RegExp(`\\"${word}\\"`, "gi");
  const matches = str.match(regex);

  return matches ? matches.length : 0;
};

export default async function Page({ params }: { params: { id: string } }) {
  const nickname = await getUserNickname(params.id);
  console.log(nickname.body.user.nickname);
  const profileImage = await getUserProfileImage(params.id);
  console.log(profileImage.body.auth.image);
  const profile = await getUserProfile(params.id);
  console.log(profile.body.user);
  const tags = profile.body.user.tags.map((tag: any) => {
    return tag.tag;
  });
  const detail = await getUserDetail(params.id);

  const descriptionImgCount = countOccurrences(
    detail.body.detail.description,
    "image"
  );

  const descriptionObject = JSON.parse(detail.body.detail.description);

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

  const description = html;


  const property: ProfileCardProps = {
    profileImage : profileImage.body.auth.image,
    nickname : nickname.body.user.nickname,
    description : profile.body.user.description,
    tags : tags,
    profile : profile.body.user,
    id : params.id,
  };

  // Prevent the default right-click behavior
  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };


  return (
    <>
      <div
        className="w-full flex flex-col items-center font-sans grow"
        onContextMenu={handleContextMenu}
      >
        <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
          <Avatar IframeUrl={IframeUrl} />
          <ProfileCard {...property} />
        </div>
        <TabBar />
        
        <div className="ql-editor relative w-full md:w-[1312px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
          {/* <div className={page !== "설명" ? "hidden" : ""}>
            {description && parse(description)}
          </div> */}
          {/* {page === "설명" && (
            <div>
              {description && parse(description)}
              {descriptionImgCount !== -1 &&
                descriptionImgCount !== loadedCount &&
                descriptionImgCount !== 0 && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white">
                    <ClipLoader size={100} color="#2778C7" />
                  </div>
                )}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}


const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs`;


const getUserNickname = async (id: string) => {
  const res = await fetch("/api/user/nickname", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  });
  return res.json();
};

const getUserProfileImage = async (id: string) => {
  const res = await fetch("/api/user/image", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  })
  return res.json();
};

const getUserProfile = async (id: string) => {
  const res = await fetch("/api/user/profile", {
    method: "POST",
    body: JSON.stringify({
      user_id: id,
    }),
  })
  return res.json();
};
