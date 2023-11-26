import Head from "next/head";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api, RouterOutputs } from "~/utils/api";

export default function Home() {
  const { data: allResources } = api.resource.getAll.useQuery();
  const { data: allCriteria } = api.criteria.getAll.useQuery();
  const user = useUser();

  interface testPropType {
    requirement: string;
  }
  const testProp = {
    requirement: "blindness"
  }



  type CriteriaObj = RouterOutputs["criteria"]["getAll"][number];
  const CriteriaView = (props: CriteriaObj) => {
    const { id, requirement } = props;
    const handleClick = (requirement: string) => {
      
    }

    return (
      <div key={id}>
        <button id={requirement} onClick={() => handleClick(requirement)}>{requirement}</button>
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

  const ResourceList = (props: testPropType) => {
    const { requirement } = props
    const { data: filteredWithCriteria } = api.criteria.filterResources.useQuery({ requirement });

    return (
      <div>
        <h1>Filtered By Criteria</h1>
        <div>
          {filteredWithCriteria?.resources.map((resource) => (
            <ResourceView {...resource} key={resource.id} />
          ))}
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
        <div className="h-full border-x w-full md:max-w-2xl">
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>

          {/* <div>
            {allResources?.map((resource1) => (<div key={resource1.id}>{resource1.name}</div>))}
          </div>
          <div>
            {filterStatus === "loading" && <div>Is loading...</div>}
            {filteredResources?.map((resource) => (<div key={resource.id}>{resource.description}</div>))}
          </div> */}

          <div>
            {allCriteria?.map((oneCriteria) => (
              <CriteriaView {...oneCriteria} key={oneCriteria.id} />
            ))}
          </div>
          <div>
              <h1>Available Resources:</h1>
              <div>
                {allResources?.map((resource) => (
                  <ResourceView {...resource} key={resource.id} />
                ))}
              </div>
          </div>
          <ResourceList {...testProp} />
        </div>
      </main>
    </>
  );
}
