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
import { zodResolver } from "@hookform/resolvers/zod";
import { Channel, Member, Profile } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "Please enter channel name." })
    .trim()
    .min(3),
});

type FormSchemaType = z.infer<typeof formSchema>;

type MemberType = Member & {
  profile: Profile;
};

type ChannelType = Channel & {
  profile: Profile;
  members: MemberType[];
};

interface Props {
  children: React.ReactNode;
  initialName: string;
  channelId: number;
  onSuccess?: (channel: ChannelType) => void;
}

export function UpdateChannelName({
  children,
  initialName,
  channelId,
  onSuccess,
}: Props) {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName || "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/channels/${channelId}`, {
        name: values.name,
      });
      toast.success("Channel updated successfully.");
      router.refresh();
      if (onSuccess) {
        onSuccess(res.data);
      }
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
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Rename this channel</DialogTitle>
          <DialogDescription>
            {`Make changes to your channel here. Click save when you're done.`}
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
                    <FormLabel className="text-sm font-semibold uppercase">
                      Channel Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="# name"
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
            <DialogFooter className="mt-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                variant="primary"
                className="gap-x-2 focus-visible:ring-0 focus-within:ring-offset-0"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 animate-spin transition" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
