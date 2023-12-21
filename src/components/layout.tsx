import { useUser } from "@clerk/nextjs"
import { Navbar } from "./navbar"
import Footer from "./footer";

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = useUser();

    return (
        <div className="flex flex-col gap-8">
            <Navbar isSignedIn={user.isSignedIn ? user.isSignedIn : false} />
            <section>{children}</section>
            <Footer />
        </div>
    )
  }