import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabBar from "@/components/user/TabBar";

export default function Layout(props: any) {
  return (
    <>
      {props.profile}
      <TabBar />
      {props.children}
    </>
  );
}
