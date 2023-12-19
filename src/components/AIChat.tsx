import { useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loading";
import { KeywordResources, ViewResources } from "./resources";

export default function AIChat(props: {isSignedIn: boolean}) {
    interface resourceType {
        id?: string,
        name?: string,
        description?: string,
        benefit?: string
    }

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
                    benefit: data.relevantResources[i]?.providedBenefit
                }
                resources.push(resource);
                setResources(resources);
            }
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
                        setSelectedButton([true, false, false]);
                    }}
                    disabled={selectedButton[0]}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 disabled:bg-gray-600 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                    AI Matches
                </button>
                <button 
                    type="button" 
                    onClick={() => setSelectedButton([false, true, false])}
                    disabled={selectedButton[1]}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 disabled:bg-gray-600 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                    Keyword Search
                </button>
                <button 
                    type="button" 
                    onClick={() => {
                        setSelectedButton([false, false, true]);
                    }}
                    disabled={selectedButton[2]}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 disabled:bg-gray-600 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                    Pinned Resources
                </button>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-4 justify-center">
            <div>Ask the AI:</div>
            <form onSubmit={(e)=> {
                e.preventDefault();
                setUserMessage(prompt);
                setResources([]);
                sendPrompt({ prompt });
            }}>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="text" 
                        placeholder={props.isSignedIn ? "Find a resource!" : "Sign up for free to use AI search!"}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={ props.isSignedIn ? false : true }
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SEND</button>
                </div>
            </form>

            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {userMessage}
                </div>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center justify-center">
                    {!isLoading ? aiMessage : (<LoadingSpinner size={36} />)}
                </div>
            </div>

            <div className="flex flex-col gap-8 items-center">
                <ButtonGroup />
                {selectedButton[0] && <ViewResources resources={resources} />}
                {selectedButton[1] && <KeywordResources userMessage={userMessage} />}
            </div>
        </div>
    )
}
