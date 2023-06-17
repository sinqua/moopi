'use client'
import { useState } from "react";

const normalBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
const selectedBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";

export default function TabBar() {
    const [page, setPage] = useState("설명");

    return (
        <div className="md:mt-0 mt-[40px] flex justify-center w-full md:w-[1312px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
          <div className="w-full h-full flex justify-center border-solid border-[1px] border-[#E7E7E7]">
            <div
              className={page === "설명" ? selectedBtn : normalBtn}
              onClick={() => setPage("설명")}
            >
              설명
            </div>
            <div
              className={page === "포트폴리오" ? selectedBtn : normalBtn}
              onClick={() => setPage("포트폴리오")}
            >
              포트폴리오
            </div>
            <div
              className={page === "가격정보" ? selectedBtn : normalBtn}
              onClick={() => setPage("가격정보")}
            >
              가격정보
            </div>
            <div
              className={page === "리뷰" ? selectedBtn : normalBtn}
              onClick={() => setPage("리뷰")}
            >
              리뷰
            </div>
          </div>
        </div>
    );
}