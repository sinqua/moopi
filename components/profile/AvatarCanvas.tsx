"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";

import cancelImg from "@/app/assets/images/cancel.svg";
import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";

import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import descriptionImg from "@/app/assets/images/description.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";
import powerImg from "@/app/assets/images/power.svg";

import { ModelProps } from "../Model";
import BounceLoader from "react-spinners/BounceLoader";
const ModelComponent = lazy(() => import("../Model"));

const SupabasePublicURL = "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public"
interface AvatarCanvasProps {
  userId: any;
  avatarId: any;
  modelUrl: string | undefined;
  animation: number | undefined;
  thumbnailUrl: string | undefined;
}

const AvatarCanvas = ({
  userId,
  avatarId,
  modelUrl,
  animation,
  thumbnailUrl = "/mainModel.png",
}: AvatarCanvasProps) => {
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [fullScreen, setFullScreen] = useState(false);
  const [helpViewer, setHelpViewer] = useState(false);
  const [thumbnailViewer, setThumbnailViewer] = useState(true);
  const [progress, setProgress] = useState(false);

  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {

    setModelInfo({
      modelUrl: modelUrl,
      animation: animation!,
      setProgress,
    });
  }, [modelUrl, animation]);

  useEffect(() => {
    if (thumbnailViewer) setProgress(false);
  }, [thumbnailViewer]);

  const isMobile = () => "ontouchstart" in document.documentElement;

  // Prevent the default right-click behavior
  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);
    cameraControlsRef.current!.polarAngle = 1.35;
  };

  const handleTemp = () => {
    window.parent.postMessage({ type: "MODAL", message: {userId: userId, avatarId: avatarId} }, "*");
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

  return (
    <>
      {thumbnailViewer ? (
        <Image
          src={`${SupabasePublicURL}/thumbnail/${thumbnailUrl}`}
          priority={true}
          alt=""
          style={{ objectFit: "contain", height: "100%" }}
          onClick={() => setThumbnailViewer(false)}
          width={814}
          height={526}
        />
      ) : (
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
          {!progress && (
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
              <BounceLoader color="#2778C7" />
            </div>
          )}
          {MenuButton(
            resetCamera,
            handleTemp,
            setHelpViewer,
            postMessage,
            fullScreen,
            setThumbnailViewer
          )}
        </div>
      )}
    </>
  );
};

export default AvatarCanvas;

function MenuButton(
  resetCamera: () => void,
  handleTemp: () => void,
  setHelpViewer: any,
  postMessage: () => void,
  fullScreen: boolean,
  setThumbnailViewer: any
) {
  return (
    <div className="absolute flex flex-row bottom-0 right-0 space-x-[20px] px-[35px] py-[20px]">
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
        onClick={handleTemp}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={descriptionImg}
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
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setThumbnailViewer(true)}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={powerImg}
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
