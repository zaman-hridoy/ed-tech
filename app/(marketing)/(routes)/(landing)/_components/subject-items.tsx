import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    image: "business.png",
    amount: "154,818 eTextbooks",
    label: "Business & Economics",
  },
  {
    image: "education.png",
    amount: "79,609 eTextbooks",
    label: "Education",
  },

  {
    image: "mathematics.png",
    amount: "37,381 eTextbooks",
    label: "Mathematics",
  },

  {
    image: "medical.png",
    amount: "100,980 eTextbooks",
    label: "Medical",
  },

  {
    image: "psychology.png",
    amount: "56,536 eTextbooks",
    label: "Psychology",
  },

  {
    image: "science.png",
    amount: "130,573 eTextbooks",
    label: "Science",
  },
];
const SubjectItems = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Link
          href={`/text-books/${encodeURIComponent(card.label)}`}
          key={card.label}
          className="group overflow-hidden rounded-xl shadow-md bg-white"
        >
          <div className="relative aspect-video">
            <Image
              src={`/pages/home/topic_img/new/${card.image}`}
              fill
              className="object-cover group-hover:scale-110 transition-all duration-500"
              alt={card.label}
              sizes="100%"
              priority
            />
          </div>
          <div className="w-full flex flex-col space-y-2 p-4">
            <h3 className="text-base md:text-xl lg:text-2xl tracking-tight text-zinc-500 font-bold">
              {card.label}
            </h3>
            <span className="text-xs md:text-sm tracking-tight font-semibold text-zinc-800">
              {card.amount}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SubjectItems;
