"use client";
import { Button } from "@/components/ui/button";
import axios from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  CircleDashedIcon,
  Loader2,
  PlusIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddressFormModal } from "./address-form-modal";

interface Props {
  onSelectAddress: (address: any) => void;
  selectedAddress: any;
}

const AddressTabContent = ({ onSelectAddress, selectedAddress }: Props) => {
  const session = useSession();

  const addressState = useQuery({
    queryKey: ["show-address-list"],
    queryFn: () =>
      axios.post("/auth/users/get-user-address", {
        user_id: session.data?.user?.userId,
      }),
    enabled: !!session.data,
  });

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const handleRemoveAddress = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await axios
        .post(`/auth/users/delete-user-address/${id}`)
        .then((res) => res.data);
      addressState.refetch();
      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  if (addressState.status === "error") {
    return (
      <div>
        <h1>Error to show address list</h1>
      </div>
    );
  }

  if (addressState.status === "pending") {
    return (
      <div className="pt-14 md:pt-16 lg:pt-20 pb-10">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-20 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {addressState.data &&
        addressState.data.data?.map((address: any) => (
          <div
            key={address.id}
            className="flex items-center gap-4 border-2 bg-slate-100 hover:bg-slate-200 p-4 rounded-md cursor-pointer transition text-slate-900 capitalize"
          >
            <span>
              {selectedAddress?.id === address?.id ? (
                <CheckCircleIcon className="w-6 h-6 text-[var(--brand-color-success)]" />
              ) : (
                <CircleDashedIcon className="w-6 h-6 text-slate-400" />
              )}
            </span>
            <div className="flex-1" onClick={() => onSelectAddress(address)}>
              <p className="text-base font-medium">
                {address.full_name}, {address.address}, {address.city}-
                {address.zipcode}, {address.state}, {address.country}
              </p>
            </div>
            <div className="flex gap-2 ml-auto">
              <AddressFormModal title="Update address" initialValues={address}>
                <Button
                  variant="link"
                  className="text-[var(--brand-color)]"
                  size="sm"
                  disabled={deletingId === address.id}
                >
                  Edit
                </Button>
              </AddressFormModal>
              <Button
                variant="link"
                className="text-[var(--brand-color-alert)]"
                size="sm"
                disabled={deletingId === address.id}
                onClick={() => handleRemoveAddress(address.id)}
              >
                {deletingId === address.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        ))}

      <AddressFormModal title="Add a new address">
        <Button size="sm" variant="primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add new address
        </Button>
      </AddressFormModal>
    </div>
  );
};

export default AddressTabContent;
