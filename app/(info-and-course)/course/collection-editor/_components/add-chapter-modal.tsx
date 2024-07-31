"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseStore } from "@/hooks/use-course-store";
import { formatChapterName } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { BookType, ChapterType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// const uid = new ShortUniqueId();

interface Props {
  children: React.ReactNode;
}

const formSchema = z.object({
  book_id: z.string().min(1, { message: "Please select a book" }),
  chapter_id: z.string().min(1, { message: "Please select a chapter" }),
});

type SchemaType = z.infer<typeof formSchema>;

function AddChapterModal({ children }: Props) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_id: "",
      chapter_id: "",
    },
  });

  const { collection, handleAddChapter } = useCourseStore();
  const [open, setOpen] = useState(false);

  const books: BookType[] = collection.books || [];
  const [chapters, setChapters] = useState<ChapterType[]>([]);

  const onSubmit = (values: SchemaType) => {
    const newChapter = chapters.find(
      (chapter) => chapter.id === values?.chapter_id
    );
    if (newChapter) {
      if (collection.chapters && collection.chapters.length === 0) {
        newChapter.isActive = true;
      }
      handleAddChapter(newChapter);
      setOpen(false);
    }
  };

  const book_id = form.getValues("book_id");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getBookChapters() {
      setChapters([]);
      form.setValue("chapter_id", "");
      setLoading(true);
      try {
        const res = await axios.post("/content/getBookBasedChapters", {
          bookId: book_id,
        });
        if (res.data?.success && res?.data?.cahpters?.length > 0) {
          const chapterList: ChapterType[] = res?.data?.cahpters?.map(
            (chapter: any) => ({
              id: `${chapter.id}`,
              chapterName: formatChapterName(chapter?.chapterName),
              bookId: chapter?.bookId,
              bookName: chapter?.bookName,
              files: [],
              keywords: "",
              isActive: false,
            })
          );
          setChapters(chapterList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (book_id) {
      getBookChapters();
    }
  }, [book_id, form]);

  const isSubmitting = form.formState.isSubmitting;

  form.watch();

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add chapter</DialogTitle>
          <DialogDescription>
            Select a book and related chapter. Click add when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="book_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold mt-[3]">
                    Books
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-0 focus:ring-offset-0 bg-white">
                        <SelectValue placeholder="Select a book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {books.length > 0 &&
                        books.map((book) => (
                          <SelectItem
                            key={book.id}
                            value={`${book.id}`}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-2">
                              <Avatar className="h-8 w-7 border-2 cursor-pointer bg-slate-200 relative rounded-sm">
                                <AvatarImage src={book?.bookImage} />
                                <AvatarFallback>
                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <BookImageIcon className="w-10 h-10" />
                                  </div>
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col items-start gap-y-0">
                                <p className="text-sm font-semibold tracking-tight">
                                  {book.book_name}
                                </p>
                                <p className="text-[10px] text-slate-500 tracking-tight -mt-1">
                                  {book.edition} /{" "}
                                  {book.authors?.map((a) => a.author)}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}

                      {books.length === 0 && (
                        <p className="text-sm font-semibold tracking-tight textsla500 text-center p-4">
                          No book found!
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* chapters */}
            <FormField
              control={form.control}
              name="chapter_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold mt-[3]">
                    Chapters
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-0 focus:ring-offset-0 bg-white">
                        <SelectValue placeholder="Select a chapter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {loading ? (
                        <div className="flex items-center justify-center h-20">
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                      ) : (
                        <>
                          {chapters.length > 0 &&
                            chapters.map((chapter) => (
                              <SelectItem
                                key={chapter.id}
                                value={`${chapter.id}`}
                                className="cursor-pointer"
                              >
                                {chapter.chapterName}
                              </SelectItem>
                            ))}

                          {books.length === 0 && (
                            <p className="text-sm font-semibold tracking-tight textsla500 text-center p-4">
                              No chapter found!
                            </p>
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="primary"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddChapterModal;
