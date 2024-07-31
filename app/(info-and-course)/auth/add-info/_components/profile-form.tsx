"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import UploadAvatar from "@/components/user-banner/upload-avatar";
import { country_arr, states } from "@/lib/country-state";
import { SessionWithUserType, UserProfileType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowRight, CalendarIcon, Edit3Icon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import axios from "@/lib/instance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import FormTitle from "../../../_components/form-title";
import { NameUpdateModal } from "./name-update-nodal";

const formSchema = z.object({
  address: z.string({ required_error: "Please enter your address." }).min(3),
  country: z.string({ required_error: "Please select your country." }).min(1),
  state: z.string({ required_error: "Please select your state." }).min(1),
  birthdate: z.date({ required_error: "Enter your birthdate." }),
  phone_number: z.string().optional(),
  gender: z.string({ required_error: "Choose your gender" }).min(1),
});

interface Props {
  profile: UserProfileType | null;
}

type FormSchemaType = z.infer<typeof formSchema>;
type SelectOptionType = {
  id: number;
  name: string;
};

const ProfileForm = ({ profile }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const session = data as SessionWithUserType | null;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: profile?.address || "",
      country: "",
      state: "",
      birthdate: profile?.birthdate ? new Date(profile?.birthdate) : undefined,
      phone_number: profile?.phone_number || "",
      gender: profile?.gender || "",
    },
  });

  const countryArrary: SelectOptionType[] = country_arr.map((c, i) => ({
    id: i,
    name: c,
  }));

  const [loading, setLoading] = useState(false);

  const countryId: number = +form.getValues("country");

  const selectedCountry = countryArrary[countryId];

  const [stateArr, setStateArr] = useState<SelectOptionType[]>([]);

  // initialize values
  useEffect(() => {
    if (profile) {
      form.setValue("address", profile?.address || "");
      if (profile?.birthdate) {
        form.setValue("birthdate", new Date(profile?.birthdate));
      }
      form.setValue("phone_number", profile?.phone_number || "");
      form.setValue("gender", profile?.gender || "");

      const country = countryArrary.find((c) => c.name === profile?.country);
      if (country) {
        form.setValue("country", `${country.id}`);

        const stateArrList: SelectOptionType[] = states[+country.id + 1]
          ?.split("|")
          .map((s: string, i: number) => ({
            id: i + 1,
            name: s,
          }));
        setStateArr(stateArrList);

        setTimeout(() => {
          form.setValue("state", profile?.state || "");
        }, 300);
      }
    }
  }, [profile]);

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setLoading(true);
      await axios.post(
        "/profile/UserInformationEdit",
        {
          ...values,
          country: selectedCountry?.name,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      // update on elastic search
      // await axios.post("/search/user/update", {
      //   id: session?.user?.userId,
      //   ...values,
      // });

      toast.success("Profile updated successfully.");
      router.refresh();
      router.push("/auth/add-info?active_tab=1");
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  form.watch("country");

  return (
    <div className="bg-white rounded-md p-4 md:p-6 border shadow-md mt-5 border-slate-100">
      <div className="flex flex-row items-center gap-x-3">
        <UploadAvatar
          src={profile?.image}
          fallbackName={profile?.name}
          className="w-[110px] h-[110px]"
        />
        <div className="flex flex-col">
          <div className="shrink-0 flex items-center gap-x-4">
            <h2 className="text-lg text-slate-900 tracking-tight font-semibold">
              {profile?.name}
            </h2>
            <NameUpdateModal profile={profile}>
              <Button
                className="gap-x-2 bg-[var(--brand-color-secondary)] text-white hover:bg-[var(--brand-color-secondary)] hover:text-white w-auto h-auto px-3 py-1 text-xs rounded-sm"
                variant="ghost"
              >
                <span>Edit</span> <Edit3Icon className="text-inherit w-3 h-3" />
              </Button>
            </NameUpdateModal>
          </div>
          <span className="text-xs text-slate-500">{session?.user?.email}</span>
        </div>
      </div>

      <Separator className="my-4 bg-slate-200" />

      <FormTitle title="Student Details" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Address:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Write full address"
                      className="text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      disabled={isSubmitting}
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-start gap-x-4 flex-col sm:flex-row">
              {/* for country */}
              <div className="shrink-0 w-full sm:w-[150px]">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Country
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          const stateArrList: SelectOptionType[] = states[
                            +val + 1
                          ]
                            ?.split("|")
                            .map((s: string, i: number) => ({
                              id: i + 1,
                              name: s,
                            }));
                          setStateArr(stateArrList);
                          form.setValue("state", "");
                        }}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <ScrollArea className="h-[180px]">
                            {countryArrary.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id}`}
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
              </div>

              {/* for state */}
              <div className="sm:flex-1 w-full">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        State
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <ScrollArea className="h-[180px]">
                            {stateArr?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.name}`}
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
              </div>
            </div>

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-semibold mt-1 w-fit">
                    Date of birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) => date >= new Date()}
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Phone:
                  </FormLabel>

                  <FormControl>
                    <PhoneInput
                      country={"us"}
                      placeholder="Phone"
                      disabled={isSubmitting}
                      {...field}
                      inputStyle={{
                        width: "100%",
                        border: "1px solid #E2E8F0",
                        height: "2.5rem",
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* gender */}
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Gender:
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3 space-x-0 sm:flex-row sm:space-x-2 sm:space-y-0"
                    >
                      {gernderItems.map((item) => (
                        <FormItem
                          key={item.name}
                          className={cn(
                            "flex items-center border space-x-2 shadow cursor-pointer transition duration-300 rounded-md px-3 py-3 text-sm font-bold text-slate-500 hover:shadow-md",
                            field.value === item.name &&
                              "bg-[var(--brand-color-success)] text-white"
                          )}
                          onClick={() => field.onChange(item.name)}
                        >
                          <FormControl>
                            <div>
                              <RadioGroupItem
                                value={item.name}
                                className="sr-only"
                              />
                              {item.icon}
                            </div>
                          </FormControl>
                          <FormLabel
                            className="font-semibold cursor-pointer"
                            style={{ margin: 0, marginLeft: 10 }}
                          >
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <Separator className="mt-8 mb-4 bg-slate-200" />

      <FormTitle title="Credentials" />
      <div className="flex flex-col space-y-2">
        <span className="text-xs font-normal tracking-tight text-slate-500">
          Password
        </span>
        <div className="flex items-center gap-x-4">
          {" "}
          <div className="flex items-center gap-x-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div
                key={d}
                className="bg-[var(--brand-color-secondary)] w-[6px] h-[6px] rounded-full"
              />
            ))}{" "}
          </div>
          <Link href="/auth/change-password">
            <span className="text-sm font-semibold tracking-tight text-[var(--brand-color)] hover:underline">
              Change Password
            </span>
          </Link>
        </div>
      </div>

      {/* form actions */}
      <Separator className="mt-8 mb-4 bg-slate-200" />
      <div className="flex items-center justify-end gap-x-4">
        {/* <Button
          onClick={form.handleSubmit(onSubmit)}
          className="text-sm font-semibold tracking-tight bg-[var(--brand-color-secondary)] text-white gap-x-4 hover:bg-[var(--brand-color-secondary)]"
        >
          Submit <Save className="text-inherit w-4 h-4" />
        </Button> */}
        <Button
          variant="primary"
          className="text-sm font-semibold tracking-tight bg-[var(--brand-color)] text-white gap-x-4 hover:bg-[var(--brand-color)]"
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting && (
            <Loader2 className="text-inherit w-4 h-4 animate-spin transition" />
          )}
          Save & Proceed{" "}
          {!isSubmitting && <ArrowRight className="text-inherit w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;

const gernderItems = [
  {
    name: "Male",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99133 0C8.0498 0.00368884 6.15125 0.571902 4.52691 1.63543C2.90258 2.69896 1.62258 4.21189 0.842818 5.98996C0.0630576 7.76803 -0.182807 9.73448 0.135172 11.6498C0.453151 13.5651 1.32125 15.3466 2.63373 16.7773C3.57112 17.7934 4.70882 18.6044 5.97512 19.159C7.24142 19.7137 8.60889 20 9.99133 20C11.3738 20 12.7412 19.7137 14.0075 19.159C15.2739 18.6044 16.4115 17.7934 17.3489 16.7773C18.6614 15.3466 19.5295 13.5651 19.8475 11.6498C20.1655 9.73448 19.9196 7.76803 19.1399 5.98996C18.3601 4.21189 17.0801 2.69896 15.4558 1.63543C13.8314 0.571902 11.9329 0.00368884 9.99133 0ZM9.99133 18.0186C7.91765 18.0155 5.92605 17.2081 4.43559 15.7663C4.8881 14.6647 5.65789 13.7225 6.64713 13.0594C7.63637 12.3963 8.80041 12.0422 9.99133 12.0422C11.1823 12.0422 12.3463 12.3963 13.3355 13.0594C14.3248 13.7225 15.0946 14.6647 15.5471 15.7663C14.0566 17.2081 12.065 18.0155 9.99133 18.0186ZM7.98926 8.00828C7.98926 7.61231 8.10668 7.22523 8.32667 6.89599C8.54666 6.56675 8.85934 6.31014 9.22517 6.15861C9.59101 6.00707 9.99355 5.96743 10.3819 6.04468C10.7703 6.12193 11.127 6.31261 11.407 6.5926C11.687 6.87259 11.8777 7.22933 11.9549 7.61769C12.0322 8.00606 11.9925 8.4086 11.841 8.77444C11.6895 9.14027 11.4329 9.45295 11.1036 9.67294C10.7744 9.89293 10.3873 10.0103 9.99133 10.0103C9.46035 10.0103 8.95112 9.79941 8.57566 9.42395C8.2002 9.04849 7.98926 8.53926 7.98926 8.00828ZM16.9085 14.0145C16.0141 12.4847 14.6375 11.2947 12.9944 10.631C13.5041 10.053 13.8362 9.34031 13.9509 8.5783C14.0656 7.8163 13.9579 7.03739 13.6409 6.33504C13.3238 5.6327 12.8108 5.03676 12.1635 4.61874C11.5161 4.20071 10.7619 3.97836 9.99133 3.97836C9.22075 3.97836 8.46653 4.20071 7.81918 4.61874C7.17183 5.03676 6.65886 5.6327 6.34181 6.33504C6.02476 7.03739 5.91711 7.8163 6.03177 8.5783C6.14643 9.34031 6.47853 10.053 6.98823 10.631C5.34513 11.2947 3.96858 12.4847 3.07418 14.0145C2.36139 12.8003 1.98478 11.4183 1.98306 10.0103C1.98306 7.88642 2.82678 5.84948 4.32863 4.34764C5.83047 2.8458 7.86741 2.00207 9.99133 2.00207C12.1153 2.00207 14.1522 2.8458 15.654 4.34764C17.1559 5.84948 17.9996 7.88642 17.9996 10.0103C17.9979 11.4183 17.6213 12.8003 16.9085 14.0145Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    name: "Female",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9591 9.32856V9.01794C19.9591 8.75742 19.899 8.50691 19.8489 8.25642C19.5872 6.73226 18.9725 5.29049 18.0538 4.04647C17.1351 2.80245 15.9381 1.79071 14.5584 1.09217C13.3881 0.474484 12.1011 0.109229 10.7808 0.0200289L10.6907 0.480937V0H9.33797H9.00736L8.27586 0.110205C6.40016 0.428673 4.65862 1.28899 3.26589 2.58513C1.60629 4.07232 0.509432 6.08563 0.159737 8.28647C-0.0869263 9.62879 -0.0475557 11.0081 0.275323 12.3341C0.598202 13.6602 1.19731 14.9031 2.03346 15.9818C2.7971 17.0185 3.75895 17.8933 4.86319 18.5555C5.96742 19.2177 7.19208 19.6541 8.46624 19.8395C9.07168 19.9458 9.68521 19.9994 10.2999 19.9998C12.3846 20.0143 14.4099 19.3062 16.0313 17.9958C18.1391 16.3922 19.5319 14.0241 19.909 11.4027C19.909 11.2223 19.9091 11.042 19.9792 10.8516V10.5309L19.9591 9.32856ZM5.66067 16.4227L6.38214 16.1421C6.75287 16.0018 7.11355 15.8615 7.46425 15.7012C7.81019 15.5293 8.13057 15.3101 8.41615 15.0499C8.63457 14.8236 8.80001 14.5516 8.90051 14.2536C9.00102 13.9555 9.03409 13.6389 8.99733 13.3265V13.1962C8.99582 13.0802 8.95236 12.9686 8.87501 12.882C8.79767 12.7955 8.69167 12.7398 8.57651 12.7253L8.17568 12.6652C7.59245 12.6181 7.01708 12.5004 6.46225 12.3145C6.65141 11.5818 6.73908 10.8266 6.72278 10.07C6.72278 9.78278 6.72278 9.49221 6.72278 9.19829C6.77288 8.45682 6.83303 7.65524 6.94325 6.86366C7.00476 6.51926 7.10561 6.18306 7.24384 5.86167C7.41482 5.39515 7.711 4.98472 8.09985 4.67541C8.4887 4.3661 8.95521 4.16985 9.44824 4.10818C9.77776 4.0309 10.1207 4.0309 10.4502 4.10818L10.6005 4.15827C10.7381 4.27464 10.8978 4.36213 11.0699 4.41549C11.2421 4.46886 11.4232 4.48701 11.6025 4.46888C11.8721 4.46601 12.1359 4.54755 12.3569 4.70207C12.5779 4.85659 12.7451 5.07637 12.835 5.33061C13.0888 5.93384 13.2248 6.58004 13.2357 7.23439C13.2357 7.82557 13.2357 8.4067 13.2858 8.99788C13.3359 9.58906 13.2858 9.9999 13.2858 10.561C13.2858 11.1221 13.366 11.563 13.4361 12.084C13.4453 12.1698 13.4655 12.254 13.4963 12.3345C13.2327 12.4292 12.961 12.4997 12.6847 12.5449L11.7428 12.6852L11.3119 12.7454C11.2107 12.7596 11.1168 12.8064 11.0445 12.8787C10.9722 12.951 10.9253 13.0449 10.9111 13.1461C10.8035 13.5928 10.843 14.0621 11.0235 14.4846C11.204 14.907 11.516 15.2599 11.9131 15.4908C12.344 15.7213 12.7849 15.9217 13.2157 16.112L14.2177 16.583L14.6085 16.7633L14.1676 17.0539C12.5704 18.0537 10.6757 18.468 8.80694 18.2263C7.76763 18.0646 6.77214 17.693 5.88114 17.1341C5.60058 16.9738 5.34002 16.8034 5.0795 16.6331L5.66067 16.4227ZM13.7468 14.058C14.0442 13.9764 14.3328 13.8656 14.6085 13.7273C14.9215 13.6039 15.1798 13.372 15.3362 13.074C15.4925 12.7761 15.5365 12.4318 15.4602 12.1041C15.4491 12.0273 15.4184 11.9547 15.371 11.8932C15.3236 11.8318 15.2611 11.7836 15.1896 11.7534V11.6031C15.1896 11.2223 15.0995 10.8315 15.0794 10.4408C15.0594 10.05 15.0794 9.48887 15.0794 9.00791C15.0794 8.52695 15.0794 7.92576 15.0794 7.38469C15.0668 6.48197 14.8902 5.58906 14.5584 4.74944C14.3653 4.16788 13.9945 3.66162 13.4983 3.30207C13.0022 2.94252 12.4056 2.74782 11.7929 2.74545C11.0675 2.31129 10.2034 2.17147 9.37809 2.35469C8.27139 2.49423 7.25479 3.03639 6.52237 3.87771C5.95145 4.58068 5.56263 5.41352 5.39017 6.30255C5.20026 7.26971 5.10292 8.25276 5.09956 9.23838V9.48888C5.09956 10.1602 5.02942 10.8215 4.97932 11.4929C4.98301 11.5396 4.98301 11.5864 4.97932 11.6331C4.90348 11.6557 4.83455 11.6971 4.77891 11.7534C4.7209 11.8132 4.68153 11.8887 4.66553 11.9705C4.64952 12.0523 4.6576 12.137 4.68877 12.2143L4.5585 12.3045L4.308 12.4949C4.2604 12.5416 4.22327 12.5979 4.19908 12.6601C4.1749 12.7223 4.1642 12.7889 4.16771 12.8556C4.16879 12.9219 4.1836 12.9873 4.21119 13.0477C4.23878 13.108 4.27853 13.162 4.328 13.2063C4.43135 13.3016 4.56828 13.352 4.70876 13.3466C4.80442 13.3324 4.90205 13.3404 4.99412 13.3699C5.0862 13.3994 5.17029 13.4497 5.23985 13.5169C5.69153 13.8545 6.22332 14.0686 6.7829 14.1381L6.24184 14.3786L5.29997 14.7794L4.03745 15.3405L3.84706 15.4407C2.50247 13.9153 1.76732 11.9478 1.7821 9.91444C1.79689 7.88107 2.5606 5.92449 3.92724 4.41879C4.67985 3.57784 5.59761 2.90094 6.62334 2.43031C7.64907 1.95968 8.76079 1.70541 9.88912 1.68334C11.0137 1.6629 12.1308 1.87081 13.1727 2.29448C14.2147 2.71816 15.1599 3.34879 15.9512 4.14824C16.7208 4.91901 17.3296 5.83495 17.7424 6.8429C18.1553 7.85085 18.3638 8.93075 18.3559 10.0199C18.3514 12.05 17.5946 14.0063 16.2317 15.5108C15.6846 15.195 15.1114 14.9269 14.5183 14.7093C14.1376 14.5489 13.7468 14.3986 13.376 14.2083H13.3159L13.7468 14.058Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    name: "Unspecified",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V10C9 10.2652 9.10536 10.5196 9.2929 10.7071C9.48043 10.8946 9.73479 11 10 11C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5ZM10.92 13.62C10.8981 13.5563 10.8679 13.4957 10.83 13.44L10.71 13.29C10.5694 13.1512 10.3908 13.0572 10.1968 13.0199C10.0028 12.9825 9.80212 13.0034 9.62 13.08C9.49882 13.1306 9.38721 13.2017 9.29 13.29C9.19732 13.3834 9.124 13.4943 9.07423 13.6161C9.02447 13.7379 8.99924 13.8684 9 14C9.00159 14.1307 9.02876 14.2598 9.08 14.38C9.12492 14.5041 9.19657 14.6168 9.28989 14.7101C9.38321 14.8034 9.49591 14.8751 9.62 14.92C9.73971 14.9729 9.86913 15.0002 10 15.0002C10.1309 15.0002 10.2603 14.9729 10.38 14.92C10.5041 14.8751 10.6168 14.8034 10.7101 14.7101C10.8034 14.6168 10.8751 14.5041 10.92 14.38C10.9712 14.2598 10.9984 14.1307 11 14C11.0049 13.9334 11.0049 13.8666 11 13.8C10.9828 13.7362 10.9558 13.6755 10.92 13.62ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
];
