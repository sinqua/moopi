"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";
import MenuButton from "./MenuButton";
import HelpViewer from "./HelpViewer";
import { ModelProps } from "../Model";
import BounceLoader from "react-spinners/BounceLoader";
const ModelComponent = lazy(() => import("../Model"));

const SupabasePublicURL =
  "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";
interface AvatarCanvasProps {
  modelUrl: string | undefined;
  animation: number | undefined;
  thumbnailUrl: string | undefined;
}

const AvatarCanvas = ({
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
          {helpViewer && (
            <HelpViewer setHelpViewer={setHelpViewer} isMobile={isMobile} />
          )}
          <Suspense fallback={""}>
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
          </Suspense>
          {!progress && (
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
              <BounceLoader color="#2778C7" />
            </div>
          )}
          <MenuButton
            resetCamera={resetCamera}
            setHelpViewer={setHelpViewer}
            postMessage={postMessage}
            fullScreen={fullScreen}
            setThumbnailViewer={setThumbnailViewer}
          />
        </div>
      )}
    </>
  );
};

export default AvatarCanvas;
