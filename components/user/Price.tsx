'use client'
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { CreateQuillUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
interface PriceProps {
  priceInfoObject: any;
}

export default function Price(props: PriceProps) {
  const { priceInfoObject } = props;
  const [priceInfo, setPriceInfo] = useState<any>(null);

  useEffect(() => {
    CreateHtml(priceInfoObject).then((html) => setPriceInfo(html));
  }, [priceInfoObject]);

  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      {priceInfo && parse(priceInfo)}
    </div>
  );
}

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateQuillUrl(arr[i].insert.image).then(async (url) => {
        arr[i].insert.image = url!.publicUrl;
        arr[i].attributes = {
          display: "inline-block",
        };
      });
    }
  }

  var cfg = {};
  var converter = new QuillDeltaToHtmlConverter(arr, cfg);

  converter.afterRender((groupType: any, htmlString: string) => {
    htmlString = htmlString.replace(/<img/g, '<img loading="lazy"');
    return htmlString;
  });

  var html = converter.convert();
  return html;
};