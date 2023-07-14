import Description from "@/components/user/Description";
import { supabase } from "@/lib/database";
import { CreateImageUrl, CreateQuillUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export const revalidate = 0;

export default async function Page(props: any) {
  const { params } = props;

  const detail = await getUserDetail(params.user);
  const descriptionObject = JSON.parse(detail.description);
  const description = await CreateHtml(descriptionObject);

  return <Description description={description} />;
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
      await CreateQuillUrl(arr[i].insert.image).then(async (url) => {
        arr[i].insert.image = url!.publicUrl;
        arr[i].attributes = {
          display: "inline-block",
          renderAsBlock: true,
        };
      });
    }
  }

  var cfg = {};
  var converter = new QuillDeltaToHtmlConverter(arr, cfg);

  converter.afterRender((groupType: any, htmlString: string) =>{
    htmlString = htmlString.replace(/<img/g, '<img loading="lazy"');
    return htmlString;
});

  var html = converter.convert();
  return html;
};
