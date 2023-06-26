import Link from "next/link";

export default function Page(props: any) {
    console.log(props)
  return (
    <div>
      descript
      {props.params.user}
    </div>
  );
}
