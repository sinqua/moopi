"use client";
import Image from "next/image";
import background from "@/app/assets/images/loginBackground.png";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  console.log(error);

  return (
    <div>
    <Image src={background} alt=""/>
    ERROR!
    </div>

  );
}
