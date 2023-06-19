import Navbar from "@/components/edit/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center w-full h-auto min-h-full">
        <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] sm:space-y-[60px] space-y-[40px] text-[#333333] text-[14px]">
          <Navbar />
          <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
