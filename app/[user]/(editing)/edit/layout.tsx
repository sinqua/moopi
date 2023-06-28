import Navbar from "@/components/edit/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] sm:space-y-[60px] space-y-[40px] text-[#333333] text-[14px]">
      <Navbar />
      {children}
    </div>
  );
}
