import PageTitle from "@/app/(marketing)/_components/section-title";
import Container from "@/components/container";
import content_img from "@/public/pages/home/flip/content-creator.png";
import educator_img from "@/public/pages/home/flip/educator.jpg";
import institution_img from "@/public/pages/home/flip/institutions.jpg";
import student_img from "@/public/pages/home/flip/student.jpg";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidInstitution } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";

const cards = [
  {
    img_url: student_img,
    icon: (
      <FaUserGraduate className="shrink-0 w-5 h-5 md:w-7 md:h-7 text-[var(--brand-color-success)]" />
    ),
    label: "Students",
    page_link: "/solution-for-students",
    description:
      "SimpliTaught works with the student to truly understand their individual learning preferences...",
  },
  {
    img_url: educator_img,
    icon: (
      <GiTeacher className="shrink-0 w-5 h-5 md:w-7 md:h-7 text-[var(--brand-color-success)]" />
    ),
    label: "Educators",
    page_link: "/solution-for-educators",
    description:
      "Makes It Easy For Educators To Create, Upload, And Store Learning Materials...",
  },
  {
    img_url: content_img,
    icon: (
      <FaChalkboardTeacher className="shrink-0 w-5 h-5 md:w-7 md:h-7 text-[var(--brand-color-success)]" />
    ),
    label: "Content Creator",
    page_link: "/solution-for-content-creators",
    description:
      "Whether educators or content creators want to create and share content or simply want to expand their brand...",
  },
  {
    img_url: institution_img,
    icon: (
      <BiSolidInstitution className="shrink-0 w-5 h-5 md:w-7 md:h-7 text-[var(--brand-color-success)]" />
    ),
    label: "Institutions",
    page_link: "/solution-for-institutions",
    description:
      "Through Artificial Intelligence and Machine Learning solutions, we enable institutions to help...",
  },
];

const SimplitaughtFor = () => {
  return (
    <section className="py-12 select-none">
      <Container className="space-y-12 max-w-5xl mx-auto">
        <PageTitle title="Who Did We Make SimpliTaught For?" />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.page_link}
              className="relative h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] group overflow-hidden rounded-xl shadow-md"
            >
              <Image
                src={card.img_url}
                fill
                className="object-cover"
                alt={card.label}
                sizes="100%"
              />
              <div className="bg-black/50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-3">
                <div className="bg-white rounded-full p-2 md:p-3">
                  {card.icon}
                </div>
                <span className="text-base md:text-xl lg:text-3xl tracking-tight text-white">
                  {card.label}
                </span>
              </div>
              <div
                className={`
                    absolute top-full left-0 p-4 w-full h-full bg-white cursor-pointer
                    flex flex-col items-center justify-center gap-y-10 text-center
                    group-hover:top-0 transition-all duration-500
                `}
              >
                <p className="text-sm md:text-base text-slate-700 tracking-tight line-clamp-5 text-left">
                  {card.description}
                </p>
                <button className="border border-[var(--brand-color-secondary)] text-[var(--brand-color-secondary)] rounded-full px-2 md:px-4 py-2 text-xs md:text-sm hover:bg-[var(--brand-color-secondary)] hover:text-white transition-all">
                  <Link
                    href={card.page_link}
                    className="flex items-center gap-x-2"
                  >
                    Learn more <ArrowRight className="w-4 h-4 text-inherit" />
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SimplitaughtFor;
