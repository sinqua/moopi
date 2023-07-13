"use client";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession, signOut } from "next-auth/react";

export default function Loading() {

  
  const { data: session, status } = useSession();


  useEffect(() => {
    console.log("session", session);
    console.log("status", status);
  }, []);

  return (
    <div className="flex h-screen items-center align-middle">
      <ClipLoader color={"#2778C7"} loading={true} size={50} />
    </div>
  );
}
