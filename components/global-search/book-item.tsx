import { BookOpenTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SearchBookType = {
  id: number;
  title: string;
  edition: number;
  st_book: boolean;
  cover_image: string;
  publisher: string;
  authors: string;
};

interface Props {
  book: SearchBookType;
}

const BookItem = ({ book }: Props) => {
  return (
    <div className="cursor-pointer flex items-start gap-x-2 rounded-md w-full hover:bg-slate-100 transition px-4 py-2">
      {book.cover_image ? (
        <Image
          src={book.cover_image}
          width={60}
          height={80}
          alt="book"
          className="object-contain rounded-md overflow-hidden"
        />
      ) : (
        <div className="w-[90px] h-[120px]">
          <BookOpenTextIcon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 flex flex-col items-start text-left overflow-hidden">
        <Link
          href={`#`}
          title={book.title}
          className="text-base text-[var(--brand-color)] tracking-tighter font-[500] line-clamp-1"
        >
          {book.title}
        </Link>
        <span className="text-xs text-slate-500 tracking-tighter">
          {/* by {authors} / {edition > 0 && edition} / {publisher} */}
          by {book.authors}
        </span>
        <span className="text-xs text-slate-500 tracking-tighter">
          Edition: {book.edition}
        </span>
        <span className="text-xs text-slate-500 tracking-tighter">
          Publisher: {book.publisher}
        </span>
      </div>
    </div>
  );
};

export default BookItem;
