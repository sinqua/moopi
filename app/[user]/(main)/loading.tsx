"use client";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {

  console.log("(main), loading.tsx")
  return (
    <div className="flex h-screen items-center align-middle">
      <ClipLoader color={"#2778C7"} loading={true} size={50} />
    </div>
  );
}
