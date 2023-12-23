import { useEffect, useState } from "react";
import { api } from "~/utils/api"
import { LoadingSpinner } from "./loading";
import toast from "react-hot-toast";

export const ResourceCard = (props: {id: string | undefined, name: string | undefined, description: string | undefined, reqs: string | undefined , benefit: string | undefined}) => {
    const { mutate: pin } = api.resource.pin.useMutation({
        onSuccess: (data) => {
            if (data) setPinMessage(true)
            else setPinMessage(false)
            isPinned = pinMessage;
        },
        onError: () => {
            toast.error("Something went wrong!")
        }
    });
    let { data: isPinned, isLoading } = api.resource.isPinned.useQuery(props.id ? props.id : "");
    const [ pinMessage, setPinMessage ] = useState(isPinned);
    
    useEffect(() => {
        if (typeof isPinned !== "undefined") setPinMessage(isPinned);
    }, [isLoading, isPinned])

    return (
        <div>
            <a className="flex flex-col md:gap-4 gap-2 max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700">
                <h5 className="md:text-2xl text-base font-bold tracking-tight text-white">{props.name ? props.name : "Something went wrong"}</h5>
                <p className="font-normal md:text-base text-xs text-gray-400">{props.description ? props.description : "Something went wrong"}</p>
                <p className="font-extrabold md:text-base text-xs text-gray-400">{props.reqs ? props.reqs : "Something went wrong"}</p>
                <p className="md:text-xl text-base font-extrabold text-gray-400">{props.benefit ? props.benefit : "Something went wrong"}</p>
                <div className="flex justify-center">
                    <button 
                        type="button" 
                        onClick={() => {
                            if (props.id) {
                                pin(props.id);
                            }
                        }}
                        className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
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