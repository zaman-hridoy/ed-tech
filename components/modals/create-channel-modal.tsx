"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdLock } from "react-icons/io";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

const channelFormSchema = z.object({
  name: z
    .string({ required_error: "Please enter channel name." })
    .trim()
    .min(3),
  description: z.string().optional().default(""),
  isPublic: z.boolean().default(false),
  type: z.nativeEnum(ChannelType),
});

type ChannelFormSchemaType = z.infer<typeof channelFormSchema>;

export function CreateChannelModal() {
  const router = useRouter();
  const modal = useModal();
  const isModalOpen = modal.isOpen && modal.type === "CREATE_CHANNEL_MODAL";

  const form = useForm<ChannelFormSchemaType>({
    resolver: zodResolver(channelFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      type: ChannelType.TEXT,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ChannelFormSchemaType) => {
    try {
      setLoading(true);
      await axios.post("/api/channels", values);

      toast.success("Channel created successfully.");
      router.refresh();
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
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      CHANNEL NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="# new-channel"
                        className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        disabled={isSubmitting}
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Description (Optional)
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
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-x-1 text-sm font-medium">
                        <IoMdLock className="w-4 h-4 text-inherit text-slate-500" />
                        <span>Make public</span>
                      </FormLabel>
                      <FormDescription>
                        Everyone will be able to view this channel.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[var(--brand-color-success)]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className="bg-zinc-100 px-4 py-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSubmitting}
            >
              Cancel
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
