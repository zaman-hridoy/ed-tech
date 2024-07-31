"use client";

import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import axios from "@/lib/instance";
import { SessionWithUserType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "Please enter folder name." }).min(1),
});

const getFileName = (name: string) => {
  if (!name) return "";
  const names = name.split(".");
  return names[0];
};

type FormSchemaType = z.infer<typeof formSchema>;

function CreateDriveFolder() {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "CREATE_DRIVE_FOLDER";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const parentId = modal.data?.parentId;
      await axios.post(
        `/dam/folder-service/upload`,
        {
          name: values.name,
          owner: session?.user?.userId,
          parent: parentId,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      toast.success("Folder created successfully.");
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
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
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

export default CreateDriveFolder;
