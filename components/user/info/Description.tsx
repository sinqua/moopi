'use client'
import { useEffect, useState } from 'react';
import parse from "html-react-parser";
import { CreateImageUrl, CreateQuillUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

interface DescriptionProps {
  descriptionObject: string | undefined;
}

export default function Description(props: DescriptionProps) {
  const { descriptionObject } = props;

  const [description, setDescription] = useState<any>(null);

  useEffect(() => {
    CreateHtml(descriptionObject).then((html) => setDescription(html));

    return () => {
      setDescription(null);
    }
  }, [descriptionObject]);


  return (
    <div className="ql-editor relative w-full md:w-[1372px] md:!px-[30px] sm:!px-[60px] !px-[30px] sm:!pt-[40px] !pt-[30px] sm:!pb-[80px] !pb-[50px] grow">
      {description && parse(description)}
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
          renderAsBlock: true,
        };
      });
    }
  }

  const converter = new QuillDeltaToHtmlConverter(arr);

  converter.afterRender((groupType: any, htmlString: string) => {
    htmlString = htmlString.replace(/<img/g, '<img loading="lazy"');
    return htmlString;
  });

  const html = converter.convert();
  return html;
};