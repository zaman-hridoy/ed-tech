"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatvideoDuration } from "@/lib/helper-methods";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
});

type SchemaType = z.infer<typeof formSchema>;

interface Props {
  played: number;
  duration: number;
  annotationId: number;
}

const AnnotationForm = ({ played, duration, annotationId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  const onSubmit = async (values: SchemaType) => {
    const payload = {
      ...values,
      played,
      duration,
      annotationId,
    };
    try {
      const res = await axios.post("/api/annotations", payload);
      const newNote = res.data;
      queryClient.setQueryData(["annotation-notes"], (oldData: any) => {
        if (!oldData || oldData.length === 0) {
          return [newNote];
        }
        const updatedData = [newNote, ...oldData];
        return updatedData;
      });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="w-full p-4 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-1 space-y-0">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    className="bg-slate-100 border text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    disabled={isSubmitting}
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <span className="m-0 bg-yellow-200 px-4 text-[var(--brand-color)] rounded-md text-sm font-semibold h-[40px] flex items-center justify-center">
                  {formatvideoDuration(played)}
                </span>
                <Button
                  variant="primary"
                  type="submit"
                  className="m-0 hover:bg-slate-300"
                >
                  Add
                </Button>
              </FormItem>
            )}
          />
          <FormField
            name="note"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write a note..."
                    rows={5}
                    className="bg-slate-100 h-full border text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AnnotationForm;
