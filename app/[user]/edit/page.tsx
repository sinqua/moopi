// "use client";
import { useSession } from "next-auth/react";
import useProfileHook from "./hook";
import Image from "next/image";

import { ProfileImage } from "@/components/edit/profileCard/profileImage";
import { Nickname } from "@/components/edit/profileCard/nickname";
import { Description } from "@/components/edit/profileCard/description";
import { Tag } from "@/components/edit/profileCard/tag";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { Avatar } from "@/components/edit/profileCard/avatar";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";
import ProfileCard from "@/components/edit//profileCard/profileCard";
import { Modal } from "@/components/edit/modal";

// const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <> 
      zzz
    </>
  );
}