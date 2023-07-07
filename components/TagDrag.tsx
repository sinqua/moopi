import { useEffect, useRef, useState } from "react";
import useDrag from "@/hooks/useDrag";

interface TagDragProps {
  avatarTags: Array<{ value: string; label: string }>;
}

const TagDrag = (props: TagDragProps) => {
  const { avatarTags } = props;
  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div
      className="md:w-[400px] w-full max-w-full flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
      {...dragEvents}
      ref={dragRef}
    >
      {avatarTags.map((tag: any, index: any) => {
        return (
          <div
            className="inline-flex h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing"
            key={index}
          >
            {tag.value}
          </div>
        );
      })}
    </div>
  );
};

export default TagDrag;
