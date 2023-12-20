import { useUser } from "@clerk/nextjs"
import { Navbar } from "./navbar"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = useUser();

    return (
        <div>
            <Navbar isSignedIn={user.isSignedIn ? user.isSignedIn : false} />
            <section>{children}</section>
        </div>
    )
  }