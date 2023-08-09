"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import { twMerge } from "tailwind-merge";

import clipImg from "@/app/assets/images/clip.svg";

import upImg from "@/app/assets/images/up.svg";
import downImg from "@/app/assets/images/down.svg";
import { useSession } from "next-auth/react";
import { decode } from "base64-arraybuffer";
import { v4 as uuidv4 } from "uuid";
import { supabase, supabaseAuth } from "@/lib/database";
import { UploadAvatar } from "@/lib/storage";
import { Modal } from "./modal";

import cameraBlack from "@/app/assets/images/camera-black.svg";
import cameraFill from "@/app/assets/images/camera-fill.svg";
import smileBlack from "@/app/assets/images/smile.svg";
import smileFill from "@/app/assets/images/smile-fill.svg";

interface InputProps {
  setModelUrl: any;
  animationUrl: any;
  setAnimationUrl: any;
  mostUsedTags: any;
  cameraActive: any;
  setCameraActive: any;
  resetCamera: any;
  avatarNameRef: any;
  avatarFile: any;
  setAvatarFile: any;
  avatarDescriptionRef: any;
  avatarStatus: any;
  setAvatarStatus: any;
  setAvatarAnimation: any;
  thumbnailImage: any;
  setThumbnailImage: any;
  setProgress: any;
}

