"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";
import cancelImg from "@/app/assets/images/cancel.svg";
import cancelGrayImg from "@/app/assets/images/cancel_gray.svg";
import { useRouter } from "next/navigation";
import useDrag from "@/app/hooks/dragHook";
import { useEffect, useState } from "react";
import ModalCanvas from "@/components/ModalCanvas";

interface AvatarModalProps {
  userId: any;
  avatarId: any;
  profileImage: any;
  nickname: any;
  tags: any;
  avatarInfo: any;
  id: any;
  portfolios: any;
  modelUrl: any;
  animationUrl: any;
}

export default function AvatarModal(props: AvatarModalProps) {
  const {
    userId,
    avatarId,
    profileImage,
    nickname,
    tags,
    avatarInfo,
    id,
    portfolios,
    modelUrl,
    animationUrl,
  } = props;
  const { data: session, status } = useSession();

  const router = useRouter();

  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  const [leftTabActive, setLeftTabActive] = useState(true);
  const [rightTabActive, setRightTabActive] = useState(true);

  useEffect(() => {
    setMountedStatus(true);

    console.log("portfolios", portfolios)
  }, []);

  return (
    <div className="absolute w-full h-full bg-[#00000050] top-0 left-0 !m-0  z-10 text-[14px]">
      <div className="sticky top-0 flex flex-col w-full h-screen">
        <div className="relative w-full h-[80px]" onClick={() => router.back()}>
          <Image
            className="absolute bottom-[20px] right-[20px] w-[20px] h-[20px] cursor-pointer"
            src={cancelImg}
            alt=""
          />
        </div>
        <div className="relative flex justify-center w-full grow bg-white rounded-t-[10px] overflow-hidden">
          <div className="max-w-[1312px] w-full h-full pt-[50px]">
            <ModalCanvas
              userId={userId}
              avatarId={avatarId}
              modelUrl={modelUrl}
              animationUrl={animationUrl}
            />

            <div className="relative flex justify-between h-full pointer-events-none">
              <div className="flex flex-col w-[348px] space-y-[30px]">
                <p className="font-semibold text-[30px]">{avatarInfo.name}</p>
                <div className="flex space-x-[20px] pointer-events-auto">
                  <div
                    className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                    onClick={() => setLeftTabActive(!leftTabActive)}
                  >
                    {/* <Image
                    src={leftTabActive ? upImg : downImg}
                    className="w-[18px] h-[9px]"
                    alt=""
                  /> */}
                  </div>
                  <div className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer">
                    {/* <Image
                    src={leftTabActive ? upImg : downImg}
                    className="w-[18px] h-[9px]"
                    alt=""
                  /> */}
                  </div>
                </div>
                <div
                  className={`relative ${
                    leftTabActive ? "flex" : "hidden"
                  } flex-col w-full md:h-[526px] h-auto p-[24px]  md:rounded-[10px] rounded-none bg-[#FFFFFF80] overflow-hidden shadow-[0px_3px_10px_rgba(0,0,0,0.16)] pointer-events-auto`}
                >
                  <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
                    <Image
                      src={profileImage}
                      width={100}
                      height={100}
                      className="h-[100px] w-[100px] rounded-full border-none"
                      alt=""
                      loading="eager"
                      priority={true}
                    />
                    <div className="relative flex flex-col justify-center space-y-[7px] grow">
                      <p className="h-[30px] font-semibold text-[18px]">
                        {nickname ?? ""}
                      </p>
                      <div className="flex space-x-[10px]">
                        <p>2023.01.01</p>
                        <p>14:21</p>
                      </div>
                      <Image
                        className="absolute top-0 right-0 h-[18px] w-[18px] !m-0 cursor-pointer"
                        width={18}
                        src={cancelGrayImg}
                        alt=""
                        onClick={() => setLeftTabActive(false)}
                      />
                    </div>
                  </div>
                  <div className="text-[14px] grow whitespace-pre-line leading-[25px] md:mb-0 mb-[40px] overflow-hidden">
                    {avatarInfo.description}
                  </div>
                  <div className="text-[14px] space-y-[20px]">
                    <div
                      className="flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
                      {...dragEvents}
                      ref={dragRef}
                    >
                      {tags.map((tag: any, index: any) => {
                        return (
                          <div
                            className="inline-flex h-[31px] px-[18px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing items-center"
                            key={tag}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                    {session?.user.id === id ? (
                      <div className="flex w-full h-[47px]">
                        <div
                          className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] bg-[#333333] text-white cursor-pointer"
                          // onClick={() =>
                          //   router.push(`/${session?.user.id}/upload`)
                          // }
                        >
                          수정하기
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-[93px]">
                        <div className="flex justify-center items-center h-[47px] bg-[#333333] rounded-[10px] text-[14px] text-white cursor-pointer">
                          문의하기
                        </div>
                        <div className="absolute flex justify-center w-full bottom-[-10px]">
                          <div className="inline-flex justify-center items-end w-[330px] h-[71px] pb-[20px] bg-slot bg-no-repeat bg-cover text-[14px] text-center align-text-bottom">
                            <span>현재 2개의 슬롯이 남아있어요</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[348px] flex items-end pb-[50px] justify-end">
                <div
                  className={`relative ${
                    rightTabActive ? "flex" : "hidden"
                  } flex-col w-full h-[488px] p-[24px]  md:rounded-[10px] rounded-none bg-[#FFFFFF80] overflow-hidden shadow-[0px_3px_10px_rgba(0,0,0,0.16)]`}
                >
                  <div className="relative flex flex-row h-[25px] space-x-[5px] mb-[30px] text-[18px]">
                    <p className="font-semibold">{nickname ?? ""}</p>
                    <p>님의 다른 작품</p>
                    <Image
                      className="absolute top-0 right-0 h-[18px] w-[18px] !m-0 cursor-pointer"
                      width={18}
                      src={cancelGrayImg}
                      alt=""
                      onClick={() => setRightTabActive(false)}
                    />
                  </div>
                  <div className="flex flex-col grow">


                  </div>
                  <div className="text-[14px] space-y-[20px]">
                    <div
                      className="flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
                      {...dragEvents}
                      ref={dragRef}
                    >
                      {tags.map((tag: any, index: any) => {
                        return (
                          <div
                            className="inline-flex h-[31px] px-[18px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing items-center"
                            key={tag}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
