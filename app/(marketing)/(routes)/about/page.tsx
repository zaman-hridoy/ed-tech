import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";

import banner_img from "@/public/pages/about/about_banner.webp";
import educator_img from "@/public/pages/about/educator.png";
import student_img from "@/public/pages/about/student.png";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import about_process_1 from "@/public/pages/about/about_process_1.webp";
import about_process_2 from "@/public/pages/about/about_process_2.webp";
import about_process_3 from "@/public/pages/about/about_process_3.webp";
import curration from "@/public/pages/about/flowchart.png";
import SubSectionTitle from "../../_components/sub-section-title";

import learing_resources from "@/public/pages/about/learing_resources.webp";
import premium from "@/public/pages/about/premium.webp";
import recommendations from "@/public/pages/about/recommendations.webp";
import students from "@/public/pages/about/students.webp";

const AboutPage = () => {
  return (
    <div>
      <section className="pb-14 bg-white">
        <Image
          src={banner_img}
          alt="About Simplitaught"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-4 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="About SimpliTaught" />

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            SimpliTaught is a content curation and collaboration platform that
            supports both educators and students. Using AI technology, we
            identify and recommend digital resources to support key concepts
          </p>
        </div>
      </section>

      {/* section 2 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SectionTitle title="Student" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Students are learning in class, whether in-person, hybrid, or
                online.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Our platform adapts the learning experience to students
                individualized learning preferences. SimpliTaught is the
                first-to-market in this space to provide this level of support
                and resources to students.
              </p>

              <div className="mt-12 w-full">
                <div className="flex items-center gap-x-2">
                  <Link
                    href="/solution-for-students"
                    className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
                  >
                    Learn more about <strong>Students</strong>
                  </Link>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image
                src={student_img}
                alt="Student"
                width={450}
                height={450}
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 3 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SectionTitle title="Educator" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                SimpliTaught is an all-in-one platform for creating, uploading,
                storing and improving online learning tools such as videos,
                lecture slides, syllabi, and course notes. We provide access to
                students around the world and collaboration tools for working
                with other educators.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Our feedback process allows educators to see what works and what
                doesn’t by providing real data on what learning tools students
                are utilizing, allowing continuous improvement to their teaching
                models over time.
              </p>

              <div className="mt-12 w-full">
                <div className="flex items-center gap-x-2">
                  <Link
                    href="/solution-for-educators"
                    className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
                  >
                    Learn more about <strong>Educators</strong>
                  </Link>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={educator_img}
                alt="Educator"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionTitle title="Our History & Leadership" />

          <div className="relative px-6">
            <div className="absolute -bottom-1 -right-2 flex">
              <svg
                width="20"
                height="30"
                viewBox="0 0 32 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 1H6C3.23858 1 1 3.23858 1 6V68.9289C1 70.255 1.52678 71.5268 2.46447 72.4645L22.4645 92.4645C25.6143 95.6143 31 93.3835 31 88.9289V6C31 3.23858 28.7614 1 26 1Z"
                  stroke="#212CE6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="20"
                height="30"
                viewBox="0 0 32 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 1H6C3.23858 1 1 3.23858 1 6V68.9289C1 70.255 1.52678 71.5268 2.46447 72.4645L22.4645 92.4645C25.6143 95.6143 31 93.3835 31 88.9289V6C31 3.23858 28.7614 1 26 1Z"
                  stroke="#212CE6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="absolute -top-1 -left-2 flex">
              <svg
                width="20"
                height="30"
                viewBox="0 0 32 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 1H6C3.23858 1 1 3.23858 1 6V68.9289C1 70.255 1.52678 71.5268 2.46447 72.4645L22.4645 92.4645C25.6143 95.6143 31 93.3835 31 88.9289V6C31 3.23858 28.7614 1 26 1Z"
                  stroke="#212CE6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="20"
                height="30"
                viewBox="0 0 32 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 1H6C3.23858 1 1 3.23858 1 6V68.9289C1 70.255 1.52678 71.5268 2.46447 72.4645L22.4645 92.4645C25.6143 95.6143 31 93.3835 31 88.9289V6C31 3.23858 28.7614 1 26 1Z"
                  stroke="#212CE6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="space-y-8 mt-14 text-center">
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                We started on a mission in 2019 when one of our founders, Ali,
                noticed the lack of attention his daughter was receiving in the
                classroom and her subsequent lack of course comprehension.
                Through further research, he learned that in many classroom
                scenarios, educators are only getting through to 20% of the
                students with the material they are teaching.
              </p>
              <h4 className="text-xl md:text-2xl tracking-tight text-[var(--brand-color)] font-medium">
                To this massive gap in the educational system, Ali decided to
                pioneer a solution.
              </h4>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Utilizing nearly 25 years of tech industry experience, including
                launching several start-ups and serving in executive leadership
                roles for Fortune 500 tech companies{" "}
                <strong className="text-[var(--brand-color)]">
                  Ali founded SimpliTaught.
                </strong>
              </p>

              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                {`During initial research stages, the founding team noticed most
              reading material provided in schools do not have any accompanying
              digital resources. For those 80% of students who do not understand
              the provided content, there were no alternative resources. And
              with college and trade school students working an average of 4.7
              hours per day in the US and studying 2.3 hours per day outside of
              their classes, there aren't enough hours in the day for students
              to spend time searching for alternative useful course resources.`}
              </p>

              <p className="text-base md:text-xl tracking-tight text-slate-800 font-semibold">
                The solution was to create the SimpliTaught Education AI &
                Machine Learning Technology to enhance courses and reinforce key
                concepts that students are finding difficult.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Formally established in 2021, SimpliTaught is an emerging
                organization with an executive leadership team based in the
                United States and development & content management teams out of
                their office in Pakistan.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Our mission is to actualize and personalize a global community
                of learning, representing all stakeholders in the academic
                ecosystem, interconnected by SimpliTaught technologies.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white">
        <Container>
          <SectionTitle title="Technology & Process" />

          <div className="pt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={about_process_1}
                alt="Step 1: Data is Collected from Around the World in SimpliTaught’s Cloud"
                priority
                fill
                sizes="100%"
              />

              <div className="relative flex flex-col items-end justify-end h-full p-4 bg-gradient-to-t from-black/50">
                <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                  Step 1: Data is Collected from Around the World in
                  SimpliTaught’s Cloud
                </p>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={about_process_2}
                alt="Step 2: Data is Processed Via an AI + ML Engine"
                priority
                fill
                sizes="100%"
              />

              <div className="relative flex flex-col items-end justify-end h-full p-4 bg-gradient-to-t from-black/50">
                <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                  Step 2: Data is Processed Via an AI + ML Engine
                </p>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={about_process_3}
                alt="Step 3: Processed Data is Served to Users in Personalized Curations"
                priority
                fill
                sizes="100%"
              />

              <div className="relative flex flex-col items-end justify-end h-full p-4 bg-gradient-to-t from-black/50">
                <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                  Step 3: Processed Data is Served to Users in Personalized
                  Curations
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionTitle title="Elements of the SimpliTaught Platform" />

          <div className="mt-14">
            <Image src={curration} alt="ST Model" priority />
          </div>
        </Container>
      </section>

      <div className="pt-16 bg-white">
        <SectionTitle title="What Makes SimpliTaught The Best Supplemental Online Learning Platform?" />
      </div>
      {/* section 4 */}
      <section className="pt-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="Custom Curated Learning Resources:" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                {`We provide custom curated resources around critical learning
                concepts. Additionally, digital materials are structured and
                mapped around student's needs and study behaviors to supplement
                their learning curves. This customized curation gives learners a
                personalized experience, allowing them to learn at their own
                speed.`}
              </p>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={learing_resources}
                alt="Custom Curated Learning Resources"
                width={450}
                height={450}
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image
                src={recommendations}
                alt="SimpliTaught Smart Recommendations"
                width={450}
                height={450}
                priority
              />
            </div>
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="SimpliTaught Smart Recommendations:" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                SimpliTaught provides content recommendations to students based
                on their preferences, which the system learns over time with our
                AI and machine learning technology. Our content curation and
                collaboration ecosystem create a unique personalized learning
                environment for learners, which also benefits educators, content
                creators and institutions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="Premium Content:" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Premium content in the form of video lectures, courses, lesson
                plans, books, etc. from highly qualified educators and faculty
                worldwide is just a click away on SimpliTaught’s platform.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image src={premium} alt="Premium Content" priority />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col">
              <Image
                src={students}
                alt="SimpliTaught Was Made For Students"
                priority
              />
            </div>
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="SimpliTaught Was Made For Students:" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Premium content in the form of video lectures, courses, lesson
                plans, books, etc. from highly qualified educators and faculty
                worldwide is just a click away on SimpliTaught’s platform.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionTitle title="SimpliTaught Can Work For Any Learning Environment!" />
          <div className="space-y-4 mt-14">
            {[
              "Fully online learning environment via learning management system – with a video meeting tool like Zoom.",
              "Hybrid: some online and some in person.",
              "Traditional classroom environment: supported by a learning management system, but still might do some tests in the online environment.",
              "Lecture based classes with no learning management system component",
            ].map((text, idx) => (
              <div key={idx + 1} className="flex gap-x-4">
                <div className="py-1">
                  <ArrowRightCircle className="w-6 h-6 text-[var(--brand-color)] shrink-0" />
                </div>
                <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
