import Description from "@/components/user/info/Description";
import { supabase } from "@/lib/database";
import { CreateQuillUrl } from "@/lib/storage";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default async function Page({ params }: { params: { user: string } }) {
  // const detail = await getUserDetail(params.user);
  // const descriptionObject =
  //   detail.description && JSON.parse(detail.description);
  // const description = await CreateHtml(descriptionObject);

  // return <Description description={description} />;
}

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("User not found");
  }
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

  const converter = new QuillDeltaToHtmlConverter(arr);

  converter.afterRender((groupType: any, htmlString: string) => {
    htmlString = htmlString.replace(/<img/g, '<img loading="lazy"');
    return htmlString;
  });

  const html = converter.convert();
  return html;
};
