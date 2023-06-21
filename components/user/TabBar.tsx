"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const normalBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
const selectedBtn =
  "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";

interface TabBarProps {
  description: string | undefined;
  priceInfo: string | undefined;
}

export default function TabBar(props: TabBarProps) {
  const { description, priceInfo } = props;
  const [page, setPage] = useState("설명");

  const [portfolios, setPortfolios] = useState(["1", "2", "3", "4", "5"]);
  const [portfolioActive, setPortfolioActive] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="md:mt-0 mt-[40px] flex justify-center w-full md:w-[1312px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
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
      <div className="ql-editor relative w-full md:w-[1312px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
        <div className={page !== "설명" ? "hidden" : ""}>
          {description && parse(description)}
        </div>
        <div className={page !== "포트폴리오" ? "hidden" : ""}>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
            {portfolios.map((portfolio: any, index: any) => {
              return (
                <iframe
                  src={IframeUrl}
                  className="relative w-full h-[512px] top-0 left-0 md:rounded-[10px] rounded-none"
                  allowFullScreen
                  key={portfolio}
                />
            )})}
          </div>
        </div>
        <div className={page !== "가격정보" ? "hidden" : ""}>
          {priceInfo && parse(priceInfo)}
        </div>
      </div>
    </>
  );
}

const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs`;
