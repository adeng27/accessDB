import Head from "next/head";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api, RouterOutputs } from "~/utils/api";
import { useState } from "react";

//grants already added to db
// const grants = [
//   {
//     name: 'Able Kidz',
//     description: 'Educational trust supporting disabled children and young people under 18 in the UK. Provides specialist equipment, computers, software, and extra tuition for independence and self-reliance.',
//     providedBenefit: 'Specialist equipment, computers, software, extra tuition'
//   },
//   {
//     name: 'AFK (Action for Kids)',
//     description: 'Supports disabled children and young people up to 26 years old to develop mobility, personal, and independent living skills. Supplies various mobility equipment not available through the NHS.',
//     providedBenefit: 'Mobility equipment, independent living skills support'
//   },
//   {
//     name: 'BBC Children in Need - Emergency Essentials',
//     description: 'Supports struggling families with children\'s basic needs such as beds, cookers, clothing, or essential items for children and young people under 18 in the UK.',
//     providedBenefit: 'Basic needs support'
//   },
//   {
//     name: 'Boparan Charitable Trust',
//     description: 'Helps disadvantaged children and young people under 18 in the UK due to poverty, disability, or terminal illness. Provides funding for items like wheelchairs, sensory books, toys, and special wishes.',
//     providedBenefit: 'Funding for essential items, toys, sensory books'
//   },
//   {
//     name: 'Buttercup Children\'s Trust',
//     description: 'Supports children and families affected by serious and terminal illnesses by providing financial assistance for hospital travel, respite, medical equipment, and more.',
//     providedBenefit: 'Financial assistance, medical equipment support'
//   },
//   {
//     name: 'Buttle UK',
//     description: 'Helps children and young people in crisis or facing financial hardship by offering grants up to £2,000 for essential items like laptops, clothing, and household items.',
//     providedBenefit: 'Grants for essential items, financial support'
//   },
//   {
//     name: 'Caudwell Children',
//     description: 'Provides family support, equipment, treatment, therapies, and specialized sports equipment to disabled children and their families in the UK.',
//     providedBenefit: 'Family support, specialized equipment, therapies'
//   },
//   {
//     name: 'Child Brain Injury Trust',
//     description: 'Offers small grants to children with acquired brain injuries and their siblings for social activities like dance or music lessons.',
//     providedBenefit: 'Grants for social activities'
//   },
//   {
//     name: 'Children Today',
//     description: 'Helps disabled children and young people up to 25 years old by providing grants for specialist equipment such as communication aids, educational toys, and wheelchairs.',
//     providedBenefit: 'Grants for specialist equipment'
//   },
//   {
//     name: 'Children\'s Heart Federation',
//     description: 'Provides information, practical support, and grants towards specialist equipment for children with congenital and acquired heart conditions.',
//     providedBenefit: 'Information, practical support, equipment grants'
//   },
//   {
//     name: 'Colouring Books for Kids',
//     description: 'Provides positive images of children with additional needs through coloring books.',
//     providedBenefit: 'Positive images, coloring books'
//   },
//   {
//     name: 'The Children\'s Hope Foundation',
//     description: 'Aims to improve the lives of children affected by illness, disability, or poverty by funding various items or experiences that benefit the child, such as medical equipment or holidays.',
//     providedBenefit: 'Funding for beneficial items, experiences'
//   },
//   {
//     name: 'CHIPS',
//     description: 'Provides specialized powered wheelchairs for children with disabilities, not provided by the NHS.',
//     providedBenefit: 'Specialized powered wheelchairs'
//   },
//   {
//     name: 'Crackerjacks Children\'s Trust',
//     description: 'Offers grants for specialized equipment and has a respite home for disabled children and young people.',
//     providedBenefit: 'Grants for specialized equipment, respite home'
//   },
// {
//     name: "Big Dream Trust",
//     description: "Big Dream Trust offers grants to improve the lives of vulnerable children, young people, and adults in the UK. It provides financial support for various purposes such as Makaton lessons, respite for parents and carers, sensory toys, one-to-one football training, food vouchers, and book bundles.",
//     providedBenefit: "Financial assistance for a range of needs including educational, recreational, and essential items for both children and adults with disabilities or special needs."
//   },
//   {
//     name: "The Elifar Foundation",
//     description: "The Elifar Foundation funds specialized equipment and respite for children and adults with physical or learning disabilities. It provides items like wheelchairs, beds, specialized seating, communication aids, sensory equipment, and specialized holidays for disabled individuals.",
//     providedBenefit: "Financial support for necessary equipment and services that enhance the quality of life for individuals with disabilities."
//   },
//   {
//     name: "Fashion & Textile Children's Trust (FTCT)",
//     description: "FTCT grants help children of UK fashion and textile families facing financial struggles. It offers support for various needs such as mobility equipment, sensory toys, specialist clothes, educational support, and essential items for families.",
//     providedBenefit: "Assistance for families associated with the fashion and textile industry to access specialized equipment, education support, and essential items for their children with disabilities."
//   },
//   {
//     name: "Douglas Hay Trust (Scotland only)",
//     description: "This trust provides support and resources for individuals with disabilities or special needs in Scotland. Detailed information about the specific offerings of this trust isn't provided in the text.",
//     providedBenefit: "Specific support and resources for disabled individuals or those with special needs in Scotland."
//   },
//   {
//     name: "Kids Direct Short Breaks",
//     description: "Kids Direct provides short break services for disabled children and young people up to 25 years old. It offers carer support, day trips, outings, and short breaks for both the disabled individual and their carers.",
//     providedBenefit: "Opportunities for disabled children and their carers to enjoy outings and short breaks, providing respite and recreational experiences."
//   },
//   {
//     name: "Kidsout",
//     description: "Kidsout supports children and young people with disabilities, life-threatening illnesses, or those disadvantaged by poverty or rural isolation. It funds days out to theme parks, seaside trips, and provides toy boxes for children who have escaped domestic violence.",
//     providedBenefit: "Funding for recreational experiences, day trips, and toy boxes to improve the quality of life for children facing various challenges."
//   },
//   {
//     name: "Lifeline 4 Kids",
//     description: "Lifeline 4 Kids assists disabled children up to 18 years old by providing support to purchase resources like communication aids, wheelchairs, and specialist computer equipment.",
//     providedBenefit: "Financial aid to purchase specialized equipment and resources that enhance the daily living and communication skills of disabled children."
//   },
//   {
//     name: "Little Princess Trust",
//     description: "The Little Princess Trust provides high-quality tailored wigs made from real hair for children suffering from hair loss due to cancer treatments or other illnesses.",
//     providedBenefit: "Supplying and funding wigs for children, helping them cope with the effects of hair loss caused by medical conditions."
//   },
//   {
//     name: "The Matthew Trust",
//     description: "The Matthew Trust offers support and care for children and young people aged 8 years and above with mental health difficulties. It provides grants for counseling, medical equipment, household goods, clothing, respite breaks, and advocacy support.",
//     providedBenefit: "Financial assistance and care services for children and young people dealing with mental health difficulties, ensuring access to necessary support and resources."
//   },
//     {
//     name: 'Merlin\'s Magic Wand (MMW)',
//     description: 'The Merlin Entertainment Group provides magical experiences for seriously ill, disabled, or disadvantaged children aged between 2 and 18 years.',
//     providedBenefit: 'Offers experiences at the group\'s attractions like Sealife Centres, Legoland, and Madam Tussauds. It aims to create joyful memories and moments of happiness for eligible children.'
//   },
//   {
//     name: 'Michael Crawford Children\'s Charity',
//     description: 'Created by actor Michael Crawford, the charity provides grants to both individuals and charities to benefit children and young people in health, disability, and poverty relief.',
//     providedBenefit: 'Offers funding for the advancement of health, disability, and poverty relief for children and young individuals through grants.'
//   },
//   {
//     name: 'Naval Children\'s Charity',
//     description: 'Offers grants and support to children and young people up to the age of 25 whose parents or guardians have served in specific naval-related services.',
//     providedBenefit: 'Provides emergency essential grants, educational needs grants, educational grants, and medical needs grants to eligible children and young individuals from naval families in need, hardship, and distress.'
//   },
//   {
//     name: 'Newlife',
//     description: 'The largest provider of specialist equipment to help disabled or terminally ill children/young people under 19 years living in the UK.',
//     providedBenefit: 'Provides grants for essential equipment such as beds, wheelchairs, communication aids, as well as various specialized services like Play Therapy Pod Service, Emergency Bed Loan Service, and more.'
//   },
//   {
//     name: 'Nihal Armstrong Trust',
//     description: 'A small charity aiding children under 18 years with Cerebral Palsy by providing funding (under £1,000) towards essential equipment and communication aids.',
//     providedBenefit: 'Offers financial support for essential equipment and specific services not provided by statutory services for children with Cerebral Palsy.'
//   },
//   {
//     name: 'Kids Cancer Charity',
//     description: 'Provides support to children dealing with cancer.',
//     providedBenefit: 'Offers support, guidance, and possibly financial assistance to children affected by cancer and their families.'
//   },
//   {
//     name: 'Kids with Arthritis',
//     description: 'Offers support and resources for children dealing with arthritis.',
//     providedBenefit: 'Provides resources, possibly financial assistance, and support to children affected by arthritis to help manage their condition.'
//   },
//   {
//     name: 'Lennox Children\'s Cancer Fund',
//     description: 'Aims to make a positive difference to the lives of children with cancer.',
//     providedBenefit: 'Offers various forms of support, including financial assistance, emotional support, and potentially grants to aid children affected by cancer.'
//   },
//   {
//     name: 'REACT Charity',
//     description: 'Assists families caring for a child with a life-threatening illness in the UK.',
//     providedBenefit: 'Offers financial support towards basic essential needs such as specialist or medical equipment, educational equipment, domestic equipment, hospital expenses, and funeral or memorial expenses. '
//   },
//   {
//     name: "Sailors Children's Society",
//     description: "Provides support to children of seafarers in the UK who have served in the Royal/Merchant Navy or fishing fleets, including ferries, tankers, and cruise ships.",
//     providedBenefit: "Offers welfare grants, clothing grants, Christmas grants, student grants, emergency heating grants, and caravan holidays at seaside resorts for eligible families."
//   },
//   {
//     name: "Sandcastle Trust",
//     description: "Supports families where a parent or child has a rare genetic condition.",
//     providedBenefit: "Assists with short breaks, special day trips, or annual attraction passes to enhance the quality of life for affected families."
//   },
//   {
//     name: "S C Witting Trust",
//     description: "Provides small one-off grants to children and young people (15 years and younger) in England who are in financial need.",
//     providedBenefit: "Grants approximately £200 for essential items like furniture, clothing, and white goods for families. Offers small grants up to £100 for books or educational equipment through applications made via third parties like social services."
//   },
//   {
//     name: "The Sick Children's Trust",
//     description: "Offers free 'Home from Home' accommodation to families with sick children in hospitals across England.",
//     providedBenefit: "Provides accommodation close to hospitals, enabling families to stay together during the child's treatment. Each house has its own manager and contact details for easy access."
//   },
//   {
//     name: "Sunny Days Children's Fund",
//     description: "Supports children under 18 years with various medical conditions, including Leukemia, Cerebral Palsy, deafness, blindness, terminal illnesses, and life-limiting conditions.",
//     providedBenefit: "Offers small grants for day trips, medical equipment, respite, hospital travel, white goods, IT equipment (excluding iPads), and fulfillment of children's last wishes. Also provides holiday homes at specific locations."
//   },
//   {
//     name: "TACT (The Actors Children's Trust)",
//     description: "Offers financial support, information, and advice to actors whose children (up to 21 years) have special needs, learning difficulties, or long-term health issues.",
//     providedBenefit: "Assists with funding for various necessities such as school uniforms, music lessons, therapies, school trips, and extra tuition."
//   },
//   {
//     name: "REACH (for children and young people with upper limb deficiency)",
//     description: "Provides support specifically for children and young people dealing with upper limb deficiencies.",
//     providedBenefit: "Likely offers assistance, support, or resources catered to individuals coping with upper limb deficiencies, although specific benefits might vary."
//   },
//   {
//     name: "Scampps (Surrey only)",
//     description: "Provides support, likely limited to Surrey, for children and young people with certain needs or disabilities.",
//     providedBenefit: "Offers assistance, services, or resources tailored to those residing in Surrey, though specific benefits can vary based on individual needs and the organization's scope."
//   },
//   {
//     name: "Sullivan's Heroes",
//     description: "Focuses on fundraising and financial assistance for families funding housing adaptations.",
//     providedBenefit: "Likely aids families in obtaining financial support or guidance for housing adaptations to accommodate children with disabilities or special needs."
//   },
//   {
//     name: "The Steve Morgan Foundation",
//     description: "The Steve Morgan Foundation aims to support projects that enhance the lives of children and families dealing with disabilities, health issues, poverty, or other challenges in North Wales, Merseyside, West Cheshire, and North Shropshire.",
//     providedBenefit: "Provides financial assistance and grants to various charitable organizations and projects focusing on education, health, community development, and social welfare. It aims to improve the quality of life for children and families."
//   },
//   {
//     name: "Variety, the Children's Charity",
//     description: "Variety is a charity dedicated to assisting children and young people under 18 living with sickness, disability, or disadvantage across the UK. They aim to provide practical help and support to improve the daily lives of children facing various challenges.",
//     providedBenefit: "Funding for wheelchairs (electric, manual, and sports), specialist equipment, life-saving monitors, specially adapted car seats, and other aids. Grants range from £100 to £6000, catering to diverse needs of disabled children."
//   },
//   {
//     name: "Well Child",
//     description: "Well Child focuses on providing support and assistance to children aged 1-18 years dealing with serious illness and life-threatening conditions throughout the UK. Their mission involves enhancing the quality of life for these children and their families.",
//     providedBenefit: "Carry out hands-on projects that benefit the child and their family, such as decorating the child's room or adapting the garden. They have a network of Well Child Nurses across the UK to support families care for sick children."
//   },
//   {
//     name: "Whizz Kidz",
//     description: "Whizz Kidz is dedicated to offering mobility equipment to disabled children and young people up to 18 years old in the UK. They focus on providing necessary equipment that is not readily available through the NHS, enhancing mobility and independence.",
//     providedBenefit: "Whizz Kidz assesses each child's immediate and future mobility needs, offering mobility equipment tailored to these needs. This includes wheelchairs and other aids, providing substantial support and independence for disabled children."
//   },
//   {
//     name: "The Victoria Foundation",
//     description: "The Victoria Foundation serves the areas of Richmond and Kingston, Greater London, and Surrey, aiming to improve the lives of individuals facing health issues, disabilities, or other challenges within these regions.",
//     providedBenefit: "Provides financial support for essential needs, including specialist equipment, educational support, and other vital items for families and individuals dealing with health-related challenges in the specified areas."
//   },
// ];

export default function Home() {
  const { data: allResources } = api.resource.getAll.useQuery();
  const { data: allCriteria } = api.criteria.getAll.useQuery();
  //addResource function, if you want to use it uncomment the procedure in resource router
  // const { mutate } = api.resource.addResource.useMutation();
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

  //Method to add recorsd to db
  // const addRecords = () => {
  //   for (let i = 0; i < grants.length; i++) {
  //     const grantName = grants[i]?.name;
  //     const grantDes = grants[i]?.description;
  //     const grantBenefit = grants[i]?.providedBenefit;
  //     if (typeof grantName !== "undefined" && (typeof grantDes !== "undefined" && typeof grantBenefit !== "undefined")) {
  //       mutate({ name: grantName, description: grantDes, providedBenefit: grantBenefit });
  //     }
  //   }
  //   console.log("Donezo")
  // }

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
