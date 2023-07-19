import Footer from "@/components/basic-layout/Footer";
import TabBar from "@/components/user/TabBar";
import { Suspense } from "react";

export default function Layout(props: any) {
  return (
    <>
      <Suspense>{props.children}</Suspense>
      <TabBar />
      <Suspense>{props.info}</Suspense>
      <Footer />
      {props.modal}
    </>
  );
}
