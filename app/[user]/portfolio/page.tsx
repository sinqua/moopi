import Link from "next/link";

export default function Page(props: any) {
    console.log(props)
  return (
    <div>
      portfolio
      {props.params.user}
    </div>
  );
}
