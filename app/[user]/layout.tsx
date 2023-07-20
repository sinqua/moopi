import HeaderCSR from "@/components/basic-layout/HeaderCSR";
import MenuButton from "@/components/basic-layout/MenuButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      <HeaderCSR>
        <MenuButton />
      </HeaderCSR>
      {children}
    </div>
  );
}
