import Head from "next/head";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api, RouterOutputs } from "~/utils/api";
import { useState } from "react";

export default function Home() {
  const { data: allResources } = api.resource.getAll.useQuery();
  const { data: allCriteria } = api.criteria.getAll.useQuery();
  const user = useUser();

  type CriteriaObj = RouterOutputs["criteria"]["getAll"][number];
  const CriteriaView = (props: CriteriaObj) => {
    const { id, requirement } = props;
    
    const handleClick = (specificReq: string) => {
      const newReqs = newFilterCriteria.requirements;
      if (newReqs.includes(specificReq))  newReqs.splice(newReqs.indexOf(specificReq), 1)
      else                                newReqs.push(specificReq);
      setNewFilterCriteria({
        requirements: newReqs
      })
    }

    return (
      <div key={id}>
        <button id={requirement} onClick={() => handleClick(requirement)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{requirement}</button>
      </div>
    )
  }

  type ResourceObj = RouterOutputs['resource']['getAll'][number];
  const ResourceView = (props: ResourceObj) => {
    const { id, name } = props;
    return (
      <div key={id}>
        {name}
      </div>
    )
  }

  const [newFilterCriteria, setNewFilterCriteria] = useState({
    requirements: [""]
  })

  const NewResourceList = (props: {requirements : string[]}) => {

    type foundResourcesType = RouterOutputs["criteria"]["findResources"]
    const organizeResources = ( resourceList: foundResourcesType ) => {
      const organizedObj: {[key: string] : number} = {};
      resourceList?.map((resource) => (
        resource.resources?.map((actualResource) => (
          organizedObj[actualResource.name] ? organizedObj[actualResource.name] += 1 : organizedObj[actualResource.name] = 1
        ))
      ))
  
      const sortedResources = Object.entries(organizedObj)
        .sort((a, b) => b[1] - a[1]) // Sort in descending order by count
        .map(([resource]) => resource); // Extract keys (resources) after sorting
  
      return sortedResources;
    }

    const { data: filteredWithCriteria } = api.criteria.findResources.useQuery(props);
    let resourceNames: string[] = [];
    if (typeof filteredWithCriteria !== "undefined") {
      resourceNames = organizeResources(filteredWithCriteria);
    } 
    
    return (
      <div>
        <h1 className="text-xl font-bold">Filtered By Criteria: </h1>
        <div className="flex flex-col items-center">
          {
            resourceNames.map((resourceName) => (
              <div key={resourceName}>
                {resourceName}
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full border-x w-full md:max-w-2xl flex flex-col items-center gap-4">
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <div className="flex flex-col items-center">
            {allCriteria?.map((oneCriteria) => (
              <CriteriaView {...oneCriteria} key={oneCriteria.id} />
            ))}
          </div>
          <div>
              <h1 className="text-xl font-bold">Available Resources:</h1>
              <div className="flex flex-col items-center">
                {allResources?.map((resource) => (
                  <ResourceView {...resource} key={resource.id} />
                ))}
              </div>
          </div>
          <div>
            <NewResourceList {...newFilterCriteria} />
          </div>
        </div>
      </main>
    </>
  );
}
