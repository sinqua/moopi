"use client";
import { UploadProfileImage, UploadBase64Image } from "@/lib/storage";
import { decode } from "base64-arraybuffer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default function useProfileHook() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [userDetail, setUserDetail] = useState<any>(null);

  const [page, setPage] = useState("프로필 카드");
  const [imgFile, setImgFile] = useState<any>(null);

  const [imgFiles, setImgFiles] = useState<any>([]);
  const [tempPaths, setTempPaths] = useState<any>([]);

  const [duplication, setDuplication] = useState(false);
  const [tags, setTags] = useState<any>([]);

  const inputNicknameRef = useRef<any>(null);
  const inputDescriptionRef = useRef<any>(null);

  const [htmlStr, setHtmlStr] = useState<any>(null);

  const getUserProfile = async () => {
    await fetch("/api/user/profile", {
      method: "POST",
      body: JSON.stringify({
        user_id: session?.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.body.user);

        setTags(
          data.body.user.tags.map((tag: any) => {
            return { value: tag.tag, label: tag.tag };
          })
        );
      });
  };

  const getUserDetail = async () => {
    await fetch("/api/user/detail", {
      method: "POST",
      body: JSON.stringify({
        user_id: session?.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data.body.detail);
      });
  };

  const onSaveProfileCard = async () => {
    if (status !== "loading") {
      if (!duplication) {
        if (imgFile) {
          var uuid = uuidv4();
          UploadProfileImage(session?.user.id, `${uuid}.png`, imgFile).then(
            async (data) => {
              await fetch("/api/profile/image", {
                method: "POST",
                body: JSON.stringify({
                  user_id: session?.user.id,
                  image: data?.path,
                }),
              })
                .then((res) => res.json())
                .then((data) => {});
            }
          );
        }

        await fetch("/api/profile/nickname", {
          method: "POST",
          body: JSON.stringify({
            user_id: session?.user.id,
            nickname: inputNicknameRef.current.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {});

        await fetch("/api/profile/description", {
          method: "POST",
          body: JSON.stringify({
            user_id: session?.user.id,
            description: inputDescriptionRef.current.value,
          }),
        })
          .then((res) => res.json())
          .then(async (profile) => {
            await fetch("/api/profile/tag/delete", {
              method: "POST",
              body: JSON.stringify({
                profile_id: profile.body.profile.id,
              }),
            })
              .then((res) => res.json())
              .then(async (data) => {
                await fetch("/api/profile/tag", {
                  method: "POST",
                  body: JSON.stringify({
                    profile_id: profile.body.profile.id,
                    tags: tags.map((tag: any) => {
                      return tag.value;
                    }),
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    router.push(`/user?id=${session?.user.id}`);
                  });
              });
          });
      } else {
        alert("이미 사용중인 닉네임입니다.");
      }
    }
  };

  const onSaveDescription = async () => {
    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadBase64Image(
            session?.user.id,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = data?.path;
          });
        } else {
          htmlStr.ops[i].insert.image = htmlStr.ops[i].insert.image
            .split("/image/")[1]
            .split("?")[0];
        }
      }
    }

    await fetch("/api/detail/description", {
      method: "POST",
      body: JSON.stringify({
        user_id: session?.user.id,
        description: JSON.stringify({ ...htmlStr.ops }),
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("success data", data);
        router.push(`/user?id=${session?.user.id}`);
      });
  };

  useEffect(() => {
    if (session) {
      getUserProfile();
      getUserDetail();
    }
  }, [session]);

  return {
    userInfo,
    setUserInfo,
    userDetail,
    setUserDetail,
    page,
    setPage,
    imgFile,
    setImgFile,
    imgFiles,
    setImgFiles,
    tempPaths,
    setTempPaths,
    duplication,
    setDuplication,
    tags,
    setTags,
    inputNicknameRef,
    inputDescriptionRef,
    htmlStr,
    setHtmlStr,
    onSaveProfileCard,
    onSaveDescription,
  };
}
