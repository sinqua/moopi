"use client";
import { useState } from "react";
import AvatarCanvas from "../AvatarCanvas";

interface AvatarProps {
  userID: string;
  avatarID: number;
  modelUrl: string;
  animationUrl: string;
  thumbnailUrl: string;
}

export default function Avatar(props: AvatarProps) {
  const { userID, avatarID, modelUrl, animationUrl, thumbnailUrl } = props;

  return (
    <div className="md:w-[814px] md:h-[526px] h-[470px] md:rounded-[10px] rounded-none bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
      <AvatarCanvas
        userId={userID}
        avatarId={avatarID}
        modelUrl={modelUrl}
        animationUrl={animationUrl}
        thumbnailUrl={thumbnailUrl}
      />
    </div>
  );
}
