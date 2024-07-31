import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import section_img from "@/public/pages/home/learing_preference.png";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ponts = [
  {
    title: "What Do We Do?",
    subtitle:
      "Using Artificial Intelligence (AI) and Machine Learning (ML) algorithms, our platform links students to the type of learning that helps them best understand their textbooks down to the chapter level.",
  },
  {
    title: "How Do We Do It?",
    subtitle:
      "The SimpliTaught platform scours the public domain to find the digital assets linked to the key concepts being presented within a course.",
  },
  {
    title: "What Comes Next?",
    subtitle:
      "We then deliver the optimized recommendations to the student based on (a) the quality of the resource and (b) the individual learning preferences of the student.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="py-12 select-none bg-white">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="Using AI Technology, SimpliTaught Provides Students With" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex items-center justify-center">
              <Image src={section_img} alt="learing preference" />
            </div>
            <div className="space-y-2">
              {ponts.map((point, idx) => (
                <div key={idx} className="flex items-start gap-x-2">
                  <ArrowRightCircle className="shrink-0 w-5 h-5 text-[var(--brand-color)] mt-1" />

                  <div>
                    <div className="text-base md:text-lg tracking-tight text-[var(--brand-color)] font-semibold">
                      {point.title}
                    </div>
                    <div className="text-base md:text-lg tracking-tight text-slate-800 font-[500]">
                      {point.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-x-2">
              <Link
                href="#"
                className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
              >
                Learn more about <strong>AI & ML Model</strong>
              </Link>
              <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatWeDo;
