import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Footer from "@/components/basic-layout/Footer";

export default async function Layout(props: any) {
  const session = await getServerSession(authOptions);

  if (session!.user.id !== props.params.user) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      {props.children}
      <Footer />
    </>
  );
}
