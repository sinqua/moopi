import { CreateImageUrl } from "@/lib/storage";
import { useRef, useState } from "react";

export default function useInputProfileImage(props: any) {
    const { session, imgRef, setImgFile } = props;
    const [profileImage, setProfileImg] = useState<any>(null);

    const getUserProfileImage = async () => {
        await fetch('/api/user/image', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": session?.user.id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.body.profile.image) {
                CreateImageUrl(data.body.profile.image).then((url) => {
                    setProfileImg(url!.signedUrl);
                });
            }
            else {
                setProfileImg(data.body.auth.image);
            }

        });
    } 

    const loadImgFile = () => {
        const file = imgRef.current.files[0];
        setImgFile(imgRef.current.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
    };

    return { profileImage, getUserProfileImage, loadImgFile };
}