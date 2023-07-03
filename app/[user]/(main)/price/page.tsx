import Price from "@/components/user/Price";
import { supabase } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default async function Page(props: any) {
  const { params } = props;

  const detail = await getUserDetail(params.user);
  const priceInfoObject = JSON.parse(detail.price_info);
  const priceInfo = await CreateHtml(priceInfoObject);

  return <Price priceInfo={priceInfo} />;
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateImageUrl(arr[i].insert.image).then(async (url) => {
        arr[i].insert.image = url!.signedUrl;
        arr[i].attributes = {
          display: "inline-block",
        };
      });
    }
  }

  var cfg = {};
  var converter = new QuillDeltaToHtmlConverter(arr, cfg);
  var html = converter.convert();
  return html;
};
