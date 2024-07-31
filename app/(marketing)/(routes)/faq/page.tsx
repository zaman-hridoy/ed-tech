import Container from "@/components/container";

import Image from "next/image";
import PageTitle from "../../_components/page-title";

import banner_img from "@/public/pages/faq/faq_banner.webp";
import faq_hero from "@/public/pages/faq/faq_hero.webp";

const FaqPage = () => {
  return (
    <div>
      <section className="pb-10">
        <Image
          src={banner_img}
          alt="Frequently Asked Questions About SimpliTaught"
          priority
          className="h-64 object-cover md:object-contain md:h-auto"
        />
        <div className="space-y-8 max-w-5xl mx-auto px-4 lg:px-5 pt-14">
          <PageTitle title="Frequently Asked Questions About SimpliTaught" />
        </div>

        <Container>
          <div className="flex items-center justify-center mt-12">
            <Image
              src={faq_hero}
              priority
              alt="Frequently Asked Questions About SimpliTaught"
              width={460}
              height={460}
            />
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              What is SimpliTaught?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              SimpliTaught is an online platform built to help students and
              educators get the most from learning. SimpliTaught curates digital
              content around popular textbooks, at a chapter level, to help
              students better understand the material. SimpliTaught also allows
              educators to curate digital content (e.g. YouTube videos) around
              specific textbook chapters.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              Is SimpliTaught free to use?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              Yes! Any content that is freely available in the public domain
              (e.g. YouTube videos) is free to view on SimpliTaught. Just create
              your free student login or a free educator login to access
              thousands of videos and other digital resources.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              How Does SimpliTaught Work?{" "}
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              Not every student learns the same way SimpliTaught provides
              tailored learning tools to fill learning gaps. Students log onto
              SimpliTaught, select their textbook and chapter, choose materials
              tailored to their individualized learning style, and start
              learning in a way that makes sense to THEM as a unique learner.
              Simple, isn’t it?
              <br />
              <br />
              Just like Netflix suggests programming to its subscribers,
              SimpliTaught uses Artificial Intelligence (AI) and Machine
              Learning (ML) algorithms to link students to the type of learning
              that helps them understand textbooks down to the chapter level.
              The SimpliTaught platform scours the public domain to find digital
              assets linked to key concepts being presented within a course, and
              delivers optimized recommendations to the student based on the
              quality of the resource and the individual learning preferences of
              the student. The more a student uses the platform, the more
              targeted the suggestions become.
              <br />
              <br />
              Students can also ‘follow’ certain educators they like and
              communicate with other students on the platform to promote a
              learning community and share helpful resources. Educators receive
              feedback on what students find helpful and where there is a gap in
              understanding materials allowing educators to tweak their lessons
              and the materials they curate. SimpliTaught also makes it easy for
              educators to create content right on the platform, or easily
              upload existing content so they don’t have to do twice the work.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              What is the difference between a “student” account and an
              “educator” account?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              Students can access content around textbook chapters to learn the
              material and can view/watch content curated by educators- they
              themselves cannot create or add learning content. Educators can
              curate content around textbooks chapters to share on the
              SimpliTaught platform.
              <br />
              <br />
              These accounts will be verified by SimpliTaught, as the platform
              only allows verified educators to curate content around textbook
              chapters. This ensures that all content is vetted by seasoned
              academics
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              I signed up as an Educator, but am unable to curate and publish
              content around any chapter.
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              Only those educators who have been “verified” can curate and
              publicly display a chapter curation. To become a verified
              educator, you must complete and submit the Educator Verification
              Form received via email at the time of sign up. Our team will
              review the information submitted, and reply with a decision in
              two-three business days.
              <br />
              <br />
              During this time, your Educator status remains “Unverified”.
              <br />
              <br />
              During this time, your Educator status remains “Unverified”. As an
              Unverified Educator, you can curate content around a chapter, but
              cannot publicly display it on SimpliTaught.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              How is SimpliTaught Different From a Learning Management System?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              A learning management system is a software application or
              web-based technology used to plan, implement, and assess a
              specific learning process. SimpliTaught has thousands of textbooks
              and curated teaching resources, but does not track or assess the
              learning progress of students.
              <br />
              <br />
              SimpliTaught is also social in nature, with a community chat and
              ‘follow’ features. This allows for cross university conversations
              where students can share information and follow/unfollow
              educators.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              Why Do College Students Benefit From Using SimpliTaught?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              SimpliTaught is a platform where students can access accurate
              information and alternative resources to those provided in the
              classroom in a single place. Rather than sift through unverified
              information from uncertain online sources, students are confident
              they are learning from accredited,
              <br /> verified educators from around the world. In addition, the
              learning resources are available to search on the SimpliTaught
              platform, saving hundreds of hours of unnecessary searching.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              Why Do Educators Benefit From Using SimpliTaught?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              SimpliTaught is a single platform where educators can store and
              share information on the courses they teach.. Educators receive
              feedback on what students find helpful and where there is a gap in
              understanding of the materials, allowing educators to tweak their
              lessons and the materials they curate.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              How Does an Educator Create Digital Teaching Resources?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              Resources can be created right in SimpliTaught or they can be
              created outside the platform and uploaded, such as YouTube videos.
              Being able to upload existing teaching content saves time for busy
              educators!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl text-slate-800 tracking-tight font-semibold">
              What is the Best Way to Connect With Students Online?
            </h3>
            <p className="text-sm lg:text-base text-slate-700 font-medium">
              There are many learning management systems available to teachers,
              but none of them allow direct communication with students like
              SimpliTaught. Our platform also provides educators with statistics
              on the usefulness of the resources they provide students.
              SimpliTaught is a community space where students can follow and
              unfollow teachers, and share information with them and other
              students to discuss course topics
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default FaqPage;
