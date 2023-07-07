"use client";
import { useEffect, useRef, useState } from "react";

import { CameraControls } from "@react-three/drei";

import Input from "@/components/upload/Input";
import Camera from "@/components/upload/Camera";
import FullCanvas from "@/components/FullCanvas";

import tempImage from "@/app/assets/images/mainModel.png";

interface UploadProps {
  IframeUrl: string;
  mostUsedTags: any;
}

export default function Upload(props: UploadProps) {
  const { IframeUrl, mostUsedTags } = props;

  const [modelUrl, setModelUrl] = useState(undefined);
  const [animationUrl, setAnimationUrl] = useState("Idle");
  const [progress, setProgress] = useState(true);

  const cameraControlsRef = useRef<CameraControls>(null);
  const canvasRef = useRef<any>();

  const [cameraActive, setCameraActive] = useState(false);

  const avatarNameRef = useRef<any>(null);
  const [avatarFile, setAvatarFile] = useState<any>(null);
  const avatarDescriptionRef = useRef<any>(null);
  const [avatarTags, setAvatarTags] = useState<any>(null);
  const [avatarStatus, setAvatarStatus] = useState({
    value: "공개",
    label: "공개",
  });
  const [avatarAnimation, setAvatarAnimation] = useState<any>(null);
  const [thumbnailImage, setThumbnailImage] = useState<any>(tempImage);

  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);
    cameraControlsRef.current!.polarAngle = 1.35;
  };

  return (
    <>
      <div
        className={`${
          cameraActive
            ? "absolute h-full"
            : "sm:absolute relative sm:h-full h-[470px]"
        } w-full`}
      >
        <FullCanvas
          userId={undefined}
          filename={undefined}
          modelUrl={modelUrl}
          setModelUrl={setModelUrl}
          animationUrl={animationUrl}
          setAnimationUrl={setAnimationUrl}
          progress={progress}
          setProgress={setProgress}
          cameraActive={cameraActive}
          cameraControlsRef={cameraControlsRef}
          resetCamera={resetCamera}
          canvasRef={canvasRef}
        />
      </div>
      <Input
        setModelUrl={setModelUrl}
        animationUrl={animationUrl}
        setAnimationUrl={setAnimationUrl}
        mostUsedTags={mostUsedTags}
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        resetCamera={resetCamera}
        setProgress={setProgress}
        avatarNameRef={avatarNameRef}
        avatarFile={avatarFile}
        setAvatarFile={setAvatarFile}
        avatarDescriptionRef={avatarDescriptionRef}
        avatarTags={avatarTags}
        setAvatarTags={setAvatarTags}
        avatarStatus={avatarStatus}
        setAvatarStatus={setAvatarStatus}
        setAvatarAnimation={setAvatarAnimation}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <Camera
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        resetCamera={resetCamera}
        canvasRef={canvasRef}
        setThumbnailImage={setThumbnailImage}
      />
    </>
  );
}
