"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CheckIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z
  .object({
    first_name: z
      .string({ required_error: "Please enter your first name." })
      .min(3, { message: "First name should be at least 3 characters." }),
    last_name: z
      .string({ required_error: "Please enter your last name." })
      .min(3, { message: "Last name should be at least 3 characters." }),
    email: z
      .string({ required_error: "Please enter your valid email." })
      .email(),
    password: z
      .string({ required_error: "Please enter your password." })
      .min(8, { message: "Password length must be at least 8 characters." }),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
    code: z.string().default(""),
    agreeTerm: z.boolean().default(false),
    marketing_emails: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

const getRole = (role: string | null) => {
  switch (role) {
    case "student":
      return "Student";
    case "educator":
      return "Educator";
    default:
      return "Student";
  }
};

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams?.get("role") as "student" | "educator" | null;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const newUser = {
        first_name: values.first_name?.trim(),
        last_name: values.last_name?.trim(),
        email: values.email,
        password: values.password,
        type: getRole(role),
        agreeTerm: values?.agreeTerm,
        marketing_emails: values?.marketing_emails,
        code: values?.code,
        token: "",
        university_name: "",
      };

      if (newUser.code) {
        const codeRes = await axios
          .post(`/auth/users/ValidateToken/${newUser.code}`)
          .then((res) => res.data);

        if (codeRes?.success) {
          newUser.token = codeRes.user?.token;
          newUser.university_name = codeRes.university_name;

          const signupRes = await axios
            .post("/auth/users/signupnew", newUser)
            .then((res) => res.data);
          if (signupRes?.success) {
            await axios.post("/profile/addProfileInfo", {
              userId: signupRes?.user?.id || signupRes?.id,
              name: newUser?.first_name,
              last_name: newUser?.last_name,
              email: newUser?.email,
            });

            // for vital source
            if (codeRes.user?.type === "organization") {
              await axios.post("/auth/users/addMarketingUniversity", {
                userId: signupRes?.user?.id || signupRes?.id,
                university: "VitalSource",
              });
            } else if (codeRes.user?.type === "college") {
              await axios.post("/auth/users/user-codes", {
                user_id: signupRes?.user?.id || signupRes?.id,
                token: values.code,
                vbid: codeRes?.user?.vbid,
                university: codeRes?.user?.name,
              });

              await axios.post("/auth/users/user_academic_registration", {
                user_id: signupRes?.user?.id || signupRes?.id,
                name: newUser?.first_name + " " + newUser?.last_name,
                email: newUser?.email,
                institute_name: codeRes?.user?.name,
              });
            }
          }
        } else {
          // token is not valid
          toast.error(codeRes?.message);
        }
      } else {
        // simple signup
        const signupRes = await axios
          .post("/auth/users/signupnew", newUser)
          .then((res) => res.data);
        if (signupRes?.success) {
          await axios.post("/profile/addProfileInfo", {
            userId: signupRes?.user?.id || signupRes?.id,
            name: newUser?.first_name,
            last_name: newUser?.last_name,
            email: newUser?.email,
          });
        }
      }
      form.reset();
      router.push("/auth/signup/success");
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(JSON.stringify(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  // check email exists or not
  const [isValidEmail, setValidEmail] = useState(false);
  const [checkEmailLoading, setcheckEmailLoading] = useState(false);

  const isValidInputEmail = !form.formState.errors["email"];

  const handleCheckEmail = useCallback(
    async (email: string) => {
      if (!email) return;
      if (!isValidInputEmail) return;
      console.log({ isValidInputEmail });
      setcheckEmailLoading(true);
      axios
        .post("/auth/users/checkEmailExist", { email })
        .then((res) => {
          setcheckEmailLoading(false);
          if (res.data?.exists) {
            setValidEmail(false);
            form.setError("email", { message: "Email already taken." });
          } else {
            setValidEmail(true);
            form.clearErrors("email");
          }
        })
        .catch((err) => {
          setcheckEmailLoading(false);
          setValidEmail(false);
          form.setError("email", {
            message: JSON.stringify(err.response?.data?.message),
          });
        });
    },
    [form, isValidInputEmail]
  );

  const isSubmitting = form.formState.isSubmitting;
  const isValid = form.getValues("agreeTerm");

  form.watch(["agreeTerm", "email"]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 w-full"
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            name="first_name"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="last_name"
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="email"
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
                    onFocus={() => {
                      setValidEmail(false);
                      setcheckEmailLoading(false);
                    }}
                    onBlur={(e) => handleCheckEmail(e.target.value)}
                  />
                  {checkEmailLoading && (
                    <Loader2 className="animate-spin w-5 h-5 absolute top-[10px] text-slate-400 right-2" />
                  )}
                  {isValidEmail && (
                    <CheckIcon className="w-5 h-5 absolute top-[10px] text-[var(--brand-color-success)] right-2" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Password:</FormLabel>
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

        {role !== "educator" && (
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Access Code (Optional):
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Access Code"
                    className="bg-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--brand-color)] text-base placeholder:text-gray-400"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div>
          <FormField
            name="agreeTerm"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-3">
                <FormControl>
                  <Checkbox
                    className="checked:bg-[var(--brand-color)]"
                    disabled={isSubmitting}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold text-neutral-500">
                  Creating an account means you agree with our{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-[var(--brand-color)] font-bold underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and
                  <Link
                    href="/privacy-policy"
                    className="text-[var(--brand-color)] font-bold underline"
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                  .
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="marketing_emails"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-3">
                <FormControl>
                  <Checkbox
                    className="checked:bg-[var(--brand-color)]"
                    disabled={isSubmitting}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold text-neutral-500">
                  Subscribe to SimpliTaught’s Newsletter. .
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full"
          variant="primary"
          type="submit"
          disabled={!isValid || !isValidEmail || form.formState.isSubmitting}
        >
          {loading ? (
            <span className="flex items-center gap-x-2">
              <Loader2 className="w-4 h-4 text-white animate-spin" /> Loading...
            </span>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
