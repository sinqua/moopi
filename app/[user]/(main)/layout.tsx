import Footer from "@/components/basic-layout/Footer";
import TabBar from "@/components/user/TabBar";

export default function Layout({
  children,
  info,
  modal,
}: {
  children: React.ReactNode;
  info: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TabBar />
      {info}
      <Footer />
      {modal}
    </>
  );
}
