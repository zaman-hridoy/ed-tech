import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";

import banner_img from "@/public/pages/what-is-st/banner.png";
import SubSectionTitle from "../../_components/sub-section-title";

import custom_curations from "@/public/pages/what-is-st/custom_curations.png";
import laptop_middle from "@/public/pages/what-is-st/laptop.png";
import laptop_left from "@/public/pages/what-is-st/left_laptop.png";
import premium from "@/public/pages/what-is-st/premium.png";
import recommendations from "@/public/pages/what-is-st/recommendations.png";
import laptop_right from "@/public/pages/what-is-st/right_laptop.png";

const WhatIsStPage = () => {
  return (
    <div>
      <section className="pb-10 bg-white">
        <Image
          src={banner_img}
          alt="What is SimpliTaught?"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-8 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="What is ST?" />

          <h2 className="text-slate-800 font-bold text-2xl lg:text-4xl tracking-tight text-center">
            A complete platform for Learning & Teaching
          </h2>

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            SimpliTaught is an online learning platform that adapts the learning
            experience to your individualized learning preferences. We bring
            together the best available resources on key learning concepts to
            help you learn, curate, and collaborate
          </p>
        </div>

        <Container>
          <div className="relative mt-12">
            <div className="absolute top-0 left-0 w-1/3">
              <Image src={laptop_left} priority alt="St Platform" />
            </div>
            <div className="absolute top-0 right-0 w-1/3">
              <Image src={laptop_right} priority alt="St Platform" />
            </div>
            <Image
              src={laptop_middle}
              priority
              alt="St Platform"
              className="relative"
            />
          </div>
        </Container>
      </section>

      <div className="pt-16">
        <SectionTitle title="Learning Ecosystem" />
      </div>

      {/* section 2 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="Custom Curations" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                We provide custom curations around critical learning concepts.
                Additionally, all the digital resources are structured and
                mapped around students’ needs and study behaviors to supplement
                their learning curves. This customized curation gives learners a
                personalized experience, allowing them to study at their own
                speed.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image src={custom_curations} alt="Custom Curations" priority />
            </div>
          </div>
        </Container>
      </section>

      {/* section 3 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="SimpliTaught Recommendations" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                SimpliTaught provides content recommendations and recommended
                educators to students based on their preferences to support
                learning. Hence, our content curation and collaboration
                ecosystem create a unique personalized learning environment for
                learners, educators, content creators, and institutions.
              </p>
            </div>
            <div className="flex items-center justify-center flex-col order-first lg:order-last">
              <Image
                src={recommendations}
                alt="SimpliTaught Recommendations"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* section 4 */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex items-center justify-center flex-col order-last lg:order-first">
              <Image
                src={premium}
                alt="Premium Content from Creators"
                priority
              />
            </div>
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SubSectionTitle title="Premium Content from Creators" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                Premium content in the form of video lectures, courses, lesson
                plans, books, etc from highly qualified educators and faculty
                worldwide is just a click away on SimpliTaught’s platform. We
                let students enjoy the liberty of choosing an educator or
                content creator more in sync with their learning needs.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default WhatIsStPage;
