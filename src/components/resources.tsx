import { useEffect, useState } from "react";
import { ResourceCard } from "./card";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./loading";

interface resourceType {
    id?: string,
    name?: string,
    description?: string,
    reqs?: string,
    benefit?: string
}

export const ViewResources = (props: {resources: resourceType[]}) => {
    const { resources } = props;
    const [startResource, setStartResource] = useState(0);

    return (
        <div className="flex justify-center gap-8">
            <div className="flex items-center justify-center">
                <button 
                    type="button" 
                    onClick={() => setStartResource(startResource - 4)} 
                    disabled={startResource === 0}
                    className="text-white bg-blue-700 enabled:focus:ring-4 enabled:focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center enabled:bg-blue-600 enabled:hover:bg-blue-700 enabled:focus:ring-blue-800 disabled:bg-slate-700"
                >
                    <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                    </svg>
                    Go back
                </button>
            </div>
            {
                resources.length > 0 && 
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex justify-center gap-8">
                        {resources.map((resource, index) => ( (index % 2 !== 0 && index < startResource + 4 && index >= startResource) &&
                            <ResourceCard 
                                id={resource.id}
                                name={resource.name} 
                                description={resource.description} 
                                reqs={resource.reqs} 
                                benefit={resource.benefit}
                                key={resource.id}
                            />))}
                    </div>
                    <div className="flex justify-center gap-8">
                        {resources.map((resource, index) => ( (index % 2 === 0 && index < startResource + 4 && index >= startResource) &&
                            <ResourceCard 
                                id={resource.id}
                                name={resource.name} 
                                description={resource.description}  
                                reqs={resource.reqs}
                                benefit={resource.benefit}
                                key={resource.id}
                            />))}
                    </div>
                </div>
            }
            {
                resources.length === 0 && 
                <div className="flex justify-center items-center text-md font-bold text-red-500">
                    No resources found, please search something else!
                </div>
            }
            <div className="flex items-center justify-center">
                <button 
                    type="button" 
                    onClick={() => setStartResource(startResource + 4)} 
                    disabled={startResource >= resources.length - 4}
                    className="text-white bg-blue-700 enabled:focus:ring-4 enabled:focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center enabled:bg-blue-600 enabled:hover:bg-blue-700 enabled:focus:ring-blue-800 disabled:bg-slate-700"
                >
                    See more
                    <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export const KeywordResources = (props: {userMessage: string}) => {
    const { data: keywordResults, isLoading } = api.resource.keywordSearch.useQuery(props.userMessage);

    const readyResources = (arr: typeof keywordResults) => {
        if (typeof arr === "undefined") return;
        const temp: resourceType[] = [];
        for (let i = 0; i < arr.length; i++) {
            const resource: resourceType = {
                id: arr[i]?.id,
                name: arr[i]?.name,
                description: arr[i]?.description,
                reqs: arr[i]?.reqs,
                benefit: arr[i]?.providedBenefit
            }
            temp.push(resource);
        }
        return temp;
    }

    const [resources, setResources] = useState(readyResources(keywordResults))

    useEffect(() => {
        if (typeof keywordResults !== "undefined") setResources(readyResources(keywordResults));
    }, [props.userMessage, isLoading]);

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center text-lg font-bold">Keyword Search for "{props.userMessage}"</div>
            {isLoading && <LoadingSpinner size={64} />}
            {resources && <ViewResources resources={resources} />}
        </div>
    )
}

export const PinnedResources = () => {
    const { data: pinned, isLoading } = api.resource.findPinned.useQuery();

    if (typeof pinned === "undefined") return;
    const modifiedPinned: resourceType[] = [];
    for (let i = 0; i < pinned.length; i++) {
        const resource: resourceType = {
            id: pinned[i]?.id,
            name: pinned[i]?.name,
            description: pinned[i]?.description,
            reqs: pinned[i]?.reqs,
            benefit: pinned[i]?.providedBenefit
        }
        modifiedPinned.push(resource);
    }
    
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center text-lg font-bold">Your Pinned Resources</div>
            {isLoading && <LoadingSpinner size={64} />}
            {pinned && <ViewResources resources={modifiedPinned} />}
        </div>
    )
}

export const AIResources = (props: {resources: resourceType[]}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center text-lg font-bold">Relevant Resources from AI Search</div>
            <ViewResources resources={props.resources} />
        </div>
    )
}