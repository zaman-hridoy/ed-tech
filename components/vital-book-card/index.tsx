import { formatPrice, renderEdition } from "@/lib/helper-methods";
import { VitalBookType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface Props {
  book: VitalBookType;
  isPurchased?: boolean;
  borderRounded?: boolean;
  ownership_type?: "rented" | "lifetime";
}

const VitalBookCard = ({
  book,
  isPurchased = false,
  borderRounded = false,
  ownership_type,
}: Props) => {
  const sortedVariants = book.variants.sort((a, b) =>
    Number(a.online_duration) > Number(b.online_duration) ? 1 : -1
  );

  const variantsWithUsdPrice = sortedVariants.map((v) => ({
    ...v,
    price: v.prices.find(
      (p) => p.currency === "USD" && p.type === "digital-list-price"
    ),
  }));

  const renderPrice = () => {
    if (
      variantsWithUsdPrice.length === 0 &&
      variantsWithUsdPrice[0]?.price?.value
    ) {
      return formatPrice(+variantsWithUsdPrice[0]?.price?.value);
    } else {
      const firstEl = variantsWithUsdPrice[0]?.price?.value;
      const lastEl =
        variantsWithUsdPrice[variantsWithUsdPrice.length - 1]?.price?.value;

      if (firstEl && lastEl) {
        if (+firstEl < +lastEl) {
          return (
            <span>
              {formatPrice(+firstEl)} - {formatPrice(+lastEl)}
            </span>
          );
        } else {
          return <span>{formatPrice(+firstEl)}</span>;
        }
      } else {
        return null;
      }
    }
  };

  const resource_link = isPurchased
    ? `/ebook-reader/${book.vbid}`
    : `/text-books/details/${book.vbid}`;

  return (
    <Link
      href={resource_link}
      className={cn(
        "border p-4 bg-white space-y-2",
        borderRounded && "rounded-md drop-shadow-md"
      )}
    >
      <div className="aspect-[5/6] relative bg-slate-100">
        <Image
          src={book.resource_links.cover_image}
          alt={book.title}
          fill
          priority
          sizes="100%"
          className="object-contain"
        />
      </div>
      <div>
        <h2 className="text-base font-medium text-zinc-800 tracking-tight">
          {book.title}
        </h2>
        <p className="text-sm text-zinc-500">
          by {book.contributors.map((c) => c.name).join(", ")}
        </p>
        <p className="text-sm text-zinc-500">
          Edition: {renderEdition(book.edition)}
        </p>
        <p className="text-sm text-zinc-500">Format: {book.format}</p>
      </div>
      {!isPurchased && <div className="mt-4">{renderPrice()} USD</div>}
      {isPurchased && ownership_type && (
        <div className="mt-4">
          <Badge className="capitalize text-sm bg-[var(--brand-color)] hover:bg-[var(--brand-color)]">
            {ownership_type}
          </Badge>
        </div>
      )}
    </Link>
  );
};

export default VitalBookCard;
