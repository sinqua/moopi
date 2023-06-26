"use client";
import { useState } from "react";

interface AvatarProps {
  IframeUrl: string;
}

export default function Avatar(props: AvatarProps) {
  const { IframeUrl } = props;

  return (
    <div className="md:w-[814px] md:h-[526px] h-[470px] md:rounded-[10px] rounded-none bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
      <iframe
        src={IframeUrl}
        className="relative w-full h-full top-0 left-0 md:rounded-[10px] rounded-none"
        allowFullScreen
      />
    </div>
  );
}
