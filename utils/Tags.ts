import { supabase } from "@/lib/database";

export const getMostUsedTags = async () => {
    const { data, error } = await supabase
      .from("tags")
      .select("*", { count: "exact" });
  
    const countByGroupTag: any = {};
    data!.forEach((row) => {
      const tag = row.tag;
      if (countByGroupTag[tag!]) {
        countByGroupTag[tag!]++;
      } else {
        countByGroupTag[tag!] = 1;
      }
    });
    const countArray = Object.entries(countByGroupTag);
    countArray.sort((a: any, b: any) => b[1] - a[1]);
  
    const slicedCountByGroupTag = Object.fromEntries(countArray.slice(0, 5));
  
    const options = Object.keys(slicedCountByGroupTag).map((tag: any) => {
      return { value: tag, label: tag };
    });
  
    return options;
  };