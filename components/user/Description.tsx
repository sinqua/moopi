import parse from "html-react-parser";

interface DescriptionProps {
  description: string | undefined;
}

export default function Description(props: DescriptionProps) {
  const { description } = props;
  return (
    <div className="ql-editor relative w-full md:w-[1312px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      {description && parse(description)}
    </div>
  );
}
