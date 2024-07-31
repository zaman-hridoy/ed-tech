import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import key_concept_img from "@/public/pages/home/key_concept.webp";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

const ponts = [
  "Individualized Digital Resources For Their Courses",
  "Connections To Experts Around The World",
  "A Personalized Academic Experience That Enhances And Reinforces The Key Concepts The Student Is Struggling With, Down To The Chapter Level",
  "Opportunities To Implement The Needed Resources To Fill Learning Gaps – Efficiently And Effectively",
  "Resources Based On Reliable And High-Quality Content Publishers That Align With Their Individual Learning Preferences",
];

const AiTechnology = () => {
  return (
    <section className="py-12 select-none bg-white">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="Using AI Technology, SimpliTaught Provides Students With" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center">
            <Image src={key_concept_img} alt="Ai" />
          </div>
          <div className="space-y-2">
            {ponts.map((point, idx) => (
              <div key={idx} className="flex items-start gap-x-2">
                <ArrowRightCircle className="shrink-0 w-5 h-5 text-[var(--brand-color)] mt-1" />

                <div className="text-base md:text-lg tracking-tight text-slate-800 font-[500]">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AiTechnology;
