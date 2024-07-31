"use client";

import { getCourseBooks } from "@/actions/get-course-books";
import BookHoverCard from "@/components/book-hover-card";
import UserAvatar from "@/components/user-avatar";
import { CourseDataType } from "@/lib/types";
import { BookImage } from "lucide-react";
import { useEffect, useState } from "react";

type BookType = {
  id: number;
  name: string;
  image: string;
};

interface Props {
  course: CourseDataType;
}

const AssociateBooks = ({ course }: Props) => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    (async () => {
      const bookList = await getCourseBooks(course);
      setBooks(bookList);
    })();
  }, [course]);

  return (
    <div className="flex items-center gap-x-2 mt-2">
      {books.map((book) => (
        <BookHoverCard key={book.id} bookId={book.id}>
          <button key={book.id}>
            {book.image ? (
              <UserAvatar
                src={book.image}
                className="border-0 rounded-sm w-14 h-16"
              />
            ) : (
              <span className="border rounded-md p-[2px]">
                <BookImage className="w-14 h-16 text-zinc-500" />
              </span>
            )}
          </button>
        </BookHoverCard>
      ))}
    </div>
  );
};

export default AssociateBooks;
