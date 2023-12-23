import { useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loading";
import { AIResources, KeywordResources, PinnedResources } from "./resources";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AIChat(props: {isSignedIn: boolean}) {
    interface resourceType {
        id?: string,
        name?: string,
        description?: string,
        reqs?: string,
        benefit?: string
    }

    const [isError, setIsError] = useState(false);

    const {mutate: sendPrompt, isLoading} = api.openai.chatCompletion.useMutation({
        onSuccess: (data) => {
            const messageContent = data.response.choices[0]?.message.content;
            typeof messageContent === "string" ? setAiMessage(messageContent) : setAiMessage("something went wrong")

            //Init resources for cards
            for (let i = 0; i < data.relevantResources.length; i++) {
                const resource: resourceType = {
                    id: data.relevantResources[i]?.id,
                    name: data.relevantResources[i]?.name,
                    description: data.relevantResources[i]?.description,
                    reqs: data.relevantResources[i]?.reqs,
                    benefit: data.relevantResources[i]?.providedBenefit
                }
                resources.push(resource);
                setResources(resources);
            }
        },
        onError: () => {
            toast.error("Query failed, please try again later!");
            setIsError(true);
            setAiMessage("");
        }
    });
    const [prompt, setPrompt] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [aiMessage, setAiMessage] = useState("");

    const resourcesInit: resourceType[] = [];
    const [resources, setResources] = useState(resourcesInit);

    const [selectedButton, setSelectedButton] = useState([true, false, false]);

    const ButtonGroup = () => {
        return (
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button 
                    type="button" 
                    onClick={() => {
                        if (props.isSignedIn) setSelectedButton([true, false, false]);
                        else toast.error("Please sign in!")
                    }}
                    className="px-4 py-2 text-sm font-medium border rounded-s-lg disabled:bg-gray-600 focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
                >
                    AI Matches
                </button>
                <button 
                    type="button" 
                    onClick={() => {
                        if (props.isSignedIn) setSelectedButton([false, true, false]);
                        else toast.error("Please sign in!")
                    }}
                    className="px-4 py-2 text-sm font-medium border-t border-b  disabled:bg-gray-600  focus:z-10 focus:ring-2  bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
                >
                    Keyword Search
                </button>
                <button 
                    type="button" 
                    onClick={() => {
                        if (props.isSignedIn) setSelectedButton([false, false, true]);
                        else toast.error("Please sign in!")
                    }}
                    className="px-4 py-2 text-sm font-medium border rounded-e-lg disabled:bg-gray-600 focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
                >
                    Pinned Resources
                </button>
            </div>
        )
    }

    const [numResources, setNumResources] = useState(2)

    const FailMessage = () => {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <div>
                    Something went wrong! Common issues are not being signed in, sending an empty prompt, or sending
                    too many queries in too short of a timeframe. See our <Link href="/info/questions" className="text-blue-500 hover:underline">Questions</Link> page
                    for details on how many queries you can send. Otherwise, the issue could be on the server side, which
                    could be solved by simplifying the AI response or writing a more specific query.
                </div>
                <button  
                    type="button"
                    onClick={() => {
                        if (numResources === 2) setNumResources(1);
                        else (setNumResources(2))
                    }}
                    className="text-xs flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    {numResources === 2 && "Simplify response"}
                    {numResources !== 2 && "Response simplified"}
                </button>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-4 justify-center">
            <div>
                <h3 className="">Ask the AI:</h3>
            </div>
            <form onSubmit={(e)=> {
                e.preventDefault();
                setUserMessage(prompt);
                setResources([]);
                setIsError(false);
                if (prompt !== "") {
                    sendPrompt({ prompt, numResources });
                } else {
                    toast.error("Empty prompt!");
                    setAiMessage("");
                    setIsError(true);
                }
            }}>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="text" 
                        placeholder={props.isSignedIn ? "Find a resource!" : "Sign up for free to use AI search!"}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={ props.isSignedIn ? false : true }
                        className="block w-full p-4 ps-10 text-sm  border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button type="submit" onClick={() => {
                        if (!props.isSignedIn) toast.error("Please sign in!")
                    }} className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">SEND</button>
                </div>
            </form>

            <div className="w-full p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
                <div className='mb-2 text-2xl font-bold tracking-tight text-white'>
                    {userMessage}
                </div>
                <div className="mb-3 font-normal text-gray-400 flex items-center justify-center">
                    {!isLoading ? aiMessage : (<LoadingSpinner size={36} />)}
                    {isError && <FailMessage />}
                </div>
            </div>

            <div className="flex flex-col gap-8 items-center">
                <ButtonGroup />
                {selectedButton[0] && <AIResources resources={resources} />}
                {selectedButton[1] && <KeywordResources userMessage={userMessage} />}
                {selectedButton[2] && <PinnedResources />}
            </div>
        </div>
    )
}
