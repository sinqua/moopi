'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// loading hero image need for login page

export default function LoginPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const LOGIN_CODE = searchParams.get('code');

    const requestUser = async (platform: any) => {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/oauth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "platform": platform,
                "code": LOGIN_CODE,
            }),
        });
        const data = await res.json();

        console.log(data);

        // setCookie('user', data.USER_ID, {path: '/'})

        if(res.status === 200)
            router.push(`/`);
    }

    useEffect(() => {
        console.log(LOGIN_CODE)
        if(LOGIN_CODE) {
            
            if(pathname.includes("kakao")) {
                console.log("카카오 로그인 완료");
                requestUser("kakao");

            } else if(pathname.includes("discord")) {
                console.log("디스코드 로그인 완료");
                requestUser("discord");
                
            } else if(pathname.includes("twitter")) {
                console.log("트위터 로그인 완료");
                requestUser("twitter");
            }
        }
    }, [LOGIN_CODE]);


    return (
        <div>
            <h1>Login Page</h1>
        </div>
    )
}