export default function Input(props: InputProps) {
  const {
    setModelUrl,
    animationUrl,
    setAnimationUrl,
    mostUsedTags,
    cameraActive,
    setCameraActive,
    resetCamera,
    avatarNameRef,
    avatarFile,
    setAvatarFile,
    avatarDescriptionRef,
    avatarStatus,
    setAvatarStatus,
    setAvatarAnimation,
    thumbnailImage,
    setThumbnailImage,
    setProgress,
  } = props;

  const [done, setDone] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const [avatarTags, setAvatarTags] = useState<any>(null);

  const [thumbTabActive, setThumbTabActive] = useState(false);
  const [leftTabActive, setLeftTabActive] = useState(true);
  const [rightTabActive, setRightTabActive] = useState(true);

  const [display, setDisplay] = useState<string>("flex");
  const [borderColor, setBorderColor] = useState<string>(
    "border-[#CCCCCC80] focus:border-[#2778C780] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
  );
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const options = [
    { value: "공개", label: "공개" },
    { value: "비공개", label: "비공개" },
  ];

  const [animationOptions, setAnimationOptions] = useState<any>([
    { value: 4, label: "Idle" },
    { value: 1, label: "HipHopDancing" },
    { value: 2, label: "PutYourHandsUp" },
    { value: 3, label: "Thankful" },
  ]);
  const [selectedAnime, setSelectedAnime] = useState<any>(4);

  const avatarFileRef = useRef<any>(null);
  const avatarFileNameRef = useRef<any>(null);

  const loadAvatarFile = (e: any) => {
    setModelUrl(null);
    setProgress(false);
    const file = avatarFileRef.current.files[0];

    if (!file) return;

    setAvatarFile(avatarFileRef.current.files[0]);

    avatarFileNameRef.current.value = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setModelUrl(reader.result);
    };
  };

  const loadAnimation = (e: any) => {
    setAvatarAnimation(e);
    setAnimationUrl(e.label);
    setSelectedAnime(e.value);
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setThumbnailImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileInputChange;
    input.click();
  };

  const params = useSearchParams();

  const onSavePortfolio = async () => {
    if (!avatarNameRef.current.value || !avatarFile) {
      setBorderColor("border-red-500 shadow-[inset_0_0_0_1px_rgb(239,68,68)]");
      setIsEmpty(true);
      return;
    }
    setModal(true);

    setModal(true);

    /* Python 서버 파일 업로드 */
    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("name", avatarFile.name);
    if (session) formData.append("id", session?.user.id);

    console.log("data ", formData);

    try {
      const response = await fetch("https://server.offing.me", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.log("data ", formData);
        console.error("Failed to upload file2");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    /* Python 서버 파일 업로드 끝 */

    UploadAvatar(session?.user.id, avatarFile.name, avatarFile).then(
      async (data) => {
        const { data: avatarData, error: avatarError } = await supabase
          .from("avatars")
          .insert([
            {
              vrm: avatarFile.name,
              user_id: session?.user.id,
              is_profile: params.get("is_profile") === "true" ? true : false,
              name: avatarNameRef.current.value,
              description: avatarDescriptionRef.current.value,
              visible: true,
              animation: selectedAnime,
            },
          ])
          .select();

        if (avatarTags) {
          const { data: tagsData, error: tagsError } = await supabase
            .from("tags")
            .insert(
              avatarTags
                .map((tag: any) => {
                  return tag.value;
                })
                .map((tag: any) => {
                  return { tag: tag, avatar_id: avatarData![0].id };
                })
            );
        }
        if (typeof thumbnailImage === "string") {
          UploadBase64Image(session, thumbnailImage).then(async (uuid) => {
            const { data, error } = await supabase
              .from("avatars")
              .update({
                thumbnail: `${uuid}.png`,
              })
              .eq("id", avatarData![0].id);
          });
        }

        setDone(true);
      }
    );
  };

  return (
    <>
      <div
        className={`${
          cameraActive ? "hidden" : "flex"
        } relative sm:flex-row flex-col sm:justify-between max-w-[1372px] w-full h-full mb-[50px] md:px-0 sm:px-[30px] px-[20px] pointer-events-none`}
      >
        <div className="max-w-[360px] w-full h-full sm:mt-[50px] mt-[30px] space-y-[30px] pointer-events-auto">
          <p className="sm:text-[24px] text-[20px] font-semibold">
            포트폴리오 업로드
          </p>
          <div className="flex flex-col sm:space-y-[30px] space-y-0">
            <div className="flex flex-row space-x-[18px]">
              <div
                className={twMerge(
                  "sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer",
                  `${leftTabActive ? "bg-[#333333]" : "bg-white"}`
                )}
                onClick={() => {
                  if (display === "flex") setDisplay("hidden");
                  else setDisplay("flex");
                  setThumbTabActive(false);
                  setLeftTabActive(!leftTabActive);
                }}
              >
                <Image
                  src={leftTabActive ? smileFill : smileBlack}
                  className="w-[18px] h-[18px]"
                  alt=""
                />
              </div>
              <div
                className={twMerge(
                  "sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer",
                  `${thumbTabActive ? "bg-[#333333]" : "bg-white"}`
                )}
                onClick={() => {
                  if (display === "flex") setDisplay("hidden");
                  setLeftTabActive(false);
                  setThumbTabActive(!thumbTabActive);
                }}
              >
                <Image
                  src={thumbTabActive ? cameraFill : cameraBlack}
                  className="w-[18px] h-[18px]"
                  alt=""
                />
              </div>
            </div>

            {thumbTabActive && (
              <div className="flex flex-col space-y-[30px] text-[14px] w-[250px]">
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">아바타 썸네일</p>
                  <Image src={thumbnailImage} alt="" height={400} width={250} />
                  <div className="flex sm:flex-col flex-row sm:space-x-0 space-x-[16px] sm:space-y-[20px] space-y-0">
                    <div
                      className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#333333] text-[#FFFFFF] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                      onClick={() => {
                        resetCamera();
                        setCameraActive(true);
                      }}
                    >
                      촬영하기
                    </div>
                    <div
                      className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#FFFFFF] text-[#333333] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                      onClick={handleButtonClick}
                    >
                      불러오기
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className={twMerge(
                display,
                "flex-col space-y-[30px] text-[14px]"
              )}
            >
              <div className="flex flex-col space-y-[20px]">
                <p className="font-semibold">아바타 이름</p>
                <div className="relative w-full h-[47px]">
                  <input
                    type="text"
                    ref={avatarNameRef}
                    className={twMerge(
                      "w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid px-[20px] py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none ",
                      borderColor
                    )}
                    placeholder="아바타 이름을 입력해주세요"
                  />
                  <div className="text-right h-full pt-1 pr-1 text-red-500">
                    {isEmpty ? "아바타 이름이 필요합니다" : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-[20px]">
                <p className="font-semibold">아바타 파일</p>
                <div className="relative w-full h-[47px]">
                  <input
                    type="text"
                    ref={avatarFileNameRef}
                    disabled
                    className={twMerge(
                      "w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid px-[20px] py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3]  focus:text-neutral-700 focus:outline-none",
                      borderColor
                    )}
                    placeholder="아바타 파일을 등록해주세요"
                  />
                  <form>
                    <label htmlFor="avatarFile">
                      <div className="absolute flex items-center h-full top-0 right-[20px]">
                        <Image
                          src={clipImg}
                          className="w-[18px] h-[18px] cursor-pointer"
                          alt=""
                        />
                      </div>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id="avatarFile"
                      onChange={(e: any) => loadAvatarFile(e)}
                      ref={avatarFileRef}
                      placeholder="아바타 파일을 등록해주세요"
                    />
                  </form>
                  <div className="text-right h-full pt-1 pr-1 text-red-500">
                    {isEmpty ? "아바타 파일이 필요합니다" : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-[20px]">
                <p className="font-semibold">아바타 설명</p>
                <textarea
                  ref={avatarDescriptionRef}
                  className="w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                  placeholder="아바타 설명을 입력해주세요"
                />
              </div>
              <div className="flex flex-col space-y-[20px]">
                <p className="font-semibold">태그</p>
                <CreatableSelect
                  isMulti
                  options={mostUsedTags}
                  instanceId={""}
                  onChange={(e: any) => {
                    setAvatarTags(e);
                  }}
                  className="inline-table w-full items-center h-[47px] ring-0"
                  placeholder={"태그를 입력해주세요"}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#2778C7",
                    },
                  })}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "100%",
                      width: "100%",
                      backgroundColor: "#FFFFFF80",
                      borderRadius: "10px",
                      fontSize: "14px",
                      paddingLeft: "12px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end sm:w-[242px] w-full h-full sm:mt-[120px] mt-[30px] sm:space-y-[30px] space-y-0 pointer-events-auto">
          <div
            className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
            onClick={() => setRightTabActive(!rightTabActive)}
          >
            <Image
              src={rightTabActive ? upImg : downImg}
              className="w-[20px] h-[10px]"
              alt=""
            />
          </div>
          {rightTabActive && (
            <div className="flex flex-col w-full sm:space-y-[50px] space-y-[120px] text-[14px]">
              <div className="flex flex-col w-[242px] space-y-[30px]">
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">업로드 날짜</p>
                  <p>{moment().format("YYYY.MM.DD")}</p>
                </div>
                <div className="flex flex-col w-[125px] space-y-[20px]">
                  <p className="font-semibold">상태 설정</p>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={avatarStatus}
                    isSearchable={false}
                    onChange={(e: any) => setAvatarStatus(e)}
                    // name="color"
                    options={options}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "#2778C7",
                      },
                    })}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#FFFFFF80",
                        borderRadius: "10px",
                        paddingLeft: "12px",
                      }),
                    }}
                  />
                </div>
                <div className="flex flex-col w-full space-y-[20px]">
                  <p className="font-semibold">애니메이션</p>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    value={animationOptions.filter((option: any) => {
                      return option.label === animationUrl;
                    })}
                    options={animationOptions}
                    onChange={(e: any) => loadAnimation(e)}
                    isSearchable={false}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "#2778C7",
                      },
                    })}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#FFFFFF80",
                        borderRadius: "10px",
                        paddingLeft: "12px",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="flex sm:flex-col flex-row sm:space-x-0 space-x-[16px] sm:space-y-[20px] space-y-0">
                <div
                  className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#333333] text-[#FFFFFF] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                  onClick={onSavePortfolio}
                >
                  저장하기
                </div>
                <div className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#FFFFFF] text-[#333333] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer">
                  취소
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal modal={modal} done={done} />
    </>
  );
}

const UploadBase64Image = async (session: any, url: string) => {
  const base64Data = url.split(",")[1];

  const uuid = uuidv4();

  const { data, error } = await supabase.storage
    .from("thumbnail")
    .upload(`${session?.user.id}/${uuid}.png`, decode(base64Data), {
      contentType: "image/png",
    });

  return uuid;
};
