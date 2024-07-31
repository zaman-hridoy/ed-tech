import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import section_img from "@/public/pages/home/succeed_with.png";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ponts = [
  "Improve Institutional Outcomes",
  "Increase Educator Effectiveness",
  "Engage Students With Targeted Resources Based On Their Individual Learning Preferences",
];
const SucceedWith = () => {
  return (
    <section className="py-12 select-none">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="Succeed With SimpliTaught" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <p className="text-base md:text-lg tracking-tight text-[var(--brand-color)] font-[500]">
                SimpliTaught is a content curation and collaboration ecosystem
                that leverages digital assets from the public domain to:
              </p>
              {ponts.map((point, idx) => (
                <div key={idx} className="flex items-start gap-x-2">
                  <ArrowRightCircle className="shrink-0 w-5 h-5 text-[var(--brand-color)] mt-1" />

                  <div className="text-base md:text-lg tracking-tight text-slate-800 font-[500]">
                    {point}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Image src={section_img} alt="succeed with" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-x-2">
              <Link
                href="/about"
                className={`
                w-fit gap-x-2 py-1 whitespace-nowrap relative font-semibold text-sm lg:text-base text-[var(--brand-color)]
                before:absolute before:w-0 before:h-[3px] before:bg-[var(--brand-color)] before:bottom-1
                hover:before:w-full hover:before:transition-all hover:before:duration-500 transition-all
              `}
              >
                Learn more about <strong>SinpliTaught</strong>
              </Link>
              <ArrowRight className="w-4 h-4 text-[var(--brand-color)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SucceedWith;
