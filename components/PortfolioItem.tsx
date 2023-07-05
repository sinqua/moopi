'use client'
import Image from "next/image";
import useDrag from "@/app/hooks/dragHook";
import { useEffect, useState } from "react";

interface PortfolioItemProps {
    thumbnail: any;
    name: any;
    tags: any;
    index: any;
}

const PortfolioItem = (props: PortfolioItemProps) => {
    const { thumbnail, name, tags, index } = props;

    const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();
  
    useEffect(() => {
        setMountedStatus(true);

      }, []);

    return (
        <div
        className="flex flex-row space-x-[20px] relative h-[104px] w-[300px]"
        key={index}
      >
        <Image
          className=""
          src={thumbnail}
          width={104}
          height={104}
          alt=""
        />
        <div className="relative flex flex-col justify-between grow">
          <p className="truncate h-[30px] w-[170px] font-semibold text-[14px]">
            {name ?? ""}
          </p>
          <div className="flex space-x-[10px] mb-5">
            <p>2023.01.01</p>
          </div>
          <div className="text-[14px] space-y-[20px] w-[170px]">
            <div
              className="flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
              {...dragEvents}
              ref={dragRef}
            >
              {tags.map((tag: any, index: any) => {
                return (
                  <div
                    className="inline-flex h-[31px] px-[13px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing items-center"
                    key={tag}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  export default PortfolioItem;