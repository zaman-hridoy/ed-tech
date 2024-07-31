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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCourseStore } from "@/hooks/use-course-store";
import { CourseFileType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const typeArr = [
  { id: 1, name: "Core Concept" },
  { id: 2, name: "Real world Examples" },
  { id: 3, name: "Problem Solving" },
];

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  type: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {
  file: CourseFileType;
  onSuccess: () => void;
  onCancel: () => void;
}

const FileEditForm = ({ file, onSuccess, onCancel }: Props) => {
  const { handleAddFileToChapter } = useCourseStore();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: file.title || "",
      description: file.description || "",
      type: file.type || "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    handleAddFileToChapter({ ...file, ...values });
    onSuccess();
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Title:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Title"
                  className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                  disabled={isSubmitting}
                  autoFocus
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
                  className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Type</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {typeArr?.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={`${item.name}`}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="space-x-2 flex items-center justify-end">
          <Button variant="outline" size="sm" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FileEditForm;
