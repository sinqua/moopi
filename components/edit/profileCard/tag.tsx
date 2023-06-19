"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

interface TagProps {
  session: any;
  tags: any;
}

export const Tag = (props: TagProps) => {
  const { session, tags } = props;

  const [currentTags, setCurrentTags] = useState(tags);

  const options = [
    { value: "VRM", label: "VRM" },
    { value: "이세계아이돌", label: "이세계아이돌" },
    { value: "Blender", label: "Blender" },
  ];

  return (
    <div>
      <p className="mb-[15px] text-[20px] font-semibold">태그</p>
      <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
        한 눈에 알아보기 쉽도록 태그를 추가해보아요
      </p>
      <div className="mb-[20px]">
        <CreatableSelect
          isMulti
          options={options}
          value={currentTags}
          instanceId={""}
          onChange={(e: any) => {
            setCurrentTags(e);
          }}
          className="flex w-full items-center sm:w-[482px] h-[47px]"
          placeholder={"태그를 입력해주세요"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "100%",
              width: "100%",
            }),
          }}
        />
      </div>
    </div>
  );
};
