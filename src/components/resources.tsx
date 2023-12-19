import { useState } from "react";
import { ResourceCard } from "./card";

interface resourceType {
    id?: string,
    name?: string,
    description?: string,
    benefit?: string
}

export default function ViewResources(props: {resources: resourceType[]}) {
    const { resources } = props;
    const [startResource, setStartResource] = useState(0);

    return (
        <div className="flex justify-center gap-8">
                <div className="flex items-center justify-center">
                    <button 
                        type="button" 
                        onClick={() => setStartResource(startResource - 4)} 
                        disabled={startResource === 0}
                        className="text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800 disabled:bg-slate-700"
                    >
                        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                        </svg>
                        Go back
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex justify-center gap-8">
                        {resources.map((resource, index) => ( (index % 2 !== 0 && index < startResource + 4 && index >= startResource) &&
                            <ResourceCard 
                                name={resource.name} 
                                description={resource.description}  
                                benefit={resource.benefit}
                                key={resource.id}
                            />))}
                    </div>
                    <div className="flex justify-center gap-8">
                        {resources.map((resource, index) => ( (index % 2 === 0 && index < startResource + 4 && index >= startResource) &&
                            <ResourceCard 
                                name={resource.name} 
                                description={resource.description}  
                                benefit={resource.benefit}
                                key={resource.id}
                            />))}
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="button" 
                        onClick={() => setStartResource(startResource + 4)} 
                        disabled={startResource === resources.length - 4}
                        className="text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800 disabled:bg-slate-700"
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