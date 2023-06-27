"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Ring, useGLTF } from "@react-three/drei";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import { Select, TextInput, Textarea } from "flowbite-react";

import cancelImg from "@/app/assets/images/cancel.svg";
import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";
import clipImg from "@/app/assets/images/clip.svg";
import cameraImg from "@/app/assets/images/camera.svg";
import upImg from "@/app/assets/images/up.svg";
import downImg from "@/app/assets/images/down.svg";

import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import descriptionImg from "@/app/assets/images/description.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";
import powerImg from "@/app/assets/images/power.svg";

import { ModelProps } from "./Model";
import { CreateModelUrl } from "@/lib/storage";
import BounceLoader from "react-spinners/BounceLoader";
import { off } from "process";

const ModelComponent = lazy(() => import("./Model"));
const defaultModel = {
  modelUrl: "s2xyoon.vrm",
  animationUrl: "HipHopDancing.fbx",
};
interface FullCanvasProps {
  userId?: string;
  filename?: string;
}

const FullCanvas = (props: FullCanvasProps) => {
  const { userId, filename } = props;
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [fullScreen, setFullScreen] = useState(false);
  const [helpViewer, setHelpViewer] = useState(false);
  const [progress, setProgress] = useState(false);

  const [leftTabActive, setLeftTabActive] = useState(true);
  const [rightTabActive, setRightTabActive] = useState(true);

  const cameraControlsRef = useRef<CameraControls>(null);

  const avatarNameRef = useRef<any>(null);

  useEffect(() => {
    if (userId && filename) {
      CreateModelUrl(userId, filename).then((url) => {
        setModelInfo({ modelUrl: url!.signedUrl, setProgress });
      });
    }

    setModelInfo({ ...defaultModel, setProgress });
  }, []);

  const isMobile = () => "ontouchstart" in document.documentElement;

  // Prevent the default right-click behavior
  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);
    cameraControlsRef.current!.polarAngle = 1.35;
  };

  const postMessage = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  const options = ["공개", "비공개"];

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden"
        onContextMenu={handleContextMenu}
      >
        {helpViewer && HelpViewer(setHelpViewer, isMobile)}
        <Canvas
          camera={{ position: [0, 0, 1.1] }}
          style={{ backgroundColor: "#FAF9F6" }}
          shadows
        >
          <CameraControls
            ref={cameraControlsRef}
            maxDistance={5}
            polarAngle={1.35}
          />
          <directionalLight position={[0, 1, 0]} castShadow />
          {modelInfo && <ModelComponent {...modelInfo!} />}
        </Canvas>

        <div className="absolute flex justify-center top-0 w-full h-full pointer-events-none z-[999]">
          <div className="relative flex justify-between  max-w-[1312px] w-full h-full">
            {!progress && (
              <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                <BounceLoader color="#2778C7" />
              </div>
            )}
            <div className="w-[360px] h-full mt-[50px] space-y-[30px] pointer-events-auto">
              <p className="text-[24px] font-semibold">포트폴리오 업로드</p>
              <div className="flex flex-col space-y-[30px]">
                <div
                  className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
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
                      <TextInput
                        type="text"
                        ref={avatarNameRef}
                        color={"#2778C780"}
                        theme={{
                          field: {
                            input: {
                              base: "grow w-full h-[47px] !px-[20px] bg-[#FFFFFF80] border-[#CCCCCC80] !outline-none !focus:outline-none !shadow-none text-sm",
                            },
                          },
                        }}
                        className="grow h-full bg-transparent outline-none text-sm"
                        placeholder="아바타 이름을 입력해주세요."
                      />
                    </div>
                    <div className="flex flex-col space-y-[20px]">
                      <p className="font-semibold">아바타 파일</p>
                      <div className="relative">
                        <TextInput
                          type="text"
                          color={"#2778C780"}
                          theme={{
                            field: {
                              input: {
                                base: "grow w-full h-[47px] !px-[20px] bg-[#FFFFFF80] border-[#CCCCCC80] outline-none text-sm",
                              },
                            },
                          }}
                          className="grow h-full bg-transparent outline-none text-sm"
                          placeholder="아바타 파일을 입력해주세요."
                        />
                        <div className="absolute flex items-center h-full top-0 right-[20px]">
                          <Image
                            src={clipImg}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-[20px]">
                      <p className="font-semibold">썸네일</p>
                      {/* <div className="flex items-center w-full h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80]">
                        <input
                          type="text"
                          className="grow h-full bg-transparent outline-none text-sm"
                          placeholder="썸네일을 등록해주세요."
                        ></input>
                        <div className="flex space-x-[20px]">
                          <Image
                            src={cameraImg}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt=""
                          />
                          <Image
                            src={clipImg}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt=""
                          />
                        </div>
                      </div> */}
                      <div className="relative">
                        <TextInput
                          type="text"
                          color={"#2778C780"}
                          theme={{
                            field: {
                              input: {
                                base: "grow w-full h-[47px] !px-[20px] bg-[#FFFFFF80] border-[#CCCCCC80] outline-none text-sm",
                              },
                            },
                          }}
                          className="grow h-full bg-transparent outline-none text-sm"
                          placeholder="썸네일을 등록해주세요."
                        />
                        <div className="absolute flex items-center h-full top-0 right-[20px] space-x-[20px]">
                          <Image
                            src={cameraImg}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt=""
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
                      {/* <textarea
                        className="w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] text-sm"
                        placeholder="아바타 설명을 입력해주세요."
                      /> */}
                      <Textarea
                        color={"#2778C780"}
                        theme={{
                          base: "w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] shadow-none text-sm ",
                        }}
                        placeholder="아바타 설명을 입력해주세요."
                      />
                    </div>
                    <div className="flex flex-col space-y-[20px]">
                      <p className="font-semibold">태그</p>
                      <CreatableSelect
                        isMulti
                        // options={mostUsedTags}
                        instanceId={""}
                        // onChange={(e: any) => {
                        //   setCurrentTags(e);
                        // }}
                        className="flex w-full items-center h-[47px] ring-0"
                        placeholder={"태그를 입력해주세요"}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#FFFFFF80",
                            borderRadius: "10px",
                            boxShadow: "1px",
                          }),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end w-[252px] h-full mt-[50px] space-y-[30px] pointer-events-auto">
              {MenuButton(resetCamera, setHelpViewer, postMessage, fullScreen)}
              <div
                className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                onClick={() => setRightTabActive(!rightTabActive)}
              >
                <Image
                  src={rightTabActive ? upImg : downImg}
                  className="w-[18px] h-[9px]"
                  alt=""
                />
              </div>
              {rightTabActive && (
                <div className="flex flex-col w-full space-y-[30px] text-[14px]">
                  <div className="flex flex-col space-y-[20px]">
                    <p className="font-semibold">업로드 날짜</p>
                    <p>{moment().format("YYYY.MM.DD")}</p>
                  </div>
                  <div className="flex flex-col space-y-[20px]">
                    <p className="font-semibold">상태 설정</p>
                    <Select
                      id="countries"
                      color={"#2778C780"}
                      theme={{ field: { select: { base: "w-full h-[47px]" } } }}
                      required
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullCanvas;

function MenuButton(
  resetCamera: () => void,
  setHelpViewer: any,
  postMessage: () => void,
  fullScreen: boolean
) {
  return (
    <div className="flex flex-row space-x-[20px]">
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={resetCamera}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={refreshImg}
          alt=""
        />
      </div>
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setHelpViewer(true)}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={helpImg}
          alt=""
        />
      </div>
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={postMessage}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={fullScreen ? originalscreenImg : fullscreenImg}
          alt=""
        />
      </div>
    </div>
  );
}

function HelpViewer(setHelpViewer: any, isMobile: () => boolean) {
  return (
    <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 select-none bg-[#00000080] z-10">
      <Image
        className="absolute top-[20px] right-[20px] w-[28px] h-[28px] cursor-pointer"
        src={cancelImg}
        alt=""
        onClick={() => setHelpViewer(false)}
      />
      <div className="flex mc_sm:flex-row flex-col mc_sm:space-x-[60px] space-x-0 mc_sm:space-y-0 space-y-[16px] text-white text-center">
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={rotateImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">회전</p>
          {isMobile() ? (
            <p className="text-[14px]">한 손가락으로 드래그</p>
          ) : (
            <p className="text-[14px]">마우스 좌클릭 후 드래그</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={zoomImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">확대</p>
          {isMobile() ? (
            <p className="text-[14px]">
              두 손가락을 동시에
              <br />
              바깥/안쪽으로 드래그
            </p>
          ) : (
            <p className="text-[14px]">마우스 스크롤</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={moveImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">이동</p>
          {isMobile() ? (
            <p className="text-[14px]">두 손가락으로 드래그</p>
          ) : (
            <p className="text-[14px]">마우스 우클릭 후 드래그</p>
          )}
        </div>
      </div>
    </div>
  );
}
