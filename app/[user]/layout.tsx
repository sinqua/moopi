import Header from "@/components/Header";

export default function Layout(props: any) {
  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      <Header />
      {props.children}
    </div>
  );
}
