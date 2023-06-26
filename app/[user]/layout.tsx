import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabBar from "@/components/user/TabBar";

export default function Layout(props: any) {
  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
