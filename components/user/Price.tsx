import parse from "html-react-parser";

interface PriceProps {
  priceInfo: string | undefined;
}

export default function Price(props: PriceProps) {
  const { priceInfo } = props;
  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      {priceInfo && parse(priceInfo)}
    </div>
  );
}
