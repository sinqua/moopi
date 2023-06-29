"use client";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const normalBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
const selectedBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="md:mt-0 mt-[40px] flex justify-center w-full md:w-[1372px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
      <div className="w-full h-full flex justify-center border-solid border-[1px] border-[#E7E7E7]">
        <Link
          href={`${pathname.split("/")[1]}/description`}
          className={
            pathname.split("/")[2] === "description" ? selectedBtn : normalBtn
          }
        >
          설명
        </Link>
        <Link
          href={`${pathname.split("/")[1]}/portfolio`}
          className={
            pathname.split("/")[2] === "portfolio" ? selectedBtn : normalBtn
          }
        >
          포트폴리오
        </Link>
        <Link
          href={`${pathname.split("/")[1]}/price`}
          className={
            pathname.split("/")[2] === "price" ? selectedBtn : normalBtn
          }
        >
          가격정보
        </Link>
        <Link
          href={`${pathname.split("/")[1]}/review`}
          className={
            pathname.split("/")[2] === "review" ? selectedBtn : normalBtn
          }
        >
          리뷰
        </Link>
      </div>
    </div>
  );
}
