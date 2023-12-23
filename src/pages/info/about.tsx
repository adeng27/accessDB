import Link from "next/link";
import Layout from "~/components/layout";

export default function About() {
    return (
        <Layout>
            <div className="h-fit min-h-screen flex flex-col items-center gap-12">
                <h1 className="text-3xl font-extrabold">About</h1>
                <div className="max-w-3xl flex flex-col gap-8">
                    <p>
                        Thanks for using Access DB! This site was created by Alastair Deng with input from Michael Liu. 
                        Through a class focused on designing solutions for those with disabilities, we learned that finding 
                        disability resources is incredibly hard, so we created Access DB! If you have questions that aren't 
                        answered <Link href="/info/questions" className="text-blue-500 hover:underline">here</Link>, feel 
                        free to email <span className="underline">adeng27@stanford.edu</span>!
                    </p>
                    <p>
                        Follow Alastair Deng on <Link href="https://github.com/adeng27" target="_blank" className="text-blue-500 hover:underline">Github</Link>
                        , <Link href="https://www.linkedin.com/in/alastair-deng/" target="_blank" className="text-blue-500 hover:underline">LinkedIn</Link>, 
                        and <Link href="https://www.instagram.com/alastairdeng/?hl=en" target="_blank" className="text-blue-500 hover:underline">Instagram</Link>
                    </p>
                    <p>
                        Follow Michael Liu on <Link href="#" className="text-blue-500 hover:underline">LinkedIn</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}