export default function Layout(props: any) {
  return (
    <div className="relative flex flex-col items-center w-full grow sm:mt-0 mt-[20px]">
      {props.children}
    </div>
  );
}
