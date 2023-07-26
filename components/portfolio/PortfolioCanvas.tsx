"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";
import MenuButton from "./MenuButton";
import HelpViewer from "./HelpViewer";
import { ModelProps } from "../Model";
import BounceLoader from "react-spinners/BounceLoader";

const ModelComponent = lazy(() => import("../Model"));

interface PortfolioCanvasProps {
  userId: any;
  avatarId: any;
  modelUrl: string | undefined;
  animation: number | null;
  thumbnailUrl: string | undefined;
}

const PortfolioCanvas = ({
  userId,
  avatarId,
  modelUrl,
  animation,
  thumbnailUrl = "/mainModel.png",
}: PortfolioCanvasProps) => {
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [fullScreen, setFullScreen] = useState(false);
  const [helpViewer, setHelpViewer] = useState(false);
  const [thumbnailViewer, setThumbnailViewer] = useState(true);
  const [progress, setProgress] = useState(false);

  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    setModelInfo({
      modelUrl: modelUrl,
      animation: animation,
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
    window.parent.postMessage(
      { type: "MODAL", message: { userId: userId, avatarId: avatarId } },
      "*"
    );
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
    <div className="relative w-full h-[512px] top-0 left-0 md:rounded-[10px] rounded-none">
      {thumbnailViewer ? (
        <Image
          src={thumbnailUrl}
          priority={true}
          fill={true}
          style={{ objectFit: "cover" }}
          onClick={() => setThumbnailViewer(false)}
          alt=""
        />
      ) : (
        <div
          className="relative w-full h-full overflow-hidden"
          onContextMenu={handleContextMenu}
        >
          {helpViewer && (
            <HelpViewer setHelpViewer={setHelpViewer} isMobile={isMobile} />
          )}
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
          <MenuButton
          userID={userId}
            avatarID={avatarId}
            resetCamera={resetCamera}
            setHelpViewer={setHelpViewer}
            postMessage={postMessage}
            fullScreen={fullScreen}
            setThumbnailViewer={setThumbnailViewer}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioCanvas;