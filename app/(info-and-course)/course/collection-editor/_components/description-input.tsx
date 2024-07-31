"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseStore } from "@/hooks/use-course-store";
import { Edit3 } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  description: z.string().min(3),
});

type SchemaType = z.infer<typeof formSchema>;

const DescriptionInput = () => {
  const { collection, updateCourseStore } = useCourseStore();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: collection?.description || "",
    },
  });

  useEffect(() => {
    if (collection?.description) {
      form.setValue("description", collection?.description);
    }
  }, [form, collection]);

  const onSubmit = (values: SchemaType) => {
    updateCourseStore(values);
    setIsEdit(false);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 tracking-tight font-semibold">
            Description
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
                onClick={() => setIsEdit(true)}
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
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
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
        )}

        {!isEdit && (
          <h5 className="text-sm font-semibold capitalize text-slate-600 tracking-tight line-clamp-2">
            {collection?.description}
          </h5>
        )}
      </form>
    </Form>
  );
};

export default DescriptionInput;
