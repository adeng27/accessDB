import { useEffect, useState } from "react";
import { api } from "~/utils/api"
import { LoadingSpinner } from "./loading";

export const ResourceCard = (props: {id: string | undefined, name: string | undefined, description: string | undefined, reqs: string | undefined , benefit: string | undefined}) => {
    const { mutate: pin } = api.resource.pin.useMutation({
        onSuccess: (data) => {
            if (data) setPinMessage(true)
            else setPinMessage(false)
            isPinned = pinMessage;
        }
    });
    let { data: isPinned, isLoading } = api.resource.isPinned.useQuery(props.id ? props.id : "");
    const [ pinMessage, setPinMessage ] = useState(isPinned);
    
    useEffect(() => {
        if (typeof isPinned !== "undefined") setPinMessage(isPinned);
    }, [isLoading, isPinned])

    return (
        <div>
            <a className="flex flex-col gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name ? props.name : "Something went wrong"}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.description ? props.description : "Something went wrong"}</p>
                <p className="font-extrabold text-gray-700 dark:text-gray-400">{props.reqs ? props.reqs : "Something went wrong"}</p>
                <p className="font-extrabold text-gray-700 dark:text-gray-400">{props.benefit ? props.benefit : "Something went wrong"}</p>
                <div className="flex justify-center">
                    <button 
                        type="button" 
                        onClick={() => {
                            if (props.id) {
                                pin(props.id);
                            }
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        { isLoading && <LoadingSpinner /> }
                        { !pinMessage && !isLoading && "Pin" }
                        { !!pinMessage && "Unpin" }
                    </button>
                </div>
            </a>
        </div>
    )
}