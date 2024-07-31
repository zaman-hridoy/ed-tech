"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const formSchema = z.object({
  name: z.string({ required_error: "Please enter folder name." }).min(1),
  exam_date: z.date().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

function CreateExamFolder() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "CREATE_EXAM_FOLDER";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      exam_date: undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const parentId = modal.data?.parentId;

      const newData = {
        student_id: session?.user?.userId,
        name: values.name,
        exam_date: values.exam_date?.toISOString() || new Date().toISOString(),
        reminder_frequency: "7",
        parent_id: parentId, // id or null
        status: true,
      };

      await axios.post("/content/addExamLibrary", newData, {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      });

      if (values.exam_date) {
        toast.success(
          `Your reminder has been set for (${format(
            new Date(values.exam_date),
            "MM-dd-yyyy"
          )})`
        );
      } else {
        toast.success("Folder created successfully.");
      }

      router.refresh();
      // queryClient.refetchQueries({
      //   queryKey: modal.data?.parentFolderId
      //     ? [`exam-sub-folders_${folder?.parentFolderId}`]
      //     : ["drive-parent-folders"],
      // });
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    modal.onModalClose();
  };

  const isSubmitting = form.formState.isSubmitting || loading;
  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>
            {`Make changes and click create when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Write name of folder:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name"
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
                control={form.control}
                name="exam_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-semibold">
                      Exam Date (Optional)
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-xs">
                      Please set your exam date and a helpful reminder email
                      will be sent to you in advance of the scheduled
                      examination.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            variant="primary"
            className="gap-x-2"
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin transition" />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateExamFolder;
