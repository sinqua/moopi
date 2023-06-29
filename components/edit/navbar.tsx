'use client'
import useDrag from "@/app/hooks/dragHook";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export default function Navbar() {
    let { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

    const {data: session, status} = useSession();
    const pathname = usePathname();

    useEffect(() => {
        setMountedStatus(true);
    }, []);

    return (
        <div className="w-full max-w-[1372px] flex flex-col items-start sm:space-y-[30px] space-y-[20px]">
            <p className="sm:text-[30px] text-[20px] font-bold">프로필 수정</p>
            <div className="relative flex w-full h-[30px] sm:space-x-[70px] space-x-[20px] sm:text-[18px] text-[14px] whitespace-nowrap overflow-x-scroll scrollbar-hide"  {...dragEvents} ref={dragRef}>
                <Link href={`${session?.user.id}/edit/profile-card`} className={pathname.includes("profile-card") ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} >프로필 카드</Link>
                <Link href={`${session?.user.id}/edit/description`} className={pathname.includes("description") ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} >설명</Link>
                <Link href={`${session?.user.id}/edit/portfolio`} className={pathname.includes("portfolio") ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"}>포트폴리오</Link>
                <Link href={`${session?.user.id}/edit/price-info`} className={pathname.includes("price-info") ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} >가격정보</Link>
                <Link href={`${session?.user.id}/edit/bill`} className={pathname.includes("bill") ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} >결제수단</Link>
            </div>
        </div>
    );
}
