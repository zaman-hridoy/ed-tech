"use client";

import { formatPrice } from "@/lib/helper-methods";
import { VitalVarientsType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FiCircle } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";

const renderDuration = (duration: string) => {
  if (duration === "perpetual") return "Lifetime";
  if (duration === "365") return "1 Year";
  return duration + " Days";
};

interface Props {
  variant: VitalVarientsType;
  isSelected: boolean;
  onSelect: () => void;
}

const PriceItem = ({ variant, isSelected, onSelect }: Props) => {
  const digitalPrice = variant.prices.find(
    (price) => price.type === "digital-list-price" && price.currency === "USD"
  );

  return (
    <button
      className={cn(
        "flex items-center text-sm md:text-base font-semibold tracking-tight text-zinc-800 border-2 rounded-md px-4 py-2 w-full",
        isSelected &&
          "border-[var(--brand-color)] text-[var(--brand-color)] transition-all"
      )}
      onClick={onSelect}
    >
      {isSelected ? (
        <IoMdCheckmarkCircle className="w-5 h-5 mr-2" />
      ) : (
        <FiCircle className="w-4 h-4 mr-2" />
      )}
      {renderDuration(variant.duration)}
      {digitalPrice && (
        <span className="ml-auto">{formatPrice(+digitalPrice?.value)}</span>
      )}
    </button>
  );
};

export default PriceItem;
