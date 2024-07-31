"use client";

import LottieAnimation from "@/components/lottie-animation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/instance";
import { cn } from "@/lib/utils";
import * as animationData from "@/public/lottie_files/tick.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name." })
    .min(3, { message: "First name should be at least 3 characters." }),
  lastName: z
    .string({ required_error: "Please enter your last name." })
    .min(3, { message: "Last name should be at least 3 characters." }),
  email: z.string({ required_error: "Please enter your valid email." }).email(),
  description: z
    .string({ required_error: "Please write a quote." })
    .min(3, { message: "Last name should be at least 3 characters." }),
  subject: z.string().default("General Query"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      await axios.post("/content/addcontactus", values);
      onSuccessToast();
      form.reset();
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(JSON.stringify(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  const onSuccessToast = () => {
    toast.custom((t) => (
      <div
        className={cn(
          "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col space-y-4 items-center justify-center ring-1 ring-black ring-opacity-5 p-6",
          t.visible ? "animate-enter" : "animate-leave"
        )}
      >
        <LottieAnimation
          animationData={animationData}
          loop={false}
          style={{ width: 100, height: 100 }}
        />
        <p className="text-sm md:text-base text-slate-500 font-medium">
          Your query has been submitted, If you want to put an other
          query,Please
        </p>
        <Button onClick={() => toast.dismiss(t.id)} variant="primary" size="sm">
          Contact us again.
        </Button>
      </div>
    ));
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 w-full"
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  First Name:
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    autoFocus
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Last Name:
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Email Address:
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                How Can We Help?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Query"
                  rows={6}
                  className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" variant="primary" type="submit">
          {loading ? (
            <span className="flex items-center gap-x-2">
              <Loader2 className="w-4 h-4 text-white animate-spin" /> Loading...
            </span>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
