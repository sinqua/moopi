import useDrag from "@/app/hooks/dragHook";

interface NavbarProps {
    page: any;
    setPage: any;
}

export const Navbar = (props: NavbarProps) => {
    const { page, setPage } = props;
    const { dragRef, dragEvents } = useDrag();

    return (
        <div className="w-full flex flex-col items-start sm:space-y-[30px] space-y-[20px]">
            <p className="sm:text-[30px] text-[20px] font-bold">프로필 수정</p>
            <div className="relative flex w-full h-[30px] sm:space-x-[70px] space-x-[20px] sm:text-[18px] text-[14px] whitespace-nowrap overflow-x-scroll scrollbar-hide" {...dragEvents} ref={dragRef}>
                <div className={page === "프로필 카드" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("프로필 카드")}>프로필 카드</div>
                <div className={page === "설명" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("설명")}>설명</div>
                <div className={page === "포트폴리오" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("포트폴리오")}>포트폴리오</div>
                <div className={page === "가격정보" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("가격정보")}>가격정보</div>
                <div className={page === "결제수단" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("결제수단")}>결제수단</div>
            </div>
        </div>
    );
}
