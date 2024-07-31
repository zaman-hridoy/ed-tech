"use client";

import { CommandDialog, CommandInput } from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "@/lib/instance";
import { Loader2, SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import BookItem from "./book-item";
import CourseItem from "./course-item";
import UserItem from "./user-item";

type SearchUserType = {
  id: number;
  name: string;
  image: string;
  role: string;
};

type SearchCourseType = {
  id: number;
  title: string;
  educator: string;
};

type SearchBookType = {
  id: number;
  title: string;
  edition: number;
  st_book: boolean;
  cover_image: string;
  publisher: string;
  authors: string;
};

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [courses, setCourses] = useState<SearchCourseType[]>([]);
  const [books, setBooks] = useState<SearchBookType[]>([]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      axios
        .post("/search/home-Search", {
          limit: 50,
          offset: 0,
          query: debounceValue || "cou",
        })
        .then((res) => {
          const results: any[] = res.data?.data?.values || [];

          const users: any[] = results.filter(
            (item: any) => item._index === "new-users-staging"
          );
          const courses: any[] = results.filter(
            (item: any) => item._index === "new-courses-live-new"
          );
          const books: any[] = results.filter(
            (item: any) => item._index === "st-books-live"
          );

          const modifiedUser = users.map((item) => {
            const user = item._source;
            return {
              id: user.id,
              name: user.full_name,
              image: user.image || "",
              role: user.role,
            };
          });
          setUsers(modifiedUser);

          const modifiedCourses = courses.map((item) => {
            const course = item._source;
            return {
              id: course.id,
              title: course.collection_name,
              educator: course.educator_name,
            };
          });
          setCourses(modifiedCourses);

          const modifiedBooks = books.map((item) => {
            const book = item._source;

            return {
              id: book.vbid,
              title: book.title,
              edition: book.edition,
              st_book: book.st_book,
              cover_image: book.resource_links?.cover_image,
              publisher: book.publisher,
              authors: book.contributors?.map((a: any) => a.name).join(", "),
            };
          });
          setBooks(modifiedBooks);
        })
        .catch((err) => {
          console.log(err);
          setUsers([]);
          setBooks([]);
          setCourses([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, debounceValue]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-0 group md:px-4 md:py-2 flex items-center gap-x-2 transition md:border rounded-full w-full md:bg-slate-100"
      >
        <SearchIcon className="w-6 h-6 md:w-4 md:h-4 text-[var(--brand-color)] sm:text-[#EDF67D] md:text-zinc-500" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition hidden md:block">
          Search...
        </p>
        <kbd className="hidden pointer-events-none md:inline-flex h-5 md:items-center md:gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground ml-auto">
          <span className="text-sm">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <CommandInput
            value={value}
            onValueChange={(search) => setValue(search)}
            placeholder="Search courses, books and educators..."
            className="pr-8"
          />
          <Button
            className="w-auto h-auto p-2 absolute top-2 right-1"
            variant="secondary"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar transition-all duration-500">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}

          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
        <div className="px-4 py-1">
          <button className="w-full text-white text-sm font-medium bg-[var(--brand-color)] px-4 py-2 rounded-md">
            Show all results
          </button>
        </div>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
