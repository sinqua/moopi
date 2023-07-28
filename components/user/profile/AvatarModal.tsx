"use client";
import Image from "next/image";
import cancelImg from "@/app/assets/images/cancel.svg";
import cancelGrayImg from "@/app/assets/images/cancel_gray.svg";
import infoIcon from "@/app/assets/images/info.svg";
import listIcon from "@/app/assets/images/list.svg";
import { useRouter } from "next/navigation";
import useDrag from "@/hooks/useDrag";
import { Suspense, useEffect, useState } from "react";
import ModalCanvas from "@/components/ModalCanvas";
import PortfolioItem from "../../portfolio/PortfolioItem";
import { formatDate } from "@/lib/string";

const SupabasePublicURL =
  "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";
interface AvatarModalProps {
  profile: any;
  nickname: any;
  tags: any;
  avatar: any;
  portfolios: any;
  modelUrl: any;
  animation: any;
}

export default function AvatarModal(props: AvatarModalProps) {
  const {
    profile,
    nickname,
    tags,
    avatar,
    portfolios,
    modelUrl,
    animation
  } = props;

  const router = useRouter();

  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  const [leftTabActive, setLeftTabActive] = useState(true);
  const [rightTabActive, setRightTabActive] = useState(false);

  // useEffect(() => {
  //   setMountedStatus(true);
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     setMountedStatus(false);
  //     document.body.style.overflow = "unset";
  //   };
  // }, []);

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
        <div className="relative grow basis-0 rounded-t-[10px] sm:overflow-hidden overflow-scroll">
          <div className="relative flex justify-center w-full min-h-full bg-white rounded-t-[10px]">
            <div className="sm:block flex flex-col max-w-[1312px] w-full sm:pt-[50px]">
              <ModalCanvas
                modelUrl={modelUrl}
                animation={animation}
              />

              <div className="flex sm:flex-row flex-col basis-0 justify-between h-full pointer-events-none">
                <div className="flex flex-col sm:w-[348px] w-full sm:space-y-[30px] space-y-0">
                  <p className="sm:relative absolute sm:top-0 top-[25px] sm:left-0 left-[20px] font-semibold sm:text-[30px] text-[20px]">{avatar.name}</p>
                  <div className="flex space-x-[20px] z-10 pointer-events-auto">
                    <div
                      className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                      onClick={() => setLeftTabActive(!leftTabActive)}
                    >
                      <Image
                        src={infoIcon}
                        className="w-[20px] h-[20px]"
                        alt=""
                      />
                    </div>
                    <div
                      className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                      onClick={() => setRightTabActive(!rightTabActive)}
                    >
                      <Image
                        src={listIcon}
                        className="w-[20px] h-[20px]"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className={`relative ${
                      leftTabActive ? "flex" : "sm:hidden flex"
                    } flex-col w-full md:h-[526px] h-auto p-[24px]  md:rounded-[10px] rounded-none bg-[#FFFFFF80] overflow-hidden sm:shadow-[0px_3px_10px_rgba(0,0,0,0.16)] shadow-none pointer-events-auto`}
                  >
                    <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
                      <Image
                        src={`${SupabasePublicURL}/profile-image/${profile.image}`}
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
                          <p>{formatDate(avatar.created_at)}</p>
                          <p>{avatar.created_at.substring(11,16)}</p>
                        </div>
                        <Image
                          className="absolute sm:block hidden top-0 right-0 h-[18px] w-[18px] !m-0 cursor-pointer"
                          width={18}
                          src={cancelGrayImg}
                          alt=""
                          onClick={() => setLeftTabActive(false)}
                        />
                      </div>
                    </div>
                    <div className="text-[14px] grow whitespace-pre-line leading-[25px] md:mb-0 mb-[40px] overflow-hidden">
                      {avatar.description}
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
                      <div className="relative h-[93px]">
                        <div className="flex justify-center items-center h-[47px] bg-[#333333] rounded-[10px] text-[14px] text-white cursor-pointer">
                          문의하기
                        </div>
                        <div className="absolute flex justify-center w-full bottom-[-10px]">
                          <div className="inline-flex justify-center items-end w-[330px] h-[71px] pb-[20px] bg-slot bg-repeat-round bg-cover text-[14px] text-center align-text-bottom">
                            <span>현재 2개의 슬롯이 남아있어요</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[348px] w-full flex items-end pb-[50px] justify-end pointer-events-auto">
                  <div
                    className={`relative ${
                      rightTabActive ? "flex" : "sm:hidden flex"
                    } flex-col w-full h-[488px] p-[24px]  md:rounded-[10px] rounded-none bg-[#FFFFFF80] overflow-hidden sm:shadow-[0px_3px_10px_rgba(0,0,0,0.16)] shadow-none`}
                  >
                    <div
                      className="relative flex flex-row h-[25px] space-x-[5px] mb-[30px] text-[18px]"
                      onClick={() => {
                        setRightTabActive(false);
                      }}
                    >
                      <p className="font-semibold">{nickname ?? ""}</p>
                      <p>님의 다른 작품</p>
                      <Image
                        className="absolute sm:block hidden top-0 right-0 h-[18px] w-[18px] !m-0 cursor-pointer"
                        width={18}
                        src={cancelGrayImg}
                        alt=""
                        onClick={() => {
                          setRightTabActive(false);
                        }}
                      />
                    </div>

                    <div className="flex flex-col grow">
                      {portfolios &&
                        portfolios.map((item: any, index: any) => {
                          return (
                            <PortfolioItem
                              key={index}
                              thumbnail={item.thumbnailUrl}
                              name={item.name}
                              tags={item.tags}
                              index={index}
                            />
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
