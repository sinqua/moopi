import TabBar from "@/components/user/TabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center font-sans grow">
      {children}
    </div>
  );
}
