"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(5, { message: "Please enter your email." }).email(),
  password: z.string().min(3, { message: "Please enter your password." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const SigninForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        ...values,
        callbackUrl: "/",
        redirect: false,
      });
      console.log(res);
      if (res?.ok && res.status === 200) {
        router.replace("/dashboard");
      }
      if (res?.error) {
        toast.error(res?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 max-w-sm w-full"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-x-2">
                <FormLabel className="text-sm font-semibold">
                  Password:
                </FormLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-semibold text-[var(--brand-color)] hover:underline ml-auto"
                >
                  Forgot Password?
                </Link>
              </div>
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

        <Button
          className="block w-full disabled:opacity-75"
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin inline-block" />
          ) : (
            "Submit"
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-t w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="text-slate-800 gap-x-2 text-base font-semibold bg-slate-200 hover:bg-slate-300"
          type="button"
        >
          <AiFillGoogleCircle className="w-5 h-5" /> Google
        </Button>
        <Button
          variant="outline"
          className="text-slate-800 gap-x-2 text-base font-semibold bg-slate-200 hover:bg-slate-300"
          type="button"
        >
          <AiFillFacebook className="w-5 h-5" /> Facebook
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
