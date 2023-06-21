'use client'
import React, { useState } from "react";

interface PortfolioProps {
  IframeUrl: string;
}

export default function Portfolio(props: PortfolioProps) {
  const { IframeUrl } = props;
  const [portfolios, setPortfolios] = useState(["1", "2", "3", "4", "5"]);

  return (
    <div className="ql-editor relative w-full md:w-[1312px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
        {portfolios.map((portfolio: any, index: any) => {
          return (
            <iframe
              src={IframeUrl}
              className="relative w-full h-[512px] top-0 left-0 md:rounded-[10px] rounded-none"
              allowFullScreen
              key={portfolio}
            />
          );
        })}
      </div>
    </div>
  );
}
