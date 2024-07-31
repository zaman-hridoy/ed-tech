"use client";

import EmptySection from "@/components/empty-section";
import VitalBookCard from "@/components/vital-book-card";
import axios from "@/lib/instance";
import { VitalBookType } from "@/lib/types";
import { BookImage } from "lucide-react";
import { useState } from "react";

interface Props {
  categories: string[];
  books: any[];
  total: number;
}

/*

category1: category1,
category2: category2,
category3: null,
limit: 12,
offset,

*/

const BooksPanel = ({ categories, books, total }: Props) => {
  const [bookList, setBookList] = useState<VitalBookType[]>(books);
  const [moreLoading, setMoreloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = (offset: number) => {
    setMoreloading(true);
    let payload: any = {
      offset: offset,
      limit: 12,
    };
    categories.forEach((cat, idx) => {
      payload = {
        ...payload,
        [`category${idx + 1}`]: cat,
      };
    });
    axios
      .post("/search/get_books_data", payload)
      .then((res) => {
        const new_books = res.data?.data?.values || [];

        if (new_books && new_books?.length > 0) {
          const updatedBooks = new_books.map(({ content }: any) => ({
            ...content,
          }));
          setBookList((prev) => [...prev, ...updatedBooks]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMoreloading(false);
      });
  };

  if (bookList.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        <EmptySection
          icon={<BookImage className="w-14 h-14 text-slate-300" />}
          emptyText="No books found."
        />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {bookList.map((book) => (
        <VitalBookCard key={book.vbid} book={book} />
      ))}
    </div>
  );
};

export default BooksPanel;
