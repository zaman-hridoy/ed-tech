"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseStore } from "@/hooks/use-course-store";
import { BookImageIcon, Edit3 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { BookType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SeachableMultipleBooks from "../../_components/searchable-multiple-books";

const BookInput = () => {
  const { collection, updateCourseStore } = useCourseStore();

  const [books, setBooks] = useState<BookType[]>([]);

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm();

  useEffect(() => {
    if (collection?.books && collection.books?.length > 0) {
      setBooks(collection?.books);
    }
  }, [collection]);

  const onSubmit = () => {
    if (books.length === 0) {
      return;
    }
    updateCourseStore({ books });
    setIsEdit(false);
  };

  const isError = books.length === 0;

  return (
    <Form {...form}>
      <form>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-xs text-slate-500 tracking-tight font-semibold",
              isError && "text-red-500"
            )}
          >
            Books
          </span>
          {isEdit ? (
            <div className="flex items-center gap-x-1">
              <Button
                size="sm"
                variant="outline"
                className="w-auto h-auto px-2 py-1 gap-x-2 text-xs"
                onClick={() => setIsEdit(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                className="w-auto h-auto px-2 py-1 gap-x-2 text-xs"
                onClick={() => {
                  onSubmit();
                  setIsEdit(false);
                }}
                type="submit"
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              className="w-auto h-auto px-2 py-1 gap-x-2 text-xs"
              onClick={() => setIsEdit(true)}
              type="button"
            >
              <Edit3 className="text-inherit w-3 h-3" /> Edit
            </Button>
          )}
        </div>
        <Separator className="my-1" />
        {isEdit && (
          <>
            <SeachableMultipleBooks
              name="books_json"
              control={form.control}
              label=""
              setBooks={setBooks}
              error={books.length === 0}
              initialBooks={books}
            />
            {isError && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                Select at least one book.
              </p>
            )}
          </>
        )}

        {!isEdit && (
          <div className="space-y-2">
            {books.map((book) => (
              <div key={book.id} className="flex items-start gap-x-2">
                <Avatar className="h-14 w-12 border-1 cursor-pointer bg-slate-200 relative rounded-sm my-1">
                  <AvatarImage src={book?.bookImage} />
                  <AvatarFallback>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <BookImageIcon className="w-10 h-10" />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start font-semibold">
                  <p
                    className="text-sm tracking-tight line-clamp-1"
                    title={book.book_name}
                  >
                    {book.book_name}
                  </p>
                  <span className="text-xs text-slate-500 tracking-tight line-clamp-1">
                    {book.edition} / {book.authors?.map((a) => a.author)}
                  </span>
                  <span className="text-xs text-slate-400 tracking-tight line-clamp-1">
                    {book.isbns?.map((a) => a.isbn)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </Form>
  );
};

export default BookInput;
