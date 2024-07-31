import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import section_img from "@/public/pages/home/learing_resource.png";
import Image from "next/image";

const ponts = [
  "Individualized Digital Resources For Their Courses",
  "Connections To Experts Around The World",
  "A Personalized Academic Experience That Enhances And Reinforces The Key Concepts The Student Is Struggling With, Down To The Chapter Level",
  "Opportunities To Implement The Needed Resources To Fill Learning Gaps – Efficiently And Effectively",
  "Resources Based On Reliable And High-Quality Content Publishers That Align With Their Individual Learning Preferences",
];

const LearingResources = () => {
  return (
    <section className="py-12 select-none">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="Matching Students With Individualized Learning Resources" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 text-base md:text-lg font-normal tracking-tight">
            <p className="text-inherit">
              Just like Netflix suggests programming, SimpliTaught suggests the
              right content and digital resources based on students learning
              preferences.
            </p>
            <p className="text-inherit">
              Our platform takes the {`student's`} individualized learning
              preferences and cultivates classroom content in a collaborative
              space that supports <strong>the institution</strong>,{" "}
              <strong>the educators</strong>, and <strong>the students.</strong>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image src={section_img} alt="Learing Resources" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LearingResources;
