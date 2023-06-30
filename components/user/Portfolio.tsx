interface PortfolioProps {
  user: any;
  portfolio: any;
}

export default function Portfolio(props: PortfolioProps) {
  const { user, portfolio } = props;

  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[16px]">
        {portfolio.map((work: any, index: any) => {
          const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/three/${user}/${work.id}`;

          return (
            <iframe
              src={IframeUrl}
              className="relative w-full h-[512px] top-0 left-0 md:rounded-[10px] rounded-none"
              allowFullScreen
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
