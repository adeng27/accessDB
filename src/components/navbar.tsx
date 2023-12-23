import { SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"

export const Navbar = (props: {isSignedIn: boolean}) => {
    return (
        <div>
          <nav className="border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                  <Image src={"/logo.png"} width={500} height={500} className="h-16 w-16" alt="Access DB Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Access DB</span>
              </Link>
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center justify-center md:hidden" aria-controls="navbar-default" aria-expanded="false">
                  { !props.isSignedIn && 
                        <SignInButton>
                          <button type="button" className="flex items-center justify-center text-white focus:outline-none focus:ring-4 font-medium rounded-full text-xs p-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign In</button>
                        </SignInButton> }
                  { !!props.isSignedIn && <UserButton /> }
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                  <li>
                    <Link href="/info/about" className="h-8 block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">About</Link>
                  </li>
                  <li>
                    <Link href="/info/questions" className="h-8 block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Questions</Link>
                  </li>
                  <li>
                      { !props.isSignedIn && 
                        <SignInButton>
                          <button type="button" className="h-8 flex items-center justify-center text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign In</button>
                        </SignInButton> }
                      { !!props.isSignedIn && <UserButton /> }
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    )
}