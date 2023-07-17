"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import TagDrag from "@/components/TagDrag";
import { formatDate } from "@/lib/string";
import { CreateImageUrl } from "@/lib/storage";

interface AvatarProps {
  session: any;
  profile: any;
  avatar: any;
  tags: Array<{ value: string; label: string }>;
}

const Avatar = (props: AvatarProps) => {
  const { session, profile, avatar, tags } = props;
  const [avatarImg, setAvatarImg] = useState<string>();

  useEffect(() => {
    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";
    const filePath = `${avatar.user_id}/${avatar.thumbnail}`;
    setAvatarImg(`${SupabasePublicURL}/thumbnail/${filePath}`);
  }, []);

  return (
    <div>
      <p className="mb-[15px] text-[20px] font-semibold">대표 아바타</p>
      <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
        프로필 페이지에서 보여줄 아바타 파일을 업로드 합니다.
        <br />
        50mb 이하의 VRM 파일을 사용해주세요.
      </p>

      {avatar ? (
        <div className="w-full p-[30px] flex flex-col rounded-[10px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
          <div className="flex sm:flex-row flex-col sm:space-x-[30px] sm:space-y-0 space-y-[30px] sm:items-start items-center">
            <Image
              className="w-[316px] h-[512px] rounded-[10px]"
              src={avatarImg ? avatarImg : emptyImg}
              alt=""
              width={316}
              height={512}
            />
            <div className="inline-flex flex-col grow w-full md:h-[512px] h-auto overflow-hidden">
              <div className="w-full h-full md:space-y-[50px] space-y-[30px]">
                <div className="flex flex-col space-y-[15px] mb-[50px]">
                  <p className="text-[20px] font-semibold">{avatar.name}</p>
                  <div className="flex flex-wrap">
                    <div className="flex space-x-[8px] md:mr-[150px] mr-[30px]">
                      <p className="text-[#7B7B7B]">업로드</p>
                      <p className="font-semibold ">
                        {formatDate(avatar.created_at)}
                      </p>
                    </div>
                    <div className="flex space-x-[8px] md:mr-[150px] mr-[30px]">
                      <p className="text-[#7B7B7B]">상태</p>
                      <p className="font-semibold ">
                        {avatar.visible ? "공개" : "비공개"}
                      </p>
                    </div>
                    <div className="flex space-x-[8px] md:mr-[150px] mr-[30px]">
                      <p className="text-[#7B7B7B]">애니메이션</p>
                      <p className="font-semibold ">{avatar.animations.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
                  <div className="flex flex-col w-[300px] space-y-[15px]">
                    <p className="text-[20px] font-semibold">아바타</p>
                    <p className="whitespace-nowrap">{avatar.vrm}</p>
                  </div>
                  <div className="flex flex-col w-[300px] space-y-[15px]">
                    <p className="text-[20px] font-semibold">썸네일</p>
                    <p className="whitespace-nowrap">{avatar.thumbnail}</p>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
                  <div className="flex flex-col w-[300px] space-y-[15px]">
                    <p className="text-[20px] font-semibold">아바타 설명</p>
                    <p className="truncate whitespace-nowrap leading-[25px]">
                      {avatar.description}
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap md:w-[400px] w-full space-y-[15px]">
                    <p className="text-[20px] font-semibold">태그</p>
                    <TagDrag avatarTags={tags} />
                  </div>
                </div>
              </div>
              <div className="md:flex justify-end mt-6">
                <div
                  className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
                  onClick={() => console.log("edit main avatar")}
                >
                  편집하기
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
          onClick={() => console.log("upload avatar")}
        >
          아바타 업로드
        </div>
      )}
    </div>
  );
};

export default Avatar;
