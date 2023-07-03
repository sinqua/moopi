import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout(props: any) {
  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      <Header />
      {props.children}
    </div>
  );
}
