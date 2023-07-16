'use client'
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {

    return (
    <div className="flex h-[30vh] items-center align-middle">
        <ClipLoader color={"#2778C7"} loading={true} size={50} />
    </div>
    )
}