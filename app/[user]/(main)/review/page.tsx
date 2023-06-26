import Link from "next/link";

export default function Page(props: any) {
  return (
    <div>
      review
      {props.params.user}
    </div>
  );
}
