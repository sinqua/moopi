"use client";
import { useState, useLayoutEffect } from "react";

import { CreateImageUrl2 } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

import parse from "html-react-parser";

import ClipLoader from "react-spinners/ClipLoader";

import "react-quill/dist/quill.snow.css";
import useDrag from "@/app/hooks/dragHook";
import Avatar from "@/components/user/Avatar";
import ProfileCard, { ProfileCardProps } from "@/components/user/ProfileCard";

const getUserDetail = async () => {
  await fetch("/api/user/detail", {
    method: "POST",
    body: JSON.stringify({
      user_id: params.id,
    }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      const wordCount = countOccurrences(
        data.body.detail.description,
        "image"
      );
      setDescriptionImgCount(wordCount);

      const descriptionObject = JSON.parse(data.body.detail.description);

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
              onload: setLoadedCount((count) => count + 1),
            };
          });
        }
      }

      var cfg = {};
      var converter = new QuillDeltaToHtmlConverter(arr, cfg);
      var html = converter.convert();

      setDescription(html);
    })
    .catch((err) => {
      console.log("user does not have description");
    });
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

  const property: ProfileCardProps = {
    profileImage : profileImage.body.auth.image,
    nickname : nickname.body.user.nickname,
    description : profile.body.user.description,
    tags : tags,
    profile : profile.body.user,
    id : params.id,
  };


  const [page, setPage] = useState("설명");


  const [description, setDescription] = useState<any>(null);


  // Prevent the default right-click behavior
  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  const [descriptionImgCount, setDescriptionImgCount] = useState(-1);
  const [loadedCount, setLoadedCount] = useState(0);

  // image 개수 찾기
  const countOccurrences = (str: any, word: any) => {
    const regex = new RegExp(`\\"${word}\\"`, "gi");
    const matches = str.match(regex);

    return matches ? matches.length : 0;
  };



  useLayoutEffect(() => {
    getUserDetail();
  }, []);

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

        <div className="md:mt-0 mt-[40px] flex justify-center w-full md:w-[1312px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
          <div className="w-full h-full flex justify-center border-solid border-[1px] border-[#E7E7E7]">
            <div
              className={page === "설명" ? selectedBtn : normalBtn}
              onClick={() => setPage("설명")}
            >
              설명
            </div>
            <div
              className={page === "포트폴리오" ? selectedBtn : normalBtn}
              onClick={() => setPage("포트폴리오")}
            >
              포트폴리오
            </div>
            <div
              className={page === "가격정보" ? selectedBtn : normalBtn}
              onClick={() => setPage("가격정보")}
            >
              가격정보
            </div>
            <div
              className={page === "리뷰" ? selectedBtn : normalBtn}
              onClick={() => setPage("리뷰")}
            >
              리뷰
            </div>
          </div>
        </div>
        <div className="ql-editor relative w-full md:w-[1312px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
          <div className={page !== "설명" ? "hidden" : ""}>
            {description && parse(description)}
            {descriptionImgCount !== -1 &&
              descriptionImgCount !== loadedCount &&
              descriptionImgCount !== 0 && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white">
                  <ClipLoader size={100} color="#2778C7" />
                </div>
              )}
          </div>
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

const normalBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
const selectedBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";

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
