'use client';
import { UploadModel } from "@/lib/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useProfileHook() {
    const router = useRouter();
    const {data: session, status, update} = useSession();

    const [userInfo, setUserInfo] = useState<any>(null);
    const [page, setPage] = useState("설명");
    const [imgFile, setImgFile] = useState<any>(null);
    const [duplication, setDuplication] = useState(false);
    const [tags, setTags] = useState<any>([]);

    const inputNicknameRef = useRef<any>(null);
    const inputDescriptionRef = useRef<any>(null);
    const inputTagRef = useRef<any>(null);

    const getUserProfile = async () => {
        await fetch('/api/user/profile', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": session?.user.id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setUserInfo(data.body.user);
        });
    }

    const onSubmit = async () => {
        if (status !== "loading") {
            if (!duplication) {
                if (imgFile) {
                    UploadModel(session?.user.id, imgFile.name, imgFile).then(async (data) => {
                        await fetch('/api/profile/image', {
                            method: 'POST',
                            body: JSON.stringify({
                                "user_id": session?.user.id,
                                "image": data?.path
                            })
                        })
                        .then((res) => res.json())
                        .then((data) => {
        
                        });
                    });
                }

                await fetch('/api/profile/nickname', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": session?.user.id,
                        "nickname": inputNicknameRef.current.value
                    })
                })
                .then((res) => res.json())
                .then((data) => {

                });

                await fetch('/api/profile/description', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": session?.user.id,
                        "description": inputDescriptionRef.current.value
                    })
                })
                .then((res) => res.json())
                .then(async (profile) => {
                    await fetch('/api/profile/tag/delete', {
                        method: 'POST',
                        body: JSON.stringify({
                            "profile_id": profile.body.profile.id,
                        })
                    })
                    .then((res) => res.json())
                    .then(async (data) => {
                        await fetch('/api/profile/tag', {
                            method: 'POST',
                            body: JSON.stringify({
                                "profile_id": profile.body.profile.id,
                                "tags": tags
                            })
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            router.push(`/user?id=${session?.user.id}`)
                        });
                    });
                });
            }
            else {
                alert("이미 사용중인 닉네임입니다.");
            }
        }
    }

    useEffect(() => {
        if(session) {
            getUserProfile();
        }
    }, [session]);

    return { userInfo, setUserInfo, page, setPage, imgFile, setImgFile, duplication, setDuplication, tags, setTags, inputNicknameRef, inputDescriptionRef, inputTagRef, onSubmit };
}