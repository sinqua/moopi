import Header from "@/components/Header";
import Footer from "@/components/Footer";

import UserPage from "./page";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-col items-center h-auto min-h-full">
        <Header />
        {children}
        <Footer />
      </div>
  );
}
