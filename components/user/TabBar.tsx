"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabBar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    setSelected(pathname.split("/")[2]);
  }, [pathname]);

  return (
    <div className="md:mt-0 mt-[40px] flex justify-center w-full md:w-[1312px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
      <div className="w-full h-full flex justify-center border-solid border-[1px] border-[#E7E7E7]">
        <Link
          href={`/${pathname.split("/")[1]}`}
          className={
            selected === undefined ? selectedBtn : normalBtn
          }
          onClick={() => setSelected(undefined)}
        >
          설명
        </Link>
        <Link
          href={`/${pathname.split('/')[1]}/portfolio`}
          className={
            selected === "portfolio" ? selectedBtn : normalBtn
          }
          onClick={() => setSelected("portfolio")}
        >
          포트폴리오
        </Link>
        <Link
          href={`/${pathname.split("/")[1]}/price`}
          className={
            selected === "price" ? selectedBtn : normalBtn
          }
          onClick={() => setSelected("price")}
        >
          가격정보
        </Link>
        <Link
          href={`/${pathname.split("/")[1]}/review`}
          className={
            selected === "review" ? selectedBtn : normalBtn
          }
          onClick={() => setSelected("review")}
        >
          리뷰
        </Link>
      </div>
    </div>
  );
}

const normalBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
const selectedBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";