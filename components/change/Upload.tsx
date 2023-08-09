"use client";
import { useEffect, useRef, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { supabase } from "@/lib/database";

import Input from "@/components/change/Input";
import Camera from "@/components/change/Camera";
import FullCanvas from "@/components/change/FullCanvas";
export interface avatarTable {
  animation: number | null;
  created_at: string | null;
  description: string | null;
  id: number;
  is_profile: boolean | null;
  name: string | null;
  thumbnail: string | null;
  user_id: string | null;
  visible: boolean | null;
  vrm: string | null;
}

const lookUpTable = [
  { value: 1, label: "HipHopDancing" },
  { value: 2, label: "PutYourHandsUp" },
  { value: 3, label: "Thankful" },
  { value: 4, label: "Idle" },
];

interface UploadProps {
  popularTags: {
    value: any;
    label: any;
  }[];
  tags: { label: any; value: any }[] | null;
  avatar: avatarTable;
}

export default function Upload(props: UploadProps) {
  const { popularTags, tags, avatar } = props;

  useEffect(() => {
    CreateModelUrl(props.avatar.user_id!, props.avatar.vrm!).then((result) => {
      if (result) setModelUrl(result.signedUrl);
    });
  }, []);

  const [modelUrl, setModelUrl] = useState<string>();
  const [animationUrl, setAnimationUrl] = useState(lookUpTable.find((item) => item.value === avatar.animation)?.label);
  const [progress, setProgress] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<any>(avatar.thumbnail);

  const cameraControlsRef = useRef<CameraControls>(null);
  const canvasRef = useRef<any>();

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
          modelUrl={modelUrl}
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
        avatar={avatar}
        tags={tags}
        setModelUrl={setModelUrl}
        setAnimationUrl={setAnimationUrl}
        popularTags={popularTags}
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        resetCamera={resetCamera}
        setProgress={setProgress}
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

// Create file url
export async function CreateModelUrl(userId: string, filename: any) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("optimize")
    .createSignedUrl(filepath, 3600);

  return data;
}