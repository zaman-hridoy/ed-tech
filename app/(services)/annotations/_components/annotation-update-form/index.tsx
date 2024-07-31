"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnotationNote, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
});

type SchemaType = z.infer<typeof formSchema>;

type NoteType = AnnotationNote & {
  profile: Profile;
};

interface Props {
  note: NoteType;
  onSuccess: () => void;
}

const AnnotationUpdateForm = ({ note, onSuccess }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title || "",
      note: note.note || "",
    },
  });

  useEffect(() => {
    form.setValue("title", note.title);
    form.setValue("note", note.note);
  }, [form, note]);

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: SchemaType) => {
    const payload = {
      ...values,
      noteId: note.id,
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/annotations/${note.annotationId}/notes/${note.id}`,
        payload
      );
      const updatedNote = res.data;
      queryClient.setQueryData(["annotation-notes"], (oldData: any) => {
        if (!oldData || oldData.length === 0) {
          return;
        }
        const updatedData = oldData.map((note: NoteType) => {
          if (note.id === updatedNote.id) {
            return updatedNote;
          }
          return note;
        });
        return updatedData;
      });
      form.reset();
      router.refresh();
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    className="bg-white border text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    disabled={isSubmitting}
                    autoFocus
                    {...field}
                  />
                </FormControl>
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
                    className="bg-white h-full border text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-x-2">
            <Button
              variant="secondary"
              type="button"
              className="m-0 hover:opacity-75"
              size="sm"
              disabled={loading}
              onClick={() => {
                onSuccess();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="m-0 hover:opacity-75"
              size="sm"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnnotationUpdateForm;
