"use client";
import { useEffect, useRef, useState } from "react";
import AvatarModal from "@/components/AvatarModal";
import { useRouter } from "next/navigation";
import PortfolioCanvas from "../PortfolioCanvas";

interface PortfolioProps {
  user: any;
  portfolio: { [x: string]: any }[] | null;
  modelUrl: string | undefined;
  animationUrl: string | undefined;
  thumbnailUrl: string | undefined;
}

export default function Portfolio(props: PortfolioProps) {
  const { user, portfolio, modelUrl, animationUrl, thumbnailUrl } = props;

  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MODAL") {
        router.push(
          `/${event.data.message.userId}/avatar/${event.data.message.avatarId}`
        );
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
          {portfolio!.map((work: any, index: any) => {
            return (
              <PortfolioCanvas
                userId={user}
                avatarId={work.id}
                modelUrl={modelUrl}
                animationUrl={animationUrl}
                thumbnailUrl={thumbnailUrl}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
