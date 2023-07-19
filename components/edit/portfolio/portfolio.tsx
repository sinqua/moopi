"use client";
import { Suspense, useEffect, useState } from "react";
import { Modal } from "../modal";
import { Avatar } from "./avatar";
import LoadingModal from "./LoadingModal";

interface PortfolioProps {
  portfolios: any;
}

export default function Portfolio(props: PortfolioProps) {
  const { portfolios } = props;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPortfolios, setCurrentPortfolios] = useState(portfolios);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [currentPortfolios]);

  const onSavePortfolio = async () => {};

  return (
    <>
      <div>
        <p className="mb-[15px] text-[20px] font-semibold">포트폴리오 수정</p>
        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
          업로드했던 포트폴리오를 수정할 수 있어요.
        </p>
      </div>
      <div className="sm:space-y-[80px] space-y-[60px] ">
        {currentPortfolios.map((portfolio: any, index: any) => {
          return (
            <Avatar
              portfolio={portfolio}
              key={index}
              setCurrentPortfolios={setCurrentPortfolios}
              setLoading={setLoading}
            />
          );
        })}
      </div>
      <div className="flex justify-center pt-[120px] space-x-[15px]">
        <div
          className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
          onClick={() => setModal(true)}
        >
          저장하기
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} onSaveData={onSavePortfolio} />
      <LoadingModal modal={loading} />
    </>
  );
}
