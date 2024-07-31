import Container from "@/components/container";
import { ModalTemplate } from "@/components/modal-template";
import { renderEdition } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { VitalBookType } from "@/lib/types";
import Image from "next/image";
import BackBtn from "./_components/back-btn";
import BookMetaSection from "./_components/book-meta-section";
import ETextBookFeatures from "./_components/etext-book-features";
import RentBuyCard from "./_components/rent-buy-card";
import ShareBook from "./_components/share-book";

interface Props {
  params: {
    vbid: string;
  };
}

const BookDetailsPage = async ({ params }: Props) => {
  const vbid = params.vbid;
  let book: VitalBookType | null = null;
  try {
    const res = await axios.get(`/content/getVitalSourcebyVBid/${vbid}`);
    if (res.data?.book) {
      book = res.data?.book;
    }
  } catch (error) {
    console.log(error);
  }

  if (!book) {
    return (
      <div className="h-[70vh]">
        <ModalTemplate title="Not Found" description="Book not found" />
      </div>
    );
  }

  // const sortedVariants = book.variants.sort((a, b) =>
  //   Number(a.online_duration) > Number(b.online_duration) ? 1 : -1
  // );
  if (book.variants && typeof book.variants === "string") {
    book.variants = JSON.parse(book.variants);
  }

  if (book.contributors && typeof book.contributors === "string") {
    book.contributors = JSON.parse(book.contributors);
  }

  const variants_for_rent = book?.variants?.filter(
    (v) => v.duration !== "hardcopy"
  );
  const variants_for_order = book?.variants?.filter(
    (v) => v.duration === "hardcopy"
  );

  const sortedVariants = variants_for_rent.sort((a, b) =>
    Number(a.online_duration) > Number(b.online_duration) ? 1 : -1
  );

  return (
    <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
      <Container>
        <BackBtn />
        <div className="flex flex-col lg:flex-row items-start mt-6 gap-6">
          <div className="flex-grow space-y-6">
            <h1 className="text-base md:text-4xl tracking-tight text-zinc-700 font-semibold">
              {book.title}
            </h1>
            <div className="flex items-start flex-col lg:flex-row gap-6">
              <div>
                <div className="relative aspect-[4/6] w-[160px] lg:w-[200px]">
                  <Image
                    src={book.resource_links.cover_image}
                    alt={book.title}
                    priority
                    className="object-fill left-0"
                    fill
                    sizes="100%"
                  />
                </div>
                <ShareBook />
              </div>
              <div className="table">
                <div className="table-row-group">
                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500">
                      Author(s)
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {book.contributors.map((c) => c.name).join(", ")}
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500">
                      Publisher
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {book.publisher}
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500">
                      Format
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {book.format}
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500">
                      Print ISBN
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {book.identifiers.print_isbn_canonical}
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500 whitespace-nowrap">
                      eText ISBN
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {book.identifiers.eisbn_canonical}
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell text-sm font-normal text-zinc-500">
                      Edition
                    </div>
                    <div className="table-cell text-base md:text-lg font-medium text-zinc-600 pl-6 pb-4">
                      {renderEdition(book.edition)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RentBuyCard
            variants_for_rent={sortedVariants}
            variants_for_order={variants_for_order}
            book={book}
          />
        </div>
        <BookMetaSection vbid={book.vbid} />
        <ETextBookFeatures />
      </Container>
    </div>
  );
};

export default BookDetailsPage;
