"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { BookType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BookCopy, Loader2, Text } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { useCourseStore } from "@/hooks/use-course-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import FormTitle from "../../_components/form-title";
import SeachableMultipleBooks from "../_components/searchable-multiple-books";
import SubjectSeachableInput from "../_components/subject-searchable-input";

const formSchema = z.object({
  course_collection_type: z.string().default("course"),
  collectionName: z.string().min(3),
  description: z.string().min(1),
  subject: z.object({
    id: z.number(),
    course_name: z.string(),
  }),
  module_name: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreateCoursePage = () => {
  const router = useRouter();
  const { updateCourseStore, clearCourseStoredData } = useCourseStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_collection_type: "course",
      collectionName: "",
      description: "",
      subject: {},
      module_name: "",
    },
  });

  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    clearCourseStoredData();
  }, [clearCourseStoredData]);

  const onSubmit = async (values: FormSchemaType) => {
    if (books.length === 0) return;
    try {
      updateCourseStore({ ...values, books });
      router.push("/course/collection-editor");
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="h-full max-w-3xl mx-auto px-4 md:px-6 pt-[100px]">
      <h1 className="text-2xl tracking-tight text-slate-700">
        Build your educational journey with our streamlined course creation
        process.
      </h1>
      <p className="text-sm text-slate-500 tracking-tight">
        Please fill your information required to generate your course. You can
        later change this information.
      </p>

      <div className="bg-white mt-6 rounded-md p-4 md:p-6 border shadow-md border-slate-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-12">
              <div>
                <FormTitle title="Course Information" />

                <div className="space-y-3">
                  {/* collection type */}
                  <FormField
                    name="course_collection_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold tracking-tight">
                          Course type
                        </FormLabel>

                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3 space-x-0 sm:flex-row sm:space-x-2 sm:space-y-0"
                          >
                            {gernderItems.map((item) => (
                              <FormItem
                                key={item.name}
                                className={cn(
                                  "flex items-center border space-x-2 shadow cursor-pointer transition duration-300 rounded-md px-3 py-2 text-sm font-bold text-slate-500 hover:shadow-md",
                                  field.value === item.value &&
                                    "bg-[var(--brand-color-success)] text-white"
                                )}
                                onClick={() => field.onChange(item.value)}
                              >
                                <FormControl>
                                  <div>
                                    <RadioGroupItem
                                      value={item.name}
                                      className="sr-only"
                                    />
                                    {item.icon}
                                  </div>
                                </FormControl>
                                <FormLabel
                                  className="font-semibold cursor-pointer"
                                  style={{ margin: 0, marginLeft: 10 }}
                                >
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* collection name */}
                  <FormField
                    name="collectionName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Title:
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Write title"
                            className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* collection description */}
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Description:
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description"
                            className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormTitle title="Book(s) Information" />
                <div className="space-y-3">
                  <SubjectSeachableInput
                    name="subject"
                    control={form.control}
                    label="Subject"
                  />
                  <SeachableMultipleBooks
                    name="books_json"
                    control={form.control}
                    label="Books"
                    setBooks={setBooks}
                    error={books.length === 0}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>

        {/* form actions */}
        <Separator className="mt-8 mb-4 bg-slate-200" />
        <div className="flex items-center justify-end gap-x-4">
          {/* <Button
          onClick={form.handleSubmit(onSubmit)}
          className="text-sm font-semibold tracking-tight bg-[var(--brand-color-secondary)] text-white gap-x-4 hover:bg-[var(--brand-color-secondary)]"
        >
          Submit <Save className="text-inherit w-4 h-4" />
        </Button> */}
          <Button
            variant="primary"
            className="text-sm font-semibold tracking-tight bg-[var(--brand-color-secondary)] text-white gap-x-4 hover:bg-[var(--brand-color)]"
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting && (
              <Loader2 className="text-inherit w-4 h-4 animate-spin transition" />
            )}
            Save & Proceed{" "}
            {!isSubmitting && <ArrowRight className="text-inherit w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;

const gernderItems = [
  {
    name: "TextBook",
    value: "course",
    icon: <BookCopy className="text-inherit w-5 h-5" />,
  },
  {
    name: "Module",
    value: "module",
    icon: <Text className="text-inherit w-5 h-5" />,
  },
];
