import Head from "next/head";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import AIChat from "~/components/AIChat";
import Layout from "~/components/layout";
import { useState } from "react";

const newData = [
  [
    {
      name: "$10,000 “No Essay” Scholarship",
      description: "This scholarship is open to all students who want some extra help paying for their education. Whether you are a high school student who hopes to go to college, a graduate student who’s in a master’s program, or an adult learner who wants to return to school, you are eligible for our scholarship.",
      providedBenefit: "$10,000",
      reqs: "All Grade Levels, US Citizens, Permanent Residents, No GPA requirement, To apply, sign up for a Scholarships360 account at app.scholarships360.org and apply through the app.",
      dueDate: "June 30, 2024"
    },
    {
      name: "$1,000 Appily Easy College Money Scholarship",
      description: "This easy scholarship from Appily is open to U.S. high school students and college transfer students. One scholarship will be awarded each month.",
      providedBenefit: "$1,000",
      reqs: "High School Students & College Underclassmen, US Citizens, Permanent Residents, No essay, Proof of enrollment",
      dueDate: "December 31, 2023"
    },
    {
      name: "Marion Huber Learning Through Listening Award",
      description: "Are you a graduating Learning Ally high school senior member with a learning disability? If so, consider applying for this scholarship! This award is open to graduating Learning Ally high school senior members with learning disabilities who plan to pursue postsecondary education.",
      providedBenefit: "$2,000 - $6,000",
      reqs: "High School Senior, Disability, Personal Narrative, Video, Academic transcript, Letter of Recommendation",
      dueDate: "December 31, 2023"
    }
  ],
  [
    {
      name: "Elizabeth Schalk Memorial Scholarship",
      description: "This scholarship is a beacon of hope for those who have experienced mental health issues, not only providing financial support for such students’ education but also commemorating the enduring spirit of Elizabeth Schalk, who courageously battled mental illness throughout her life.",
      providedBenefit: "$1,000",
      reqs: "High School Seniors, College & Graduate Students, Disability, 400-600 word essay",
      dueDate: "January 1, 2024"
    },
    {
      name: "Pride Foundation Scholarship",
      description: "Are you an LGBTQ+ student looking for a generous scholarship opportunity? Further, are you a current or former resident of Alaska, Idaho, Montana, Oregon, or Washington? If so, consider applying for the Pride Foundation Scholarship!",
      providedBenefit: "$16,500",
      reqs: "College & Graduate Students, No GPA requirement, Asian/Pacific Islander, Black/African, Hispanic/Latino, Native American, Law, Political Science, Low Income, Disability, LGBTQ+",
      dueDate: "January 5, 2024"
    },
    {
      name: "Challenge Met Scholarship",
      description: "The Challenge Met Scholarship is an opportunity for students with a learning disability and an active Amateur Radio License Class to showcase their dedication and hard work.",
      providedBenefit: "$500",
      reqs: "College Students, TV/Radio Broadcasting, Disability, Academic transcript",
      dueDate: "January 10, 2024"
    },
    {
      name: "Baer Reintegration Scholarship",
      description: "Are you a post-secondary student in the U.S. who has been diagnosed with bipolar disorder, schizophrenia, or schizoaffective disorder? If so, consider applying for the Baer Reintegration Scholarship!",
      providedBenefit: "Varies",
      reqs: "College & Graduate Students, Disability, 3-page essay, Academic transcript, Letter of Recommendation",
      dueDate: "January 31, 2024"
    }
  ],
  [
    {
      name: "NAJA Graduate Scholarship Program",
      description: "Are you a graduate student interested in working directly with children to address their special needs? If so, consider applying for the NAJA Graduate Scholarship Program!",
      providedBenefit: "Varies",
      reqs: "Graduate Students, US Citizens, Permanent Residents, Psychology, Healthcare, Disability, Alabama, Arkansas, Florida, Louisiana, Mississippi, Missouri, Tennessee, Essay, Academic transcript, Resume or CV, Letter of Recommendation",
      dueDate: "February 1, 2024"
    },
    {
      name: "Pinnacol Foundation Scholarship",
      description: "Are you the child of a worker who was left injured or killed in a work-related accident while working for a Colorado-based employer? If so, you may qualify for the Pinnacol Foundation Scholarship.",
      providedBenefit: "$4,700",
      reqs: "High School Seniors & College Students, 2.0, Disability, Colorado, Essay, Academic transcript",
      dueDate: "February 15, 2024"
    },
    {
      name: "National Federation of the Blind of Missouri Scholarship Program",
      description: "The National Federation of the Blind of Missouri is on the hunt for impressive, blind undergraduate and graduate students from Missouri who plan to enroll in a post-secondary institution for the upcoming Fall semester.",
      providedBenefit: "$750",
      reqs: "College Students, US Citizens, Permanent Residents, Disability, Missouri, Essay, Academic transcript, Letters of Recommendation, Proof of legal blindness, Letter from an NFB of Missouri Scholarship Committee member",
      dueDate: "February 15, 2024"
    },
    {
      name: "Jackson-Stricks Scholarship",
      description: "The Jackson-Stricks Scholarship annually grants a $5,000 and $10,000 award to two individuals who face physical challenges that affect mobility, vision, or hearing and who are currently enrolled in an undergraduate or graduate program in the New York Metropolitan Area.",
      providedBenefit: "$5,000 - $10,000",
      reqs: "College & Graduate Students, Disability, New York, 1-2 page essay, Academic transcript, Restricted for use at two-year colleges, four-year colleges, and trade/technical schools",
      dueDate: "February 29, 2024"
    }
  ],
  [
    {
      name: "SFM Foundation Scholarship",
      description: "Are you a college student whose parents were left disabled or killed while working for Minnesota or Iowa employers? If so, consider applying for the SFM Foundation Scholarship.",
      providedBenefit: "$15,000",
      reqs: "College & Graduate Students, US Citizens, Permanent Residents, 2.0, Disability, Iowa, Minnesota, Proof of enrollment, Academic transcript",
      dueDate: "March 31, 2024"
    },
    {
      name: "Blind or Deaf Beneficiary Grant Program",
      description: "The Blind or Deaf Beneficiary Grant Program provides financial aid to blind or deaf Pennsylvania residents who are currently attending a postsecondary institution.",
      providedBenefit: "$500",
      reqs: "College & Graduate Students, Disability, Pennsylvania, No essay, Full-time or part-time students, Restricted for use at four-year colleges, FAFSA, Written documentation of visual or hearing impairment",
      dueDate: "March 31, 2024"
    },
    {
      name: "Help America Hear Scholarship",
      description: "The Help America Hear Scholarship is an incredible opportunity for high school seniors across the nation who rely on hearing aids to hear.",
      providedBenefit: "$4,000",
      reqs: "High School Senior, Disability, 500-1,500 word essay, Letters of Recommendation, Full-time or part-time students, Restricted for use at two-year colleges, four-year colleges, and trade/technical schools",
      dueDate: "April 7, 2024"
    },
    {
      name: "A. Leigh Phillips Scholarship",
      description: "Are you a college-bound high school senior from Maine with a disability identified under IDEA and MUSER Chapter 101? If so, you may be eligible for the A. Leigh Phillips Scholarship!",
      providedBenefit: "$1,000",
      reqs: "High School Senior, Disability, Maine, Completed application, Copy of IEP listing the student’s disability, Essay, Academic transcript, Resume or CV, Letter of Recommendation",
      dueDate: "April 30, 2024"
    }
  ],
  [
    {
      name: "Caroline Simpson Maheady Scholarship Award",
      description: "A prestigious opportunity for nursing students with disabilities. Applicants should be undergraduate students of Scottish descent who have a passion for working with people with disabilities.",
      providedBenefit: "$250",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Bruno Rolando Scholarship Award",
      description: "A prestigious opportunity for a nursing student with a disability. The ideal candidate will be employed at a Veteran’s Hospital, but all applicants will be considered.",
      providedBenefit: "$250",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Jill Laura Creedon Scholarship Award",
      description: "A prestigious opportunity for nursing students facing disabilities or medical challenges. The scholarship requires three letters of recommendation.",
      providedBenefit: "$500",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Anna May Rolando Scholarship Award",
      description: "A prestigious opportunity for nursing graduate students with disabilities, specifically designed for those who have a passion for working with people with disabilities.",
      providedBenefit: "$500",
      reqs: "Graduate Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    }
  ],
  [
    {
      name: "Genevieve Saran Richmond Award",
      description: "Recognizes academic excellence and personal character of a nursing student with a disability. Donated by Leslie and Virginia Fiur.",
      providedBenefit: "$500",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Mary Serra Gili Scholarship Award",
      description: "Recognizes academic excellence and personal character of a nursing student with a disability. Donated by Thomas Gili.",
      providedBenefit: "$250",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Peter Gili Scholarship Award",
      description: "Prestigious opportunity for nursing students with disabilities. Donated in memory of Peter Gili.",
      providedBenefit: "$500",
      reqs: "College Students, Nursing, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "June 1, 2024"
    },
    {
      name: "Wisconsin Hearing/Visually Impaired Student Grant",
      description: "For undergraduate Wisconsin residents with a severe or profound hearing or visual impairment, attending eligible in-state or out-of-state institutions.",
      providedBenefit: "$250 - $1,800",
      reqs: "College Students, Low Income, Disability, FAFSA",
      dueDate: "June 30, 2024"
    }
  ],
  [
    {
      name: "Public Safety Officer or Employee’s Child Survivor Grant Program",
      description: "For Missouri college students and public safety officers affected by disability or death in the line of duty.",
      providedBenefit: "Partial Tuition Cost",
      reqs: "High School Seniors & College Students, Law Enforcement, Fire Science/Firefighting, Disability, Essay",
      dueDate: "Rolling"
    },
    {
      name: "Flatiron School Access Scholarship",
      description: "Supports underrepresented students at Flatiron School with financial assistance for tuition.",
      providedBenefit: "$2,000",
      reqs: "College & Graduate Students, Computer Science, Cybersecurity, Low Income, Disability, LGBTQ+, Veteran, Women",
      dueDate: "Rolling"
    },
    {
      name: "Canines for Disabled Kids Scholarship",
      description: "Supports minors with disabilities accepted into guide dog training programs.",
      providedBenefit: "$5,000",
      reqs: "High School Students, Disability, Essay",
      dueDate: "Semiannual"
    },
    {
      name: "Sunwise Capital Autism Scholarship",
      description: "Awards $500 to students with autism pursuing higher education.",
      providedBenefit: "$500",
      reqs: "College Students, Disability, 600-word essay, Letters of Recommendation",
      dueDate: "Rolling"
    }
  ],
  [
    {
      name: "David Porter Need-Based Diversity Scholarship",
      description: "For students historically underrepresented in study abroad programs attending IES Abroad Consortium schools.",
      providedBenefit: "$5,000",
      reqs: "College Students, Asian/Pacific Islander, Black/African, Hispanic/Latino, Native American, Low Income, Disability, LGBTQ+, Veteran, Essay",
      dueDate: "Biannual, May 1st and November 1st"
    },
    {
      name: "Chairish Design Your Future Scholarship",
      description: "Supports underrepresented students pursuing design and engineering-related fields.",
      providedBenefit: "$2,500",
      reqs: "High School Seniors, College & Graduate Students, 3.0 GPA, Black/African, Hispanic/Latino, Native American, Architecture, Landscape Architecture, Engineering, Interior Design, Disability, First-Generation Student, 500-word essay",
      dueDate: "Biannual"
    },
    {
      name: "Academy of Special Dreams College Scholarship Fund",
      description: "Assists disabled college students pursuing studies in visual and performing arts.",
      providedBenefit: "$250 - $1,000",
      reqs: "College Students, US Citizens, Permanent Residents, Visual & Performing Arts, Graphic Design/Printing, Film/Video Production, Photography/Photojournalism, Disability, Artist's statement essay, Artistic portfolio",
      dueDate: "Rolling"
    },
    {
      name: "Martin Frank Diversity Travel Award",
      description: "Supports underrepresented graduate students in physiological sciences to attend conferences.",
      providedBenefit: "$1,500",
      reqs: "Graduate Students, Asian/Pacific Islander, Black/African, Hispanic/Latino, Native American, Biology, Neurobiology, Disability, Resume or CV, Letter of Recommendation",
      dueDate: "December 2024 (estimated)"
    }
  ],
  [
    {
      name: "Tommy Tranchin Award",
      description: "Supports North Texas students with disabilities for creative projects and skill development.",
      providedBenefit: "$2,500",
      reqs: "High School Students, Visual & Performing Arts, Disability, Texas, Letter of Recommendation",
      dueDate: "December 2024 (estimated)"
    },
    {
      name: "Diversity in Esthetics Scholarship for PCA Partner Schools",
      description: "Empowers underrepresented students in esthetics programs at PCA SKIN® Partner Schools.",
      providedBenefit: "$5,000",
      reqs: "High School Seniors & College Students, US Citizens, Permanent Residents, Asian/Pacific Islander, Black/African, Hispanic/Latino, Middle Eastern, Native American, Cosmetology, Disability, LGBTQ+, 3-minute video essay, Proof of enrollment",
      dueDate: "November 2024 (estimated)"
    },
    {
      name: "National Federation of the Blind of California Scholarships",
      description: "Awards blind students in California for their academic achievements and aspirations.",
      providedBenefit: "$1,000",
      reqs: "College & Graduate Students, Disability, California, Essay, Proof of enrollment, Resume or CV, Letter of Recommendation",
      dueDate: "October 2024 (estimated)"
    },
    {
      name: "Charmaine Letourneau Scholarships",
      description: "Assists Deaf or Hard of Hearing students in Alberta, Canada, pursuing higher education.",
      providedBenefit: "$2,000 - $5,000",
      reqs: "College & Graduate Students, Disability, Alberta, Canada, Essay",
      dueDate: "August 2024 (estimated)"
    }
  ],
  [
    {
      name: "Learning Disability Resources Foundation Awards Program",
      description: "Provides laptops/tablets to college/graduate students with learning disabilities.",
      providedBenefit: "Laptop or Tablet",
      reqs: "College & Graduate Students, Disability, Essay, Proof of enrollment, Academic transcript",
      dueDate: "July 2024 (estimated)"
    },
    {
      name: "L.I.F.E. Scholarships",
      description: "Awards at least $500 to students with systemic lupus erythematosus (SLE) diagnosis.",
      providedBenefit: "$500",
      reqs: "College & Graduate Students, 3.0 GPA, Athletic, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "July 2024 (estimated)"
    },
    {
      name: "Mays Mission Scholarships",
      description: "Offers grants to college students with physical or mental disabilities pursuing bachelor’s degrees.",
      providedBenefit: "Varies",
      reqs: "College Students, 3.0 GPA, Disability, Essay, Proof of enrollment, Academic transcript",
      dueDate: "June 2024 (estimated)"
    },
    {
      name: "Pega Scholars Program",
      description: "Grants $1,500 to college students from various minority groups studying Computer Science.",
      providedBenefit: "$1,500",
      reqs: "College Students, US/Canadian Citizens, Black/African, Native American, Asian/Pacific Islander, Hispanic/Latino, Computer Science, Low Income, Disability, LGBTQ+, Veteran, Academic transcript",
      dueDate: "June 2024 (estimated)"
    }
  ],
  [
    {
      name: "Father James B. Macelwane Annual Award",
      description: "Awards $1,000 to stimulate interest in meteorology among college students through original student papers.",
      providedBenefit: "$1,000",
      reqs: "College Students, US Citizens, Disability, Application materials: pdf copy of original paper, abstract, letters of application and recommendation, Student Assessment form",
      dueDate: "June 2024 (estimated)"
    },
    {
      name: "Thomas J. Seefred Trust Scholarship",
      description: "$3,000 scholarship for Ohio residents with Juvenile Diabetes pursuing a bachelor’s degree.",
      providedBenefit: "$3,000",
      reqs: "College Students, Permanent Residents, No GPA requirement, Disability, Ohio residency, Notarized application with essay, transcript, and recommendation letter",
      dueDate: "June 2024 (estimated)"
    },
    {
      name: "ExceptionalNurse.com Scholarship",
      description: "$250 scholarship for nursing students with a documented disability enrolled full-time in a nursing program.",
      providedBenefit: "$250",
      reqs: "College & Graduate Students, Healthcare/Nursing, Disability, Online application, Medical Verification of Disability Form, 2-page essay, transcript, Recommendation letter",
      dueDate: "June 2024 (estimated)"
    },
    {
      name: "On To the Future (OTF)",
      description: "Scholarship for underrepresented individuals in geosciences pursuing studies at North American institutions.",
      providedBenefit: "Varies",
      reqs: "College & Graduate Students, Earth Science, Low Income, Adult, Disability, First-Generation, LGBTQ+, Veteran, Women, Essay, Recommendation letter",
      dueDate: "May 2024 (estimated)"
    }
  ],
  [
    {
      name: "Lime Connect Pathways Scholarship",
      description: "$1,000 scholarship for high school seniors with disabilities planning to enroll in a four-year university in the U.S. or Canada.",
      providedBenefit: "$1,000",
      reqs: "High School Senior, Disability, Online application, Essay, Resume or CV",
      dueDate: "May 2024 (estimated)"
    },
    {
      name: "NBCUniversal Tony Coelho Media Scholarship",
      description: "$5,625 scholarship for university students with disabilities pursuing a media, communications, or entertainment career.",
      providedBenefit: "$5,625",
      reqs: "High School Seniors, College & Graduate Students, US/Canadian Citizens, Permanent Residents, DACA, Communications/Journalism, Essay, Transcript, Resume or CV, Recommendation letter",
      dueDate: "May 2024 (estimated)"
    },
    {
      name: "Yellow Ribbon Scholarship",
      description: "$5,000 scholarship supporting diversity in transportation, travel, and tourism for college & graduate students with disabilities or ties to U.S./Canadian military veterans.",
      providedBenefit: "$5,000",
      reqs: "College & Graduate Students, US/Canadian Citizens, 3.0 GPA, Transportation/Travel/Tourism, Essay",
      dueDate: "May 2024 (estimated)"
    },
    {
      name: "Graduate Fellowship in the History of Science",
      description: "$20,000 fellowship for graduate students completing a dissertation in the history of atmospheric or related sciences.",
      providedBenefit: "$20,000",
      reqs: "Graduate Students, Hydrology, Merit Based, Disability, Academic transcript, Resume or CV, Recommendation letter",
      dueDate: "May 2024 (estimated)"
    }
  ],
  [
    {
      name: "John Lepping Memorial Scholarship",
      description: "$5,000 scholarship for disabled college students in New York, New Jersey, or Pennsylvania.",
      providedBenefit: "$5,000",
      reqs: "College Students, Permanent Residents, Disability, Essay, Proof of enrollment, Academic transcript, Recommendation letter",
      dueDate: "May 2024 (estimated)"
    },
    {
      name: "Raytheon’s Intelligence & Space Underrepresented Minorities in Cybersecurity Scholarship",
      description: "$10,000 scholarship for historically underrepresented minorities in STEM pursuing cybersecurity degrees.",
      providedBenefit: "$10,000",
      reqs: "High School Seniors, College & Graduate Students, US Citizens, 3.3 GPA, Ethnic minorities, Computer Science/Cybersecurity, Disability, Essay, Transcript, Resume or CV, Recommendation letter",
      dueDate: "May 2024 (estimated)"
    },
    {
      name: "Google Lime Scholarship",
      description: "$10,000 scholarship for disabled U.S. or Canadian students in Computer Science or similar degrees.",
      providedBenefit: "$10,000",
      reqs: "High School Seniors, College & Graduate Students, US/Canadian Citizens, Permanent Residents, DACA, Computer Science, Disability, Essays, Transcript, Resume or CV, Recommendation letter",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "HFA Educational Scholarship",
      description: "$2,000 scholarship for U.S. citizen college students with bleeding disorders.",
      providedBenefit: "$2,000",
      reqs: "College Students, US Citizens, Disability, Essay, Proof of enrollment, Academic transcript, Recommendation letters",
      dueDate: "April 2024 (estimated)"
    }
  ],
  [
    {
      name: "Schwallie Family Scholarship",
      description: "$3,000 scholarship for college students with autism funded by the Organization for Autism Research (OAR).",
      providedBenefit: "$3,000",
      reqs: "College Students, Disability, Essay, Proof of enrollment, Recommendation letter",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Making A Difference For Autism Scholarship",
      description: "$500 scholarship for high school seniors & college students on the autism spectrum globally by KFM Making A Difference.",
      providedBenefit: "$500",
      reqs: "High School Seniors & College Students, US Citizens, Permanent Residents, Disability, Essay, Resume or CV, Recommendation letter",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Lisa Higgins Hussman Scholarship",
      description: "$3,000 scholarship for college underclassmen with autism attending specific programs funded by OAR.",
      providedBenefit: "$3,000",
      reqs: "College Underclassmen, Disability, Essay, Proof of enrollment, Recommendation letters",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Little People of America Scholarship Program",
      description: "$1,000 scholarship for high school seniors, college & graduate students with dwarfism or their relatives by Little People of America (LPA).",
      providedBenefit: "$1,000",
      reqs: "High School Seniors, College & Graduate Students, Disability, Essay",
      dueDate: "April 2024 (estimated)"
    }
  ],
  [
    {
      name: "Verplank Foundation Scholarship",
      description: "$10,000 scholarship for high school seniors with Type 1 diabetes participating in organized sports by Verplank Foundation.",
      providedBenefit: "$10,000",
      reqs: "High School Senior, US Citizens, 3.0 GPA, Athletic, Disability, 250-word essay",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "INCIGHT Scholarship",
      description: "$500 scholarship for students with disabilities in Washington, Oregon, and California by INCIGHT.",
      providedBenefit: "$500",
      reqs: "High School Seniors, College & Graduate Students, US Citizens, Permanent Residents, Disability",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Wells Fargo Scholarship Program for People with Disabilities",
      description: "$2,500 scholarship for students with disabilities pursuing higher education by Wells Fargo.",
      providedBenefit: "$2,500 (full-time), $1,250 (half-time)",
      reqs: "High School Seniors & College Students, US Citizens, Permanent Residents, 3.0 GPA, Disability, Essay, Academic transcript",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "George H. Nofer Scholarship for Law and Public Policy",
      description: "$5,000 scholarship for graduate students with hearing loss pursuing law or public policy by Alexander Graham Bell Association.",
      providedBenefit: "$5,000",
      reqs: "Graduate Students, US Citizens, Law/Public Policy, Disability, Essay, Academic transcript, Recommendation letter",
      dueDate: "April 2024 (estimated)"
    }
  ],
  [
    {
      name: "BMO Capital Markets Lime Connect Equity Through Education Scholarship",
      description: "$10,000 scholarship for postsecondary students with disabilities pursuing Financial Services careers by Lime Connect.",
      providedBenefit: "$10,000",
      reqs: "College & Graduate Students, US Citizens, Canadian Citizens, Permanent Residents, Computer Science, Engineering, Math, Business, Disability, Essay, Academic transcript, Resume or CV, Letter of Recommendation",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Allegra Ford Thomas Scholarship",
      description: "$2,500 scholarship over two years for high school seniors with LD/ADHD enrolling in specialized programs by National Center for Learning Disabilities.",
      providedBenefit: "$2,500 ($5,000 over 2 years)",
      reqs: "High School Senior, Special Education, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Anne Ford Scholarship",
      description: "$2,500 scholarship renewable up to $10,000 for high school seniors with LD/ADHD pursuing bachelor’s degrees by National Center for Learning Disabilities.",
      providedBenefit: "$2,500 ($10,000 potential total)",
      reqs: "High School Senior, Special Education, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "National Institutes of Health (NIH) Undergraduate Scholarship",
      description: "$20,000 scholarship for college students pursuing health-related research careers by NIH Office of Intramural Training & Education.",
      providedBenefit: "$20,000",
      reqs: "High School Seniors & College Students, US Citizens, Permanent Residents, 3.3 GPA, Social Science, Healthcare, Low Income, Disability, First-Generation Student, LGBTQ+, Essay, Proof of enrollment, Academic transcript, Letter of Recommendation",
      dueDate: "April 2024 (estimated)"
    }
  ],
  [
    {
      name: "Varghese Summersett Autism Scholarship",
      description: "$500 scholarship for students aged 15 or younger with autism by Varghese Summersett PLLC.",
      providedBenefit: "$500",
      reqs: "High School Freshman & Sophomore, Disability, Letters of Recommendation, Essay, Letter or video stating how financial aid will benefit applicant",
      dueDate: "April 2024 (estimated)"
    },
    {
      name: "Lighthouse Guild College Bound Scholarship",
      description: "$8,500 scholarship for legally blind high school seniors becoming college freshmen by Lighthouse Guild.",
      providedBenefit: "$8,500",
      reqs: "High School Senior, US Citizens, Permanent Residents, Disability, 500-word essay, Academic transcript, Letter of Recommendation, Proof of legal blindness",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "P. Buckley Moss Endowed Scholarship",
      description: "$1,000 scholarship for high school seniors with language-related learning differences pursuing visual arts by P. Buckley Moss Foundation.",
      providedBenefit: "$1,000",
      reqs: "High School Senior, Visual & Performing Arts, Disability, 3 essays, Proof of enrollment, Academic transcript, Letters of Recommendation",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "Team Type 1 Global Ambassador Scholarship Program",
      description: "$10,000 scholarship for college athletes with Type-1 Diabetes playing sanctioned sports by Team Type 1 Foundation.",
      providedBenefit: "$10,000",
      reqs: "College Students, 3.0 GPA, Athletic, Disability, Essay",
      dueDate: "March 2024 (estimated)"
    }
  ],
  [
    {
      name: "Fred Scheigert Scholarship Program",
      description: "$3,000 scholarship for college & graduate students with low vision by Council of Citizens with Low Vision International.",
      providedBenefit: "$3,000",
      reqs: "College & Graduate Students, 3.2 GPA, Disability, 800-word essay, Proof of enrollment, Academic transcript, Letters of Recommendation",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "Microsoft Disability Scholarship",
      description: "$5,000 scholarship for high school seniors pursuing tech careers by Microsoft. Renewable up to $20,000.",
      providedBenefit: "$5,000",
      reqs: "High School Senior, US Citizens, Permanent Residents, DACA, 2.5 GPA, Computer Science, Business, Disability, 1,250-word essay, Academic transcript, Resume or CV, Letters of Recommendation",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "Carl J. Megel Special Education Scholarship",
      description: "$5,000 scholarship for special education high school seniors by Illinois Federation of Teachers.",
      providedBenefit: "$5,000",
      reqs: "High School Senior, Special Education, Disability, Essay on overcoming setbacks, Proof of enrollment, Academic transcript, Letter of Recommendation",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "AAHD Frederick J. Krause Scholarship",
      description: "$1,000 scholarship for college sophomores, juniors, seniors & grad students pursuing health and disability studies by American Association on Health & Disability.",
      providedBenefit: "$1,000",
      reqs: "College Sophomores, Juniors, Seniors & Grad Students, US Citizens, Permanent Residents, No GPA requirement, Healthcare, Disability, 2-page essay, Academic transcript, Letters of Recommendation",
      dueDate: "March 2024 (estimated)"
    }
  ],
  [
    {
      name: "ALA Century Scholarship",
      description: "$2,500 scholarship for graduate students in Library Science with disabilities by American Library Association.",
      providedBenefit: "$2,500",
      reqs: "Graduate Students, US Citizens, Canadian Citizens, Education, Interdisciplinary Studies, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "March 2024 (estimated)"
    },
    {
      name: "Joseph James Morelli Legacy Foundation Scholarship",
      description: "$500 - $2,500 scholarship for high school seniors/graduates with dyslexia pursuing STEM degrees by Joseph James Morelli Legacy Foundation.",
      providedBenefit: "$500 - $2,500",
      reqs: "High School Senior, Computer Science, Engineering, Electrical Engineering, Biology, Math, Disability, Essay, Academic transcript, Letter of Recommendation",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "Millie Brother Scholarship for Hearing Children of Deaf Adults",
      description: "Scholarships of varying amounts for college students who are children of deaf adults by Children of Deaf Adults, Inc.",
      providedBenefit: "Varies",
      reqs: "College Students, US Citizens, Canadian Citizens, Permanent Residents, DACA, Disability, 2-page essay, Academic transcript, Letters of Recommendation",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "Roadway Worker Memorial Scholarship Program",
      description: "$10,000 scholarship for college & graduate students related to fallen/disabled roadway workers by American Traffic Safety Services Foundation (ATSSA).",
      providedBenefit: "$10,000",
      reqs: "College & Graduate Students, Disability, 200-word essay, Academic transcript, Letters of Recommendation",
      dueDate: "February 2024 (estimated)"
    }
  ],
  [
    {
      name: "American Transmission Co. Scholarship",
      description: "$1,125 scholarship for college sophomores, juniors & seniors in CE and EE majors by Society of Women Engineers (SWE).",
      providedBenefit: "$1,125",
      reqs: "College Sophomores, Juniors & Seniors, US Citizens, 3.0, Civil Engineering, Electrical Engineering, Disability, Veteran, Women",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "Invenergy Women’s Network Scholarship",
      description: "$3,500 scholarship for college sophomores & juniors in CE, CET, EE, ET, EnvE, ME, and MET majors by Society of Women Engineers (SWE).",
      providedBenefit: "$3,500",
      reqs: "College Sophomores & Juniors, US Citizens, 3.0, Engineering, Low Income, Disability, Veteran, Women",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "American Council of the Blind’s (ACB) Scholarship Program",
      description: "$2,000 - $7,500 scholarship for college & graduate students who are legally blind by American Council of the Blind.",
      providedBenefit: "$2,000 - $7,500",
      reqs: "College & Graduate Students, 3.0, Disability",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "Diversity Law Scholarship",
      description: "$20,000 scholarship for graduate students in law, promoting diversity by Warner Norcross + Judd LLP.",
      providedBenefit: "$20,000",
      reqs: "Graduate Students, Law, Disability, LGBTQ+",
      dueDate: "February 2024 (estimated)"
    }
  ],
  [
    {
      name: "Matthew C. Graziadei Achievement Scholarship",
      description: "$1,500 scholarship for North Carolina high school seniors with disabilities by Exceptional Children's Assistance Center (ECAC).",
      providedBenefit: "$1,500",
      reqs: "High School Senior, US Citizens, No GPA requirement, Disability, North Carolina",
      dueDate: "February 2024 (estimated)"
    },
    {
      name: "Fred J. Epstein Youth Achievement Award",
      description: "$1,000 scholarship for accomplished students aged 19 or younger with learning disabilities or ADHD by Smart Kids with Learning Disabilities.",
      providedBenefit: "$1,000",
      reqs: "High School Students, Special Education, Athletic, Disability",
      dueDate: "January 2024 (estimated)"
    },
    {
      name: "AbbVie Immunology Scholarship",
      description: "$5,000 or $15,000 scholarship for postsecondary students with inflammatory diseases by AbbVie Immunology.",
      providedBenefit: "$5,000 - $15,000",
      reqs: "High School Seniors, College & Grad Students, US Citizens, Disability",
      dueDate: "December 2023 (estimated)"
    }
  ]
  
]


export default function Home() {
  //addResource function, if you want to use it uncomment the procedure in resource router
  const [curName, setCurName] = useState("");
  const { mutate } = api.resource.addResource.useMutation({
    onError: () => {
      console.log(curName)
    }
  });

  const user = useUser();

  const formatDate = (date: string) => {
    if (date === "") {
      return "January 1, 2025"
    }
    const ind = date.indexOf(" (estimated)")
    if (ind === -1) return date
    return date.substring(0, ind);
  }

  const addAllRecords = () => {
    if (typeof newData === "undefined") return
    for (let i = 0; i < newData.length; i++) {
      const arr = newData[i]
      if (typeof arr === "undefined") return
      for (let j = 0; j < arr.length; j++) {
        const elem = arr[j];
        if (!elem) return
        
        const name1 = elem.name;
        const description1 = elem.description;
        const reqs1 = elem.reqs;
        const benefit1 = elem.providedBenefit;
        const dueDate1 = formatDate(elem.dueDate);

        setCurName(elem.name)

        mutate({ name: name1, description: description1, reqs: reqs1, providedBenefit: benefit1, dueDate: dueDate1 })
      }
    }
  }

  const addOneRecord = () => {
    if (newData) {
      const arr = newData[0];
      if (arr) {
        const elem = arr[0];
        if (!elem) return;
        const name1 = elem.name;
        const description1 = elem.description;
        const reqs1 = elem.reqs;
        const benefit1 = elem.providedBenefit;
        const dueDate1 = formatDate(elem.dueDate);

        mutate({ name: name1, description: description1, reqs: reqs1, providedBenefit: benefit1, dueDate: dueDate1 })
      }
    }
  }

  //Method to add records to db
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

  // const addRecords = (name: string, description: string, providedBenefit: string) => {
  //   mutate({ name: name, description: description, providedBenefit: providedBenefit });
  //   console.log("Donezo")
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
            {/* <div>
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn && <UserButton />}
            </div> */}
            <div className="w-10/12 md:w-8/12">
              <AIChat isSignedIn={ user.isSignedIn ? user.isSignedIn : false } />
            </div>
            {/* <div className="flex flex-col items-center">
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
            </div> */}
          </div>
        </main>
      </Layout>
    </>
  );
}
