"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import moment from "moment";

import clipImg from "@/app/assets/images/clip.svg";
import cameraImg from "@/app/assets/images/camera.svg";
import cameraFillImg from "@/app/assets/images/camera_fill.svg";
import upImg from "@/app/assets/images/up.svg";
import downImg from "@/app/assets/images/down.svg";
import playImg from "@/app/assets/images/play.svg";

import cancelBlackImg from "@/app/assets/images/cancel_black.svg";
import { placeholderCSS } from "react-select/dist/declarations/src/components/Placeholder";

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
  avatarTags: any;
  setAvatarTags: any;
  avatarStatus: any;
  setAvatarStatus: any;
  setAvatarAnimation: any;
  onSavePortfolio: any;
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
    avatarTags,
    setAvatarTags,
    avatarStatus,
    setAvatarStatus,
    setAvatarAnimation,
    onSavePortfolio,
  } = props;

  const [leftTabActive, setLeftTabActive] = useState(true);
  const [rightTabActive, setRightTabActive] = useState(true);

  const options = [
    { value: "공개", label: "공개" },
    { value: "비공개", label: "비공개" },
  ];

  const [animationOptions, setAnimationOptions] = useState<any>([
    { value: "Idle", label: "Idle" },
    { value: "HipHopDancing", label: "HipHopDancing" },
    { value: "PutYourHandsUp", label: "PutYourHandsUp" },
    { value: "Thankful", label: "Thankful" },
  ]);

  const avatarFileRef = useRef<any>(null);
  const avatarFileNameRef = useRef<any>(null);

  const loadAvatarFile = (e: any) => {
    setModelUrl(null);
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
    setAnimationUrl(e.value);
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
            <div
              className="sm:flex hidden justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
              onClick={() => setLeftTabActive(!leftTabActive)}
            >
              <Image
                src={leftTabActive ? upImg : downImg}
                className="w-[18px] h-[9px]"
                alt=""
              />
            </div>
            {leftTabActive && (
              <div className="flex flex-col space-y-[30px] text-[14px]">
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">아바타 이름</p>
                  <div className="relative w-full h-[47px]">
                    <input
                      type="text"
                      ref={avatarNameRef}
                      className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                      placeholder="아바타 이름을 입력해주세요."
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">아바타 파일</p>
                  <div className="relative w-full h-[47px]">
                    <input
                      type="text"
                      ref={avatarFileNameRef}
                      disabled
                      className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                      placeholder="아바타 파일을 등록해주세요."
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
                      />
                    </form>
                  </div>
                </div>
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">썸네일</p>
                  <div className="relative w-full h-[47px]">
                    <input
                      type="text"
                      className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                      placeholder="썸네일을 등록해주세요."
                    />
                    <div className="absolute flex items-center h-full top-0 right-[20px] space-x-[20px]">
                      <Image
                        src={cameraImg}
                        className="w-[18px] h-[18px] cursor-pointer"
                        alt=""
                        onClick={() => {
                          setCameraActive(true);
                          resetCamera();
                        }}
                      />
                      <Image
                        src={clipImg}
                        className="w-[18px] h-[18px] cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-[20px]">
                  <p className="font-semibold">아바타 설명</p>
                  <textarea
                    ref={avatarDescriptionRef}
                    className="w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                    placeholder="아바타 설명을 입력해주세요."
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
                    className="flex w-full items-center h-[47px] ring-0"
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
            )}
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
                    value={animationOptions.filter(function (option: any) {
                      return option.value === animationUrl;
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
    </>
  );
}
