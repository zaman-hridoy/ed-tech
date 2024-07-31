"use client";

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "@/lib/instance";
import { SessionWithUserType, TreeNodeType } from "@/lib/types";
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

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {
  children: React.ReactNode;
  folder: TreeNodeType;
  onSuccess: () => void;
}

export function NameUpdateModal({ children, folder, onSuccess }: Props) {
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: folder.name,
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      axios.patch(
        `/dam/folder-service/rename/`,
        {
          id: folder.id,
          title: values.name,
          user_id: session?.user?.userId,
          parent: folder.parentFolderId,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      // refetch tree subfolders

      toast.success("Folder renamed successfully.");
      router.refresh();
      queryClient.refetchQueries({
        queryKey: folder?.parentFolderId
          ? [`exam-sub-folders_${folder?.parentFolderId}`]
          : ["drive-parent-folders"],
      });
      onSuccess();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)} className="w-full">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>
            {`Make changes and click save when you're done.`}
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
          <Button variant="ghost" onClick={() => setOpen(false)} size="sm">
            Cancel
          </Button>
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
