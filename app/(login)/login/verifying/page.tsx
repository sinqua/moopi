'use client';
import { useEffect } from "react";
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { signIn, signOut, useSession } from 'next-auth/react'

export default function VerifyingPage() {
    const router = useRouter();

    const searchParams = useSearchParams()
    const callbackUrl = ("/join?callbackUrl=" + searchParams.get('callbackUrl')) as string

    const {data: session, status} = useSession();

    useEffect(() => {
        if(status !== "loading") {
            if(session?.user.nickname) {
                console.log("있음");
                // console.log(searchParams.get('callbackUrl'));
                router.push(searchParams.get('callbackUrl') ?? "/");
            }
            else {
                console.log("없음");
                router.push(callbackUrl);
            }

        }
    }, [session, status]);

    return (
        <div className="w-full h-full">
            확인중
        </div>
    );
}
