"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { CameraControls } from "@react-three/drei";
import { supabase, supabaseAuth } from "@/lib/database";
import { UploadAvatar } from "@/lib/storage";

import Input from "@/components/upload/Input";
import Camera from "@/components/upload/Camera";
import FullCanvas from "@/components/FullCanvas";
import { useRouter } from "next/navigation";

const defaultModel = {
  modelUrl: "/s2xyoon.vrm",
  animationUrl: "/HipHopDancing.fbx",
};

interface UploadProps {
  IframeUrl: string;
  mostUsedTags: any;
}

export default function Upload(props: UploadProps) {
  const { IframeUrl, mostUsedTags } = props;
  const router = useRouter();

  const { data: session, status } = useSession();

  const [modelUrl, setModelUrl] = useState("/s2xyoon.vrm");
  const [animationUrl, setAnimationUrl] = useState("Idle");
  const [progress, setProgress] = useState(false);

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

  const onSavePortfolio = async () => {
    if (avatarFile) {
      UploadAvatar(session?.user.id, avatarFile.name, avatarFile).then(
        async (data) => {
          const { data: avatarData, error: avatarError } = await supabase
            .from("avatars")
            .insert([
              {
                vrm: avatarFile.name,
                user_id: session?.user.id,
                is_profile: false,
                name: avatarNameRef.current.value,
                description: avatarDescriptionRef.current.value,
                visible: true,
              },
            ])
            .select();

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

          router.push(`/${session?.user.id}/description`);
        }
      );
    }
  };

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
        avatarNameRef={avatarNameRef}
        avatarFile={avatarFile}
        setAvatarFile={setAvatarFile}
        avatarDescriptionRef={avatarDescriptionRef}
        avatarTags={avatarTags}
        setAvatarTags={setAvatarTags}
        avatarStatus={avatarStatus}
        setAvatarStatus={setAvatarStatus}
        setAvatarAnimation={setAvatarAnimation}
        onSavePortfolio={onSavePortfolio}
      />
      <Camera
        cameraActive={cameraActive}
        setCameraActive={setCameraActive}
        resetCamera={resetCamera}
        canvasRef={canvasRef}
      />
    </>
  );
}
