"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "@/lib/instance";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import UserAvatar from "./user-avatar";

type BookType = {
  id: number;
  name: string;
  image: string | null;
  authors: string;
  vbid: number;
  edition: number;
  publisher: string;
};

interface Props {
  bookId: number;
  children: React.ReactNode;
}

function BookHoverCard({ bookId, children }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    if (open && bookId) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/content/getBookById/${bookId}`);
          const book = res.data?.data[0];
          if (book) {
            const bookData: BookType = {
              id: book?.id,
              name: book?.bookName,
              authors: book?.authors?.map((a: any) => a.author).join(", "),
              edition: book?.edition,
              publisher: book?.publisher,
              image: book?.coverImage,
              vbid: book?.vbid || book?.isbn,
            };

            setBook(bookData);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [open, bookId]);

  return (
    <HoverCard onOpenChange={setOpen}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 p-2" side="top">
        {loading ? (
          <div className="flex items-start gap-x-2">
            <Skeleton className="shrink-0 w-[100px] h-[120px]" />

            <div className="space-y-1 w-full">
              <Skeleton className="w-[150px] h-5" />
              <p className="flex items-center text-sm text-slate-500">
                Authors: <Skeleton className="w-full h-4" />
              </p>
              <div className="flex items-center text-sm text-slate-500">
                Edition: <Skeleton className="w-full h-4" />
              </div>
              <div className="flex items-center text-sm text-slate-500">
                Publisher: <Skeleton className="w-full h-4" />
              </div>
              <div className="flex items-center text-sm text-slate-500">
                Isbn: <Skeleton className="w-full h-4" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2">
            <div className="w-[100px] h-[120px]">
              {book?.image ? (
                <UserAvatar
                  src={book.image}
                  className="rounded-sm h-full border-none w-full"
                />
              ) : (
                <span>
                  <BookOpenText className="w-full h-full" />
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-y-1 overflow-hidden">
              <h4
                className="text-sm font-semibold text-slate-700"
                title={book?.name}
              >
                {book?.name}
              </h4>
              <p
                className="text-sm text-slate-500 truncate"
                title={book?.authors}
              >
                Authors: <strong>{book?.authors}</strong>
              </p>
              <p className="text-xs text-slate-500">
                Edition: <strong>{book?.edition}</strong>
              </p>
              <p className="text-xs text-slate-500 truncate">
                Publisher: <strong>{book?.publisher}</strong>
              </p>
              <p className="text-xs text-slate-500">
                Isbn: <strong>{book?.vbid}</strong>
              </p>
              <Button
                size="sm"
                variant="primary"
                className="w-full mt-2"
                asChild
              >
                <Link href={`/text-books/details/${book?.vbid}`}>Buy</Link>
              </Button>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

export default BookHoverCard;
