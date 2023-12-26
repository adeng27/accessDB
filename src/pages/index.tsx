import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import AIChat from "~/components/AIChat";
import Layout from "~/components/layout";

// const newData = [
//   [
//     {
//       name: "1800 Wheelchair Scholarship Fund",
//       description: "Annual award for undergraduate or graduate students addressing mobility issues and personal challenges.",
//       reqs: "Undergraduate or Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "180 Medical Scholarship",
//       description: "Open to full-time college students with specific medical conditions like spinal cord injuries, spina bifida, and more.",
//       reqs: "Full-time College Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Elaine Chapin Fund MS Scholarship",
//       description: "Supports St. Louis, MO-area students impacted by multiple sclerosis during post-secondary education.",
//       reqs: "Students in St. Louis, MO area",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Brighter Tomorrow Grant",
//       description: "Available to individuals with multiple sclerosis to assist with educational supplies and other services.",
//       reqs: "Individuals with Multiple Sclerosis",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Little People of America Scholarship",
//       description: "Offers scholarships to undergraduate students with diagnosed forms of dwarfism or family members of dwarfs.",
//       reqs: "Undergraduate Students, LPA Members",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "AbbVie CF Scholarship",
//       description: "Recognizes exceptional students with Cystic Fibrosis displaying academic excellence, community involvement, and creativity.",
//       reqs: "Students with Cystic Fibrosis",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Elizabeth Nash Foundation Scholarship",
//       description: "Open to U.S. citizens with Cystic Fibrosis pursuing undergraduate or graduate studies at accredited US-based colleges or universities.",
//       reqs: "U.S. Citizens, Undergraduate or Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     }
//   ],
//   [
//     {
//       name: "Microsoft Disability Scholarship",
//       description: "Renewable scholarship for high school seniors with disabilities aspiring to a career in the technology industry.",
//       reqs: "High School Seniors",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Foundation for Science and Disability Grant",
//       description: "Available to fourth-year undergraduate students accepted to graduate or professional school and graduate students pursuing degrees in specific fields.",
//       reqs: "Undergraduate and Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Grant"
//     },
//     {
//       name: "Incight Scholarship",
//       description: "For undergraduate and graduate students with documented disabilities who are residents of California, Oregon, or Washington State.",
//       reqs: "Residents of California, Oregon, or Washington State",
//       dueDate: "Varies",
//       providedBenefit: "Grant"
//     },
//     {
//       name: "Joe Cleres and Don Sage Scholarship Program",
//       description: "For students with mental or physical disabilities pursuing education at institutions that require tuition.",
//       reqs: "Students with Disabilities",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     }
//   ],  
//   [
//     {
//       name: "Cochlear Scholarships",
//       description: "Open to undergraduate or graduate students who are U.S. or Canadian citizens and recipients of Cochlear Nucleus, Baha, or Osia hearing devices.",
//       reqs: "Undergraduate and Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Sertoma International Hard of Hearing and Deaf Scholarship",
//       description: "For U.S. citizens with clinically significant bilateral hearing loss, graduating from high school, or undergraduate students pursuing bachelor’s degrees.",
//       reqs: "High School Seniors and Undergraduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "American Speech-Language-Hearing Foundation Scholarship",
//       description: "Offered to disabled undergraduate seniors accepted into a master’s program or students currently pursuing a master’s or doctoral degree in communication sciences and disorders.",
//       reqs: "Undergraduate and Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Graduate Fellowship Fund at Gallaudet University",
//       description: "Provides financial assistance to deaf and hard-of-hearing graduates studying full-time in terminal degree programs.",
//       reqs: "Deaf and Hard-of-Hearing Graduates",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "George H. Nofer Scholarship for Law and Public Policy",
//       description: "For full-time graduate students with moderate to profound hearing loss attending accredited law or graduate schools for master’s or doctoral degrees in public policy or public administration.",
//       reqs: "Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     }
//   ],
//   [
//     {
//       name: "American Council for the Blind Scholarship",
//       description: "ACB offers educational scholarships for legally blind students at the undergraduate and graduate levels, as well as those attending technical college.",
//       reqs: "Undergraduate, Graduate, and Technical College Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "National Federation of the Blind Scholarship Program",
//       description: "Mary P. Oenslager Scholastic Achievement awards are presented to Learning Ally members completing undergraduate or graduate degrees, blind or visually impaired, for academic achievement, outstanding leadership, and service.",
//       reqs: "Undergraduate and Graduate Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "AER William and Dorothy Ferrell Scholarship",
//       description: "The William and Dorothy Ferrell Scholarship, awarded every other year in even years, goes to two selected applicants who are legally blind and studying for a career in services to persons who are blind or visually impaired.",
//       reqs: "Students Studying for a Career in Services to Persons with Visual Impairments",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     }
//   ],
//   [
//     {
//       name: "Children’s Brain Tumor Foundation Scholarships",
//       description: "Available to U.S. students in undergraduate, graduate, or technical degree programs, diagnosed with a brain or spinal cord tumor before the age of 21.",
//       reqs: "Undergraduate, Graduate, or Technical Degree Students",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Diabetes Scholars Program",
//       description: "Awards scholarships to students entering college and living with type 1 diabetes.",
//       reqs: "Incoming College Students with Type 1 Diabetes",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Eric Marder Scholarship Program",
//       description: "Open to patients with a primary immunodeficiency as classified by the WHO, for undergraduate students attending or entering college or a technical training school.",
//       reqs: "Undergraduate Students with Primary Immunodeficiency",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "Hemophilia Federation of America Scholarships",
//       description: "Available to students with a bleeding disorder seeking post-secondary education from a college, university, or trade school.",
//       reqs: "Students with Bleeding Disorders",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "National Collegiate Cancer Foundation Scholarships",
//       description: "Offered to students who are cancer survivors or current cancer patients, attending or planning to attend an accredited college, university, or vocational institution.",
//       reqs: "Cancer Survivors or Current Patients",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "PAF Scholarships for Survivors",
//       description: "Supports U.S. citizens pursuing undergraduate or graduate studies, diagnosed with or treated for cancer or chronic disease.",
//       reqs: "Undergraduate or Graduate Students with Cancer or Chronic Disease",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     },
//     {
//       name: "UCB Family Epilepsy Scholarship Program",
//       description: "Offers educational scholarships to undergraduate and graduate students living with epilepsy, and family members and caregivers of those with epilepsy.",
//       reqs: "Students with Epilepsy and Family Members/Caregivers",
//       dueDate: "Varies",
//       providedBenefit: "Scholarship"
//     }
//   ],
// ]


export default function Home() {
  //addResource function, if you want to use it uncomment the procedure 
  //in resource router and import `api` and `useState`

  // const [curName, setCurName] = useState("");
  // const { mutate } = api.resource.addResource.useMutation({
  //   onError: () => {
  //     console.log(curName)
  //   }
  // });

  const user = useUser();

  //Uncomment for adding records
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
