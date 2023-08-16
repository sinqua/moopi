import { supabase } from "@/lib/database";
import { getMostUsedTags } from "@/utils/Tags";
import Upload from "@/components/change/Upload";

export const revalidate = 0;

export default async function Page({ params }: { params: { avatar: number }}) {
  const popularTagsData = getMostUsedTags();
  const tagsData = getTags(params.avatar);
  const avatarData = getAvatar(params.avatar);

  const [popularTags, tags, avatar] = await Promise.all([
    popularTagsData,
    tagsData,
    avatarData,
  ]);

  return <Upload popularTags={popularTags} tags={tags} avatar={avatar}/>;
}

async function getTags(avatar_id: number) {
  const { data, error } = await supabase
    .from("tags")
    .select()
    .eq("avatar_id", avatar_id);

  if (data)
    return data.map((tag: any) => ({
      label: tag.tag, value: tag.tag
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