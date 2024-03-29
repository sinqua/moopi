"use client";

import Image from "next/image";
import { lazy, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import BounceLoader from "react-spinners/BounceLoader";

import cancelImg from "@/app/assets/images/cancel.svg";
import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";
import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";

const ModelComponent = lazy(() => import("../Model2"));

interface FullCanvasProps {
  modelUrl: any;
  animationUrl: any;
  setAnimationUrl: any;
  progress: any;
  setProgress: any;
  cameraActive: any;
  cameraControlsRef: any;
  resetCamera: any;
  canvasRef: any;
}

const FullCanvas = (props: FullCanvasProps) => {
  const {
    modelUrl,
    animationUrl,
    setAnimationUrl,
    progress,
    setProgress,
    cameraActive,
    cameraControlsRef,
    resetCamera,
    canvasRef,
  } = props;

  const [fullScreen, setFullScreen] = useState(false);
  const [helpViewer, setHelpViewer] = useState(false);

  const isMobile = () => "ontouchstart" in document.documentElement;

  const handleContextMenu = (event: any) => {
    event.preventDefault();
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
          {modelUrl && (
            <ModelComponent
              animationUrl={animationUrl}
              setAnimationUrl={setAnimationUrl}
              modelUrl={modelUrl}
              setProgress={setProgress}
            />
          )}
        </Canvas>
        {!progress && (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <BounceLoader color="#2778C7" />
          </div>
        )}
        <div className="absolute flex justify-center top-0 w-full h-full pointer-events-none z-10">
          <div className="absolute top-0 flex justify-end sm:items-start items-end max-w-[1372px] w-full h-full pt-[50px] pb-[20px] md:px-0 sm:px-[30px] px-[20px]">
            {!cameraActive &&
              MenuButton(resetCamera, setHelpViewer, postMessage, fullScreen)}
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
    <div className="flex flex-row h-min space-x-[20px] pointer-events-auto">
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
      {/* <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={postMessage}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={fullScreen ? originalscreenImg : fullscreenImg}
          alt=""
        />
      </div> */}
    </div>
  );
}

function HelpViewer(setHelpViewer: any, isMobile: () => boolean) {
  return (
    <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 select-none bg-[#00000080] z-[999]">
      <Image
        className="absolute top-[20px] right-[20px] w-[28px] h-[28px] cursor-pointer"
        src={cancelImg}
        alt=""
        onClick={() => setHelpViewer(false)}
        priority
      />
      <div className="flex mc_sm:flex-row flex-col mc_sm:space-x-[60px] space-x-0 mc_sm:space-y-0 space-y-[16px] text-white text-center">
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={rotateImg}
            alt=""
            priority
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
            priority
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
            priority
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
