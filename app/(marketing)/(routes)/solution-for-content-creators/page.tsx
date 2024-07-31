import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";
import SectionTitle from "../../_components/section-title";

import banner_img from "@/public/pages/content-creator/content_creator.webp";
import hero_image from "@/public/pages/content-creator/content_creator_hero.webp";
import individual_instructor from "@/public/pages/content-creator/individual_instructor.webp";
import publishing_companies from "@/public/pages/content-creator/publishing_companies.webp";

const ContentCreatorPage = () => {
  return (
    <div>
      <section className="pb-14">
        <Image
          src={banner_img}
          alt="Solution for Content Creators"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-4 max-w-4xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="The SimpliTaught Solution for" />

          <h2 className="text-slate-800 font-bold text-5xl lg:text-8xl tracking-tight text-center">
            Content Creators
          </h2>

          <p className="text-sm lg:text-xl text-slate-800 font-medium text-center">
            Through AI-driven algorithms, SimpliTaught helps content creators
            produce content, share it, and reach wider audiences.
          </p>
        </div>

        <Container>
          <div className="mt-10">
            <Image
              src={hero_image}
              alt="Solution for Content Creators"
              priority
            />
          </div>
        </Container>
      </section>

      {/* section 1 */}
      <section className="py-14 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SectionTitle title="Individual Instructor & Want To Publish Content?" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                We enable you to create and publish content via SimpliTaught’s
                platform to help students in their educational journey and
                contribute to their success. Partner with SimpliTaught and
                produce an entire course or concept-level experience for
                learners and other educators without significant, up-front
                expenditure. Reach broader audiences of students, educators, and
                institutions with us!
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <Image
                src={individual_instructor}
                alt="Individual Instructor & Want To Publish Content?"
                priority
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
                src={publishing_companies}
                alt="Content Publishing Companies"
                priority
              />
            </div>
            <div className="space-y-6 flex flex-col items-center justify-center">
              <SectionTitle title="Content Publishing Companies" />
              <p className="text-base md:text-xl tracking-tight text-slate-800 font-medium">
                We support publishing entities and other professional
                organizations seeking to aid learners student success in their
                pursuit of subject knowledge and career development The
                relationship with SimpliTaught gives them a broader scope and
                access to a large number of students.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContentCreatorPage;
