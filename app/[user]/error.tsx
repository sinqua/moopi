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

  return (
    <Image src={background} alt=""/>
  );
}
