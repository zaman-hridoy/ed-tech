import PageTitle from "@/app/(marketing)/_components/section-title";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaCloudDownloadAlt, FaPaintBrush } from "react-icons/fa";
import { RiWifiOffFill } from "react-icons/ri";

const cards = [
  {
    title: "Instant Access",
    description: "Purchase and read your book immediately",
    icon: <FaCloudDownloadAlt className="w-10 h-10 text-slate-500" />,
  },
  {
    title: "Read Aloud",
    description: "Listen and follow along as Bookshelf reads to you",
    icon: <AiOutlinePlayCircle className="w-10 h-10 text-slate-500" />,
  },
  {
    title: "Read Offline",
    description: "Access your eTextbook anytime and anywhere",
    icon: <RiWifiOffFill className="w-10 h-10 text-slate-500" />,
  },
  {
    title: "Study Tools",
    description: "Built-in study tools like highlights and more",
    icon: <FaPaintBrush className="w-10 h-10 text-slate-500" />,
  },
];

const ETextBookFeatures = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <PageTitle title="eTextbook Features" />
      <div className="grid grid-cols-2 gap-4 text-center mt-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-4 rounded-md border shadow-md space-y-4 flex flex-col items-center justify-center"
          >
            <span>{card.icon}</span>
            <h4 className="text-slate-700 text-xl font-semibold">
              {card.title}
            </h4>
            <p className="text-slate-500 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ETextBookFeatures;
