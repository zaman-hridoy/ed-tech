"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SessionWithUserType, UserProfileType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import FormTitle from "@/app/(info-and-course)/_components/form-title";
import {
  designations_data,
  durations,
  employee_status,
} from "@/app/(info-and-course)/auth/add-info/_components/form-dropdownlist";
import SeachableInput from "@/app/(info-and-course)/auth/add-info/_components/searchable-input";
import SeachableMultipleInput from "@/app/(info-and-course)/auth/add-info/_components/searchable-multiple-input";
import { Input } from "@/components/ui/input";
import axios from "@/lib/instance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";

const educatorFormSchema = z.object({
  institute_id: z.string({ required_error: "Select your university." }).min(1),
  designation: z.string({ required_error: "Please enter your designation." }),
  employee_status: z
    .string({
      required_error: "Please select employee status.",
    })
    .min(1),
  program_id: z.string({ required_error: "Please select a program." }).min(1),
  department: z
    .string({
      required_error: "Please enter your department name.",
    })
    .min(1),
  primary: z.boolean().default(true),
});

const studentFormSchema = z.object({
  institute_id: z.string({ required_error: "Select your university." }).min(1),
  program_duration: z
    .string({
      required_error: "Please enter your program duration.",
    })
    .min(1),
  program_projected_graduation_year: z
    .string({ required_error: "Please enter your projected year." })
    .min(4)
    .max(4),

  program_id: z.string({ required_error: "Please select a program." }).min(1),
  department: z
    .string({
      required_error: "Please enter your department name.",
    })
    .min(1),
  primary: z.boolean().default(true),
});

interface Props {
  profile: UserProfileType | null;
}

type SelectCourseOptionType = {
  id: number;
  name: string;
  value: string;
};

const InstitutionForms = () => {
  const router = useRouter();
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const formSchema =
    session?.user?.type === "Student" ? studentFormSchema : educatorFormSchema;
  type FormSchemaType = z.infer<typeof formSchema>;

  const educatorInitialValues = {
    institute_id: "",
    designation: "",
    employee_status: "",
    department: "",
    program_id: "",
  };

  const studentInitialValues = {
    institute_id: "",
    program_duration: "",
    program_projected_graduation_year: "",
    department: "",
    program_id: "",
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues:
      session?.user?.type === "Student"
        ? studentInitialValues
        : educatorInitialValues,
  });

  const [majorCourses, setMajorCourses] = useState<SelectCourseOptionType[]>(
    []
  );
  const [minorCourses, setMinorCourses] = useState<SelectCourseOptionType[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      const payload: any = {
        ...values,
      };

      if (majorCourses && majorCourses.length > 0) {
        payload.major_courses = JSON.stringify(majorCourses);
      }
      if (minorCourses && minorCourses.length > 0) {
        payload.minor_courses = JSON.stringify(minorCourses);
      }

      await axios.post(`/content/institues/addEducationDetails`, payload, {
        headers: {
          Authorization: `${session?.user?.accessToken}`,
        },
      });
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  return (
    <div className="bg-white rounded-md p-4 md:p-6 border shadow-md mt-5 border-slate-100">
      <FormTitle title="Institution Details" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* institutions name */}
            <SeachableInput
              name="institute_id"
              control={form.control}
              label="Institution Name"
              apiUrl="/content/institues/getInstitute"
              method="get"
              disabled={isSubmitting}
            />
            <div></div>

            {/* program durations for students */}
            {session?.user?.type === "Student" && (
              <FormField
                control={form.control}
                name="program_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Program Duration
                    </FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <ScrollArea className="h-[180px]">
                          {durations.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={`${item.value}`}
                              className="cursor-pointer"
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {/* designation for educator */}
            {(session?.user?.type === "Educator" ||
              session?.user?.type === "ContentManager") && (
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Designation
                    </FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <ScrollArea className="h-[180px]">
                          {designations_data.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={`${item.value}`}
                              className="cursor-pointer"
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {/* projected year for students */}
            {session?.user?.type === "Student" && (
              <FormField
                name="program_projected_graduation_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Projected Graduation Year
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year"
                        className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {/* employee status for educator */}
            {(session?.user?.type === "Educator" ||
              session?.user?.type === "ContentManager") && (
              <FormField
                control={form.control}
                name="employee_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Employment Status
                    </FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <ScrollArea className="h-auto">
                          {employee_status.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={`${item.value}`}
                              className="cursor-pointer"
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>

          <Separator className="mt-8 mb-4 bg-slate-200" />

          <FormTitle title="Program Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* program */}
            <SeachableInput
              name="program_id"
              control={form.control}
              label="Program"
              apiUrl="/content/institues/getPrograms"
              method="post"
            />

            {/* department */}
            <FormField
              name="department"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Department:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Department"
                      className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            {/* mejor programs */}
            <SeachableMultipleInput
              name="major"
              control={form.control}
              label="Major Courses"
              apiUrl="/content/institues/getPrograms"
              method="post"
              setCourses={setMajorCourses}
            />

            {/* minor programs */}
            <SeachableMultipleInput
              name="minor"
              control={form.control}
              label="Minor Courses"
              apiUrl="/content/institues/getPrograms"
              method="post"
              setCourses={setMinorCourses}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </Form>

      {/* form actions */}
      <Separator className="mt-8 mb-4 bg-slate-200" />
      <div className="flex items-center justify-end gap-x-4">
        <Button
          className="text-sm font-semibold tracking-tight gap-x-4"
          variant="secondary"
          onClick={() => router.push("/auth/add-info?active_tab=0")}
        >
          <ArrowLeft className="text-inherit w-4 h-4" /> Back
        </Button>
        <Button
          variant="primary"
          className="text-sm font-semibold tracking-tight bg-[var(--brand-color)] text-white gap-x-4 hover:bg-[var(--brand-color)]"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="w-4 h-4 text-inherit animate-spin transition" />
          )}
          {isSubmitting ? "Saving..." : "Save & Visit Profile"}
        </Button>
      </div>
    </div>
  );
};

export default InstitutionForms;
