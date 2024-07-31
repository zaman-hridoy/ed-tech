"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCourseStore } from "@/hooks/use-course-store";
import { Edit3 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SubjectSeachableInput from "../../_components/subject-searchable-input";

const formSchema = z.object({
  subject: z.object({
    id: z.number(),
    course_name: z.string(),
  }),
});

type SchemaType = z.infer<typeof formSchema>;

const SubjectInput = () => {
  const { collection, updateCourseStore } = useCourseStore();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: collection?.subject || {},
    },
  });

  useEffect(() => {
    if (collection?.subject && collection?.subject?.id) {
      form.setValue("subject", collection?.subject);
    }
  }, [form, collection]);

  const onSubmit = (values: any) => {
    updateCourseStore(values);
    setIsEdit(false);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 tracking-tight font-semibold">
            Subject
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
                disabled={isSubmitting}
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
          <SubjectSeachableInput
            name="subject"
            control={form.control}
            label=""
          />
        )}

        {!isEdit && (
          <h5 className="text-sm font-semibold tracking-tight capitalize text-slate-600">
            {collection?.subject?.course_name}
          </h5>
        )}
      </form>
    </Form>
  );
};

export default SubjectInput;
