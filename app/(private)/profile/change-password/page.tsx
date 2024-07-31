"use client";

import FormTitle from "@/app/(info-and-course)/_components/form-title";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "@/lib/instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Please enter your password." })
      .min(8, { message: "Password length must be at least 8 characters." }),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

const ChangePasswordPage = () => {
  const { data } = useSession();
  const session = data;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      await axios.post(
        "/auth/users/setPassword",
        { password: values.password },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );
      toast.success("Password changed successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <div className="bg-white rounded-md p-4 md:p-6 max-w-lg">
      <FormTitle title="Change Password" />
      <p className="text-base text-slate-500 mb-10">
        Please provide your new password and confirm your new password entry.
        Keep your password secure and don’t share it with anyone.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Password:
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Confirm Password:
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* form actions */}
          <Separator className="mt-8 mb-4 bg-slate-200" />
          <div className="flex items-center justify-end gap-x-4">
            <Button
              variant="primary"
              className="text-sm font-semibold tracking-tight bg-[var(--brand-color)] text-white gap-x-4 hover:bg-[var(--brand-color)]"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="text-inherit w-4 h-4 animate-spin transition" />
              )}
              Change
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
