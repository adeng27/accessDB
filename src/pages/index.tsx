import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import AIChat from "~/components/AIChat";
import Layout from "~/components/layout";
import { useState } from "react";
import { api } from "~/utils/api";

//to measure 300 characters long
// const threeHundred = [
//   [
//     {
//       description: "Graduating high school seniors and students in their first three years of college diagnosed with and in treatment for bipolar disorder are eligible. Requirements include an essay and student transcripts. Students can use the award for tuition, books, housing, and other educational expenses.ddddddddd"
//     }
//   ]
// ]

// const newData = [
//   [
//     {
//       name: "Team See Possibilities Scholarship",
//       description: "Applicants must meet Supplemental Security Income guidelines to be considered legally blind. Students may pursue undergraduate or graduate degrees or a professional trade. In addition to the financial award, students also benefit from the organization's mentorship program.",
//       reqs: "Meet Supplemental Security Income guidelines, Legally Blind Students pursuing Undergraduate, Graduate Degrees, or Professional Trade",
//       dueDate: "April 28, 2023",
//       providedBenefit: "$5,000"
//     },
//   ],
//   [
//     {
//       name: "Ruby's Rainbow College Scholarship",
//       description: "Ruby's Rainbow supports scholarships for students with Down syndrome seeking postsecondary education and training. Applicants must be at least 18 by July 1 of the award year. The scholarship committee considers personal goals, accomplishments, and community impact.",
//       reqs: "Students with Down syndrome pursuing postsecondary education, Minimum age of 18 by July 1 of the award year",
//       dueDate: "April 17, 2023",
//       providedBenefit: "$1,000-$10,000"
//     },
//     {
//       name: "Adults With Autism Scholarship",
//       description: "Autism Delaware offers this scholarship to adults in the state seeking a college degree or postsecondary certification. Applicants must provide a cover letter discussing career plans, a resume, letters of recommendation, and evidence of an Autism Spectrum Disorder.",
//       reqs: "Adults in Delaware pursuing a college degree or postsecondary certification, Evidence of Autism Spectrum Disorder",
//       dueDate: "April 28, 2023",
//       providedBenefit: "$1,000"
//     },
//     {
//       name: "Kerry Magro Scholarship Program",
//       description: "Current high school and college students may apply for this annual award to attend a postsecondary institution in the 2023-2024 school year. The application requires a short biography, an Autism Spectrum diagnosis, a resume, a letter of reference, and an essay.",
//       reqs: "Current high school and college students applying for the 2023-2024 school year, Autism Spectrum diagnosis",
//       dueDate: "April 24, 2023",
//       providedBenefit: "$500"
//     }
//   ],
//   [
//     {
//       name: "ABC Law Centers Cerebral Palsy Scholarship",
//       description: "This scholarship welcomes applications from students with cerebral palsy and a 3.0 or higher GPA seeking to enroll in an accredited college or university. The application requires an essay or a creative project.",
//       reqs: "Students with cerebral palsy and a 3.0 or higher GPA seeking enrollment in an accredited college or university",
//       dueDate: "July 31, 2023",
//       providedBenefit: "$1,000"
//     },
//     {
//       name: "Jared Monroe Foundation Scholarship",
//       description: "Graduating high school seniors and students in their first three years of college diagnosed with and in treatment for bipolar disorder are eligible. Requirements include an essay and student transcripts. Students can use the award for tuition, books, housing, and other educational expenses.",
//       reqs: "Graduating high school seniors and students in their first three years of college diagnosed with and in treatment for bipolar disorder",
//       dueDate: "May 1, 2023",
//       providedBenefit: "$500-$2,300"
//     },
//     {
//       name: "Elevate Mental Health Awareness Scholarship",
//       description: "High school seniors and college undergraduate and graduate students may apply. Applicants must have personally experienced challenges related to mental health or have had people close to them experience mental health issues. All majors and GPAs considered.",
//       reqs: "High school seniors and college undergraduate and graduate students who have personally experienced challenges related to mental health or have had people close to them experience mental health issues",
//       dueDate: "April 30, 2023",
//       providedBenefit: "$500"
//     }
//   ],
//   [
//     {
//       name: "The Center for Reintegration Scholarship Program",
//       description: "This scholarships supports students with bipolar disorder, schizophrenia, or schizoaffective disorder who are seeking a degree or certificate from accredited schools/training programs. Student's essay, recommendations, transcripts, and their cost of tuition and fees are considered.",
//       reqs: "Individuals diagnosed with bipolar disorder, schizophrenia, or schizoaffective disorder seeking a degree or certificate from accredited schools and training programs",
//       dueDate: "January 31, 2024",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "180 Medical Scholarship Program",
//       description: "Applicants must be under a doctor's care for conditions such as spinal cord injury, spina bifida, transverse myelitis, neurogenic bladder, or ostomy. The scholarship supports undergraduate study at two-year and four-year colleges or graduate study.",
//       reqs: "Applicants under a doctor's care for conditions like spinal cord injury, spina bifida, transverse myelitis, neurogenic bladder, or ostomy, pursuing undergraduate or graduate study",
//       dueDate: "June 1, 2023",
//       providedBenefit: "$1,000"
//     }
//   ]  
// ]


export default function Home() {
  //addResource function, if you want to use it uncomment the procedure 
  //in resource router and import `api` and `useState`

  const user = useUser();

  // const [curName, setCurName] = useState("");
  // const { mutate } = api.resource.addResource.useMutation({
  //   onError: () => {
  //     console.log(curName)
  //   }
  // });

  // Uncomment for adding records
  // const formatDate = (date: string) => {
  //   if (date === "") {
  //     return "January 1, 2025"
  //   }
  //   const ind = date.indexOf(" (estimated)")
  //   if (ind === -1) return date
  //   return date.substring(0, ind);
  // }

  // const addAllRecords = () => {
  //   if (typeof newData === "undefined") return
  //   for (let i = 0; i < newData.length; i++) {
  //     const arr = newData[i]
  //     if (typeof arr === "undefined") return
  //     for (let j = 0; j < arr.length; j++) {
  //       const elem = arr[j];
  //       if (!elem) return
        
  //       const name1 = elem.name;
  //       const description1 = elem.description;
  //       const reqs1 = elem.reqs;
  //       const benefit1 = elem.providedBenefit;
  //       const dueDate1 = formatDate(elem.dueDate);

  //       setCurName(elem.name)

  //       mutate({ name: name1, description: description1, reqs: reqs1, providedBenefit: benefit1, dueDate: dueDate1 })
  //     }
  //   }
  // }

  // const addOneRecord = () => {
  //   if (newData) {
  //     const arr = newData[0];
  //     if (arr) {
  //       const elem = arr[0];
  //       if (!elem) return;
  //       const name1 = elem.name;
  //       const description1 = elem.description;
  //       const reqs1 = elem.reqs;
  //       const benefit1 = elem.providedBenefit;
  //       const dueDate1 = formatDate(elem.dueDate);

  //       mutate({ name: name1, description: description1, reqs: reqs1, providedBenefit: benefit1, dueDate: dueDate1 })
  //     }
  //   }
  // }

  return (
    <>
      <Layout>
        <Head>
          <title>Access DB</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <main className="flex min-h-screen justify-center h-fit">
          <div className="h-full w-full flex flex-col items-center gap-4">
            <div className="md:w-9/12 w-10/12">
              <AIChat isSignedIn={ user.isSignedIn ? user.isSignedIn : false } />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
