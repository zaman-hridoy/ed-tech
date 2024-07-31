"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "@/lib/instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as z from "zod";

export const dynamic = "force-static";

const formSchema = z.object({
  email: z.string({ required_error: "Please enter your valid email." }).email(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/users/forgetpasswordUser", {
        email: values.email,
      });

      if (res.data.success) {
        router.replace("/auth/forgot-password/success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <div className="w-full h-full flex flex-col items-center pt-28 max-w-2xl mx-auto p-4 text-center gap-y-6">
      <h1 className="text-5xl text-slate-800 text-center font-semibold">
        Forgot your password?
      </h1>
      <p className="text-sm md:text-base text-slate-500 font-medium">
        {`Please enter the email address you'd like your password reset
        information sent to`}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-sm text-left"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white w-full focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full text-sm font-semibold tracking-tight bg-[var(--brand-color)] text-white gap-x-4 hover:bg-[var(--brand-color)]"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="text-inherit w-4 h-4 animate-spin transition" />
            )}
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
