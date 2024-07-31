import Container from "@/components/container";
import banner_user from "@/public/pages/home/banner_person.webp";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import bann2 from '../_images/banner-user.png'

const BannerSection = () => {
  return (
    <section className="bg-white select-none h-auto lg:min-h-[590px] pb-12 lg:pb-0 pt-[60px] lg:pt-[70px] xl:pt-[80px] flex flex-col">
      <Container className="h-full pt-14 flex-1 max-w-7xl pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="h-full flex flex-col items-center lg:items-start lg:text-left justify-center gap-y-10 text-center">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-normal">
                We Help to{" "}
                <span className="relative mx-1 mr-2">
                  <span
                    className="block absolute -inset-1 -skew-y-3 bg-[var(--brand-color-success)]"
                    aria-hidden="true"
                  ></span>
                  <span className="relative text-white">Build</span>
                </span>
                Your Dream
              </h1>
              <h2 className="text-base md:text-xl font-normal">
                Learn textbook{" "}
                <span className="italic text-[var(--brand-color)] font-semibold">
                  Key Concepts
                </span>{" "}
                from{" "}
                <span className="italic text-[var(--brand-color)] font-semibold">
                  Educators
                </span>{" "}
                &{" "}
                <span className="italic text-[var(--brand-color)] font-semibold">
                  Content Creators
                </span>{" "}
                based on your learning preferences.
              </h2>
            </div>
            <div className="flex items-center gap-x-4">
              <button className="border-none bg-[var(--brand-color)] text-white rounded-full px-4 py-2 text-sm">
                Sign up FREE
              </button>
              <button className="border border-[var(--brand-color-secondary)] text-[var(--brand-color-secondary)] rounded-full px-4 py-2 text-sm  hover:bg-[var(--brand-color-secondary)] hover:text-white transition-all">
                <Link
                  href="/solution-for-students"
                  className="flex items-center gap-x-2"
                >
                  Learn more <ArrowRight className="w-4 h-4 text-inherit" />
                </Link>
              </button>
            </div>
          </div>

          {/* person */}
          <div className="hidden lg:flex items-center justify-end overflow-hidden">
            <Image
              src={banner_user}
              alt="Banner User"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BannerSection;
