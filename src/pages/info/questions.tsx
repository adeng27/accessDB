import Layout from "~/components/layout";

export default function Questions() {
    return (
        <Layout>
            <div className="h-fit min-h-screen flex flex-col items-center gap-12">
                <h1 className="text-3xl font-extrabold">Questions</h1>
                <div className="flex flex-col gap-8">
                    <IndividualQuestion 
                        question={"How does Access DB work?"} 
                        answer={"It uses GPT-3.5 Turbo with Vector Embeddings to return a well-formatted response that should recommend disability resources that might help!"}
                    />
                    <IndividualQuestion 
                        question={"Why can't I search anything?"} 
                        answer={"To access any of Access DB's features, you must log in, which is completely free. If you can type into the search bar but are getting an error, you most likely have sent too many queries."}
                    />
                    <IndividualQuestion 
                        question={"What do the AI Matches and Keyword Search filters do?"} 
                        answer={"AI Matches lists the top 8 most relevant resources in Access DB's database according to your question.\nKeyword Search finds all resources that contain the specific words of your question."}
                    />
                    <IndividualQuestion 
                        question={"Is Access DB free?"} 
                        answer={"Access DB is completely free as of now."}
                    />
                    <IndividualQuestion 
                        question={"How many queries can I send to Access DB?"} 
                        answer={"Users are currently limited to 3 queries per minute."}
                    />
                    <IndividualQuestion 
                        question={"Where do I post feature requests and bug reports?"} 
                        answer={"You can submit feedback by emailing adeng27@stanford.edu!"}
                    />
                </div>
            </div>
        </Layout>
    )
}

export const IndividualQuestion = (props: {question: string, answer: string}) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base">{props.question}</h3>
            <p className="text-sm max-w-3xl">{props.answer}</p>
        </div>
    )
}