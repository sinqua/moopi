import Footer from "@/components/basic-layout/Footer";
import TabBar from "@/components/user/TabBar";

export default function Layout(props: any) {
  return (
    <>
      {props.profile}
      <TabBar />
      {props.children}
      <Footer />
      {props.modal}
    </>
  );
}
