// "use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { ProfileImage } from "@/components/edit/profileCard/profileImage";
import { Nickname } from "@/components/edit/profileCard/nickname";
import { Description } from "@/components/edit/profileCard/description";
import { Tag } from "@/components/edit/profileCard/tag";
import dynamic from "next/dynamic";

import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";

import Upload from "@/components/upload/Upload";

const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs-full`;

export default async function Page({ params }: { params: { user: string } }) {
  const mostUsedTags = await getMostUsedTags();

  return (
    <>
      <Upload IframeUrl={IframeUrl} mostUsedTags={mostUsedTags}/>
    </>
  );
}


const getMostUsedTags = async () => {
  const { data, error } = await supabase
  .from("tags")
  .select("*", { count: "exact" });

  const countByGroupTag : any = {};
  data!.forEach(row => {
    const tag = row.tag;
    if (countByGroupTag[tag]) {
      countByGroupTag[tag]++;
    } else {
      countByGroupTag[tag] = 1;
    }
  });
  const countArray = Object.entries(countByGroupTag);
  countArray.sort((a: any, b: any) => b[1] - a[1]);

  const slicedCountByGroupTag = Object.fromEntries(countArray.slice(0, 5));

  const options = Object.keys(slicedCountByGroupTag).map((tag: any) => {
    return { value: tag, label: tag };
  })

  return options;
};