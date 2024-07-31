"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { country_arr, states } from "@/lib/country-state";
import axios from "@/lib/instance";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import "react-phone-input-2/lib/style.css";

const address_type_list = [
  "House",
  "Townhome",
  "Apartment",
  "Business",
  "Other",
];

const formSchema = z.object({
  full_name: z.string({ required_error: "Enter your address." }).min(1),
  region: z.string({ required_error: "Select your Country / Region." }).min(1),
  phone_number: z
    .string({ required_error: "Provide your phone number." })
    .min(1),
  address: z.string({ required_error: "Give your address details." }).min(1),
  city: z.string({ required_error: "Select your city here." }).min(1),
  state: z.string({ required_error: "Select your state here." }).min(1),
  zipcode: z.string({ required_error: "Enter your zip code." }).min(1),
  additional_instruction: z.string().optional().default(""),
  need_security_code: z.string().optional().default(""),
  address_type: z
    .enum(["House", "Townhome", "Apartment", "Business", "Other"])
    .default("House"),
});

type FormSchemaType = z.infer<typeof formSchema>;
type SelectOptionType = {
  id: number;
  name: string;
};

interface Props {
  children: React.ReactNode;
  initialValues?: FormSchemaType;
  title: string;
}

export function AddressFormModal({ children, initialValues, title }: Props) {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: initialValues?.full_name || "",
      region: initialValues?.region || "",
      state: initialValues?.state || "",
      city: initialValues?.city || "",
      address: initialValues?.address || "",
      zipcode: initialValues?.zipcode || "",
      phone_number: initialValues?.phone_number || "",
      additional_instruction: initialValues?.additional_instruction || "",
      need_security_code: initialValues?.need_security_code || "",
      address_type: initialValues?.address_type || "House",
    },
  });

  const countryArrary: SelectOptionType[] = country_arr.map((c, i) => ({
    id: i,
    name: c,
  }));

  const countryId: number = +form.getValues("region");
  const selectedCountry = countryArrary[countryId];
  const [stateArr, setStateArr] = useState<SelectOptionType[]>([]);

  // initialize values
  useEffect(() => {
    console.log({ initialValues });
    if (initialValues && isOpen) {
      form.setValue("full_name", initialValues?.full_name || "");
      form.setValue("address", initialValues?.address || "");
      form.setValue("city", initialValues?.city || "");

      form.setValue("zipcode", initialValues?.zipcode || "");
      form.setValue("phone_number", initialValues?.phone_number || "");
      form.setValue(
        "additional_instruction",
        initialValues?.additional_instruction || ""
      );
      form.setValue(
        "need_security_code",
        initialValues?.need_security_code || ""
      );
      form.setValue("address_type", initialValues?.address_type || "");

      const country = countryArrary.find(
        (c) => c.name === initialValues?.region
      );
      if (country) {
        form.setValue("region", `${country.id}`);

        const stateArrList: SelectOptionType[] = states[+country.id + 1]
          ?.split("|")
          .map((s: string, i: number) => ({
            id: i + 1,
            name: s,
          }));

        console.log({ stateArrList }, "xsxssx");
        setStateArr(stateArrList);

        setTimeout(() => {
          form.setValue("state", initialValues?.state || "");
        }, 300);
      }
    }

    return () => {
      form.reset();
    };
  }, [initialValues, form, isOpen]);

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: FormSchemaType) => {
    const payload = {
      ...values,
      region: selectedCountry?.name,
      user_id: session.data?.user?.userId,
    };
    try {
      setLoading(true);
      await axios.post("/auth/users/add-user-address", payload, {
        headers: {
          Authorization: `${session.data?.user?.accessToken}`,
        },
      });

      toast.success("Address added successfully.");
      router.refresh();
      queryClient.refetchQueries({ queryKey: ["show-address-list"] });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting || loading;

  form.watch("region");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[625px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {`Make changes to your address here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="full_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Fullname:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Write your fullname"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* for country */}

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Country/Region
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
                          <SelectTrigger className="bg-white focus:ring-0 focus:ring-offset-0">
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

                {/* for state */}

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
                          <SelectTrigger className="bg-white focus:ring-0 focus:ring-offset-0">
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

                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        City:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your city"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="zipcode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Zip Code:
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your zip code"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          autoFocus
                          {...field}
                        />
                      </FormControl>
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
              </div>

              <div>
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Address:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write full address"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  name="additional_instruction"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Additional Instruction (Optional):
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide details such as building description, a nearby landmark or other navigation instructions"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="need_security_code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Need Security Code (Optional):
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Security Code"
                          className="bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          disabled={isSubmitting}
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  name="address_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Address Type:
                      </FormLabel>

                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row"
                        >
                          {address_type_list.map((item) => (
                            <FormItem
                              key={item}
                              className={cn(
                                "flex items-center border space-x-2 shadow cursor-pointer transition duration-300 rounded-md px-2 py-2 text-sm font-bold text-slate-500 hover:shadow-md",
                                field.value === item &&
                                  "bg-[var(--brand-color-success)] text-white"
                              )}
                              onClick={() => field.onChange(item)}
                            >
                              <FormControl>
                                <div>
                                  <RadioGroupItem
                                    value={item}
                                    className="sr-only"
                                  />
                                </div>
                              </FormControl>
                              <FormLabel
                                className="font-semibold cursor-pointer"
                                style={{ margin: 0, marginLeft: 10 }}
                              >
                                {item}
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
        </div>
        <DialogFooter className="bg-slate-300 p-4">
          <DialogClose>
            <Button variant="secondary" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="primary"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2" />}
            {isSubmitting ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
