import PageTitle from "@/app/(marketing)/_components/section-title";
import anu_img from "@/public/pages/home/university_logos/anu.png";
import bu_img from "@/public/pages/home/university_logos/bu.png";
import mit_img from "@/public/pages/home/university_logos/mit.png";
import msud_img from "@/public/pages/home/university_logos/msud.jpg";
import ru_img from "@/public/pages/home/university_logos/ru.png";
import yu_img from "@/public/pages/home/university_logos/yu.png";
import Image from "next/image";

const cards = [
  {
    id: 1,
    logo: anu_img,
  },
  {
    id: 2,
    logo: bu_img,
  },
  {
    id: 3,
    logo: mit_img,
  },
  {
    id: 4,
    logo: yu_img,
  },
  {
    id: 5,
    logo: msud_img,
  },
  {
    id: 6,
    logo: ru_img,
  },
];

const UniversitiesSection = () => {
  return (
    <section className="py-12 select-none space-y-12">
      <PageTitle title="Universities Our Student's Study At" />
      <div className="flex items-center justify-center flex-wrap gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative h-[90px] min-w-[150px] overflow-hidden flex items-center justify-center rounded-xl shadow-md bg-white p-2"
          >
            <div className="relative h-[90px] w-[90px]">
              <Image
                src={card.logo}
                fill
                className="object-contain"
                alt="University"
                sizes="100%"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniversitiesSection;
