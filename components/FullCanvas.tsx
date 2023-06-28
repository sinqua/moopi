"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, Ring, useGLTF } from "@react-three/drei";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import moment from "moment";

import cancelImg from "@/app/assets/images/cancel.svg";
import cancelBlackImg from "@/app/assets/images/cancel_black.svg";

import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";
import clipImg from "@/app/assets/images/clip.svg";
import cameraImg from "@/app/assets/images/camera.svg";
import cameraFillImg from "@/app/assets/images/camera_fill.svg";
import upImg from "@/app/assets/images/up.svg";
import downImg from "@/app/assets/images/down.svg";
import playImg from "@/app/assets/images/play.svg";

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

  const [thumbnailActive, setThumbnailActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

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

  const options = [
    { value: "공개", label: "공개" },
    { value: "비공개", label: "비공개" },
  ];

  const canvasRef = useRef<any>();
  const [thumbnailUrl, setThumbnailUrl] = useState<any>(null);

  function takeCaputre() {
    const canvas = canvasRef.current;

    // Check if the canvas element is available
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement("canvas");
    const croppedContext = croppedCanvas.getContext("2d");

    // Define the cropping dimensions
    const cropX = Math.floor(canvas.width / 2 - (canvas.height * 0.625) / 2); // Starting x-coordinate of the crop area
    const cropY = 0; // Starting y-coordinate of the crop area
    const cropWidth = Math.floor(canvas.height * 0.625); // Width of the crop area
    const cropHeight = canvas.height; // Height of the crop area

    // Set the dimensions of the cropped canvas
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;

    const saveCanvas = document.createElement("canvas");
    const saveContext = saveCanvas.getContext("2d");
    saveCanvas.width = 800;
    saveCanvas.height = 1280;

    // Draw the cropped image onto the new canvas
    croppedContext!.drawImage(
      canvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    saveContext!.drawImage(
      croppedCanvas,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height,
      0,
      0,
      saveCanvas.width,
      saveCanvas.height
    );

    // // Get the data URL of the cropped image
    // const croppedImageURL = croppedCanvas.toDataURL();

    setThumbnailUrl(saveCanvas.toDataURL());
  }

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden"
        onContextMenu={handleContextMenu}
      >
        {helpViewer && HelpViewer(setHelpViewer, isMobile)}
        <Canvas
          ref={canvasRef}
          gl={{ preserveDrawingBuffer: true }}
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
          {!thumbnailActive && (
            <div className="relative flex justify-between max-w-[1312px] w-full h-full">
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
                        <div className="relative w-full h-[47px]">
                          <input
                            type="text"
                            className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] text-sm outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                            placeholder="아바타 이름을 입력해주세요."
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-[20px]">
                        <p className="font-semibold">아바타 파일</p>
                        <div className="relative w-full h-[47px]">
                          <input
                            type="text"
                            className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] text-sm outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                            placeholder="아바타 파일을 등록해주세요."
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
                        <div className="relative w-full h-[47px]">
                          <input
                            type="text"
                            className="w-full h-full rounded-[10px] bg-[#FFFFFF80] border border-solid border-[#CCCCCC80] px-[20px] py-[0.25rem] text-sm outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                            placeholder="썸네일을 등록해주세요."
                          />
                          <div className="absolute flex items-center h-full top-0 right-[20px] space-x-[20px]">
                            <Image
                              src={cameraImg}
                              className="w-[18px] h-[18px] cursor-pointer"
                              alt=""
                              onClick={() => {
                                setThumbnailActive(true);
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
                          className="w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] text-sm outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#2778C780] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                          placeholder="아바타 설명을 입력해주세요."
                        />
                        {/* <Textarea
                        color={"#2778C780"}
                        theme={{
                          base: "w-full h-[180px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-[#FFFFFF80] border-solid border-[1px] border-[#CCCCCC80] shadow-none text-sm ",
                        }}
                        placeholder="아바타 설명을 입력해주세요."
                      /> */}
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
                            }),
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end w-[242px] h-full mt-[50px] space-y-[30px] pointer-events-auto">
                {MenuButton(
                  resetCamera,
                  setHelpViewer,
                  postMessage,
                  fullScreen
                )}
                <div
                  className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                  onClick={() => setRightTabActive(!rightTabActive)}
                >
                  <Image
                    src={rightTabActive ? upImg : downImg}
                    className="w-[20px] h-[10px]"
                    alt=""
                  />
                </div>
                {rightTabActive && (
                  <div className="flex flex-col w-full space-y-[30px] text-[14px]">
                    <div className="flex flex-col space-y-[20px]">
                      <p className="font-semibold">업로드 날짜</p>
                      <p>{moment().format("YYYY.MM.DD")}</p>
                    </div>
                    <div className="flex flex-col w-[125px] space-y-[20px]">
                      <p className="font-semibold">상태 설정</p>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={options[0]}
                        isSearchable={false}
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
                            fontSize: "14px",
                          }),
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-[20px]">
                      <p className="font-semibold">애니메이션</p>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={options[0]}
                        isSearchable={false}
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
                            fontSize: "14px",
                          }),
                        }}
                      />
                    </div>
                    <div className="flex flex-col !mt-[50px] space-y-[20px]">
                      <div className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#333333] text-[#FFFFFF] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer">
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
          )}
          {thumbnailActive && (
            <div className="absolute flex justify-center w-full h-full top-0 right-0">
              <div className="h-full grow bg-[#00000050]"></div>
              <div className="relative flex flex-col justify-end items-center h-full aspect-[10/16] grow-0 opacity-100">
                <div className="absolute w-full h-full top-0 right-0">
                  <div className="flex justify-evenly w-full h-full">
                    <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
                    <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
                  </div>
                </div>
                <div className="flex flex-col justify-evenly w-full h-full">
                  <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
                  <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
                </div>
                <div className="flex mb-[30px] space-x-[30px] pointer-events-auto z-0">
                  <div
                    className="flex justify-center items-center w-[50px] h-[50px] bg-white rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                    onClick={() => {
                      setThumbnailActive(false);
                      resetCamera();
                    }}
                  >
                    <Image
                      className="w-[26px] h-[26px]"
                      src={cancelBlackImg}
                      alt=""
                    />
                  </div>
                  <div
                    className="flex justify-center items-center w-[50px] h-[50px] bg-[#333333] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                    onClick={() => {
                      setModalActive(true);
                      takeCaputre();
                    }}
                  >
                    <Image
                      className="w-[26px] h-[26px]"
                      src={cameraFillImg}
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center items-center w-[50px] h-[50px] bg-white rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer">
                    <Image
                      className="w-[20px] h-[20px] ml-[2px]"
                      src={playImg}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="h-full grow bg-[#00000050]"></div>
              {modalActive && (
                <div className="absolute flex justify-center items-center w-full h-full pointer-events-auto bg-[#00000050]">
                  <div className="flex flex-col w-[400px] h-auto bg-white rounded-[10px]">
                    <div className="flex flex-col justify-center items-center grow space-y-[35px] box-border px-[20px] py-[30px]">
                      <div className="flex flex-col justify-center space-y-[15px]">
                        <p className="text-[16px] font-semibold text-center">
                          사진을 저장하시겠습니까?
                        </p>
                        <p className="text-[#7B7B7B] text-center">
                          게시물의 썸네일으로 게시됩니다.
                        </p>
                      </div>
                      <div className="relative w-full aspect-[10/16] bg-gray-200">
                        <Image
                          className="w-full h-full"
                          src={thumbnailUrl ? thumbnailUrl : playImg}
                          fill={true}
                          style={{ objectFit: "contain" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex border-solid border-t-[1px] border-[#DFDFDF]">
                      <div className="flex justify-center basis-1/2 py-[20px] text-[#2778C7] cursor-pointer">
                        저장
                      </div>
                      <div
                        className="flex justify-center basis-1/2 py-[20px] text-[#7B7B7B] border-solid border-l-[1px] border-[#DFDFDF] cursor-pointer"
                        onClick={() => setModalActive(false)}
                      >
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
