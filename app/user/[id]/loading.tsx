import Image from "next/image"

export default function Loading() {
    console.log("Loading")

    return (
        <Image src='/loginBackground.png' alt="" width={300} height={300}/>
    )
}