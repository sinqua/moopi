import Footer from "@/components/basic-layout/Footer";
import TabBar from "@/components/user/TabBar";
import { Suspense } from "react";

export default function Layout(props: any) {
  return (
    <>
      <Suspense fallback={"User Children is loading"}>{props.children}</Suspense>
      <TabBar />
      <Suspense fallback={"Info is loading"}>{props.info}</Suspense>
      <Footer />
      {props.modal}
    </>
  );
}
