import { supabase } from "@/lib/database";
import { getMostUsedTags } from "@/utils/Tags";
import Upload from "@/components/change/Upload";

export default async function Page({ params }: { params: { avatar: number }}) {
  const popularTags = await getMostUsedTags();
  const tags = await getTags(params.avatar);
  const avatar = await getAvatar(params.avatar);

  return <Upload popularTags={popularTags} tags={tags} avatar={avatar}/>;
}

async function getTags(avatar_id: number) {
  const { data, error } = await supabase
    .from("avatar_tags")
    .select("tag")
    .eq("avatar_id", avatar_id);

  if (data)
    return data.map((tag: any) => ({
      tag: tag.tag,
    }));
  else {
    return null;
  }
}

async function getAvatar(avatar: number) {
  const { data, error } = await supabase
    .from("avatars")
    .select()
    .eq("id", avatar)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Avatar not found");
  }
};