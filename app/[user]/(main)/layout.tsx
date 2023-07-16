import Footer from "@/components/basic-layout/Footer";
import TabBar from "@/components/user/TabBar";

export default function Layout(props: any) {
  return (
    <>
      {props.children}
      <TabBar />
      {props.info}
      <Footer />
      {props.modal}
    </>
  );
}
