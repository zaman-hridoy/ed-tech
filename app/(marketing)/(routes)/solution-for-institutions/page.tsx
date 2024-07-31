import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";

import banner_img from "@/public/pages/institutions/Institution.webp";
import benefits from "@/public/pages/institutions/benefits.png";
import hero_image from "@/public/pages/institutions/hero_image.webp";
import instructor from "@/public/pages/institutions/instructor.webp";
import support from "@/public/pages/institutions/support.webp";
import { ArrowRightCircle } from "lucide-react";

const InstitutionsPage = () => {
  return (
    <div>
      <section className="pb-14">
        <Image
          src={banner_img}
          alt="Solution for Institutions"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-4 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="The SimpliTaught Solution for" />

          <h2 className="text-slate-800 font-bold text-5xl lg:text-8xl tracking-tight text-center">
            Institutions
          </h2>

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            The success of an Institution depends on the success of its students
            and educators, and SimpliTaught finally provides the perfect
            platform for both! Institutions that employ SimpliTaught technology
            are choosing to place a powerful tool of success directly into the
            hands of their student and instructor population.
          </p>
        </div>

        <Container>
          <div className="mt-10">
            <Image src={hero_image} alt="Solution for Institutions" priority />
          </div>
        </Container>
      </section>

      {/* section 1 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col justify-center">
              <SectionTitle title="The SimpliTaught Benefits for Institutions" />
              <div className="space-y-4">
                {[
                  `A more engaging student experience`,
                  `Improved use of educator time`,
                  `Reduced course failure rates`,
                  `Reduced dropout rates`,
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
            </div>
            <div className="flex items-center justify-center flex-col">
              <Image
                src={benefits}
                alt="The SimpliTaught Benefits for Institutions"
                priority
                width={450}
                height={450}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 2 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image
                src={support}
                alt="Supporting Students & Instructors WIth Shared Digital Resources"
                priority
              />
            </div>
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SectionTitle title="Supporting Students & Instructors WIth Shared Digital Resources" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                The main priority of SimpliTaught is the success of the
                students. SimpliTaught is the first to market in this space to
                provide support to students. Providing high quality,
                individualized resources to support student learning is the most
                valuable piece of the SimpliTaught method.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                With curated, accurate resources at the tip of their fingers,
                students have a say in how they learn material and can navigate
                a path to success on the SimpliTaught platform. Those who are
                struggling to learn with the materials provided are shown
                additional resources better suited to their learning needs
                through AI solutions, a wide network of additional digital
                resources, and educators beyond their own institutional
                offering.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* section 3 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SectionTitle title="Student and Instructor's Support" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                The social connection enabled through chat features and
                collaboration mean students can communicate with other students
                and with the educators on our platform. This shared space of
                digital resources benefits institutions by increasing student
                success and by providing feedback from the platform on the most
                successful educators, digital resources, and teaching
                methodologies.
              </p>
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Educators can find useful resources with little time wasted, and
                can collaborate with other departments or even other
                institutions to explore new ideas and practices for course
                content and effective teaching.
              </p>
            </div>

            <div className="flex items-center justify-center flex-col">
              <Image
                src={instructor}
                alt="Student and Instructor's Support"
                priority
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default InstitutionsPage;
