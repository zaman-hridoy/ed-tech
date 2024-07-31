"use client";

import ActionTooltip from "@/components/action-tooltip";
import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "@/lib/instance";
import { InstitutionDataType, SessionWithUserType } from "@/lib/types";
import { CheckCircle, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  institution: InstitutionDataType;
}

const ActionButton = ({ institution }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const session = data as SessionWithUserType | null;
  const [loading, setLoading] = useState(false);
  const handleMakePrimary = async (checked: boolean) => {
    try {
      setLoading(true);
      await axios.post(
        "/content/institues/user_institute_primary",
        {
          // primary: status,
          user_institutes_id: institution?.user_institute_id,
        },
        {
          headers: {
            Authorization: session?.user?.accessToken,
          },
        }
      );
      await axios.post(
        "/profile/UserInformationEdit",
        {
          university: `${institution.name}, ${institution.country}`,
          designation: institution.designation,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.post(
        "/content/institues/deleteUserProgram",
        {
          user_program_id: institution?.user_program_id,
          user_institutes_id: institution?.user_institute_id,
          user_course_id: institution?.user_course_id,
        },
        {
          headers: {
            Authorization: `${session?.user?.accessToken}`,
          },
        }
      );

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading || deleteLoading) {
    return (
      <div className="absolute top-2 right-2 flex items-center gap-x-2">
        <Loader2 className="h-7 w-7 animate-spin transition text-[var(--brand-color)]" />
      </div>
    );
  }

  return (
    <div className="absolute top-2 right-2 flex items-center gap-x-2">
      {!institution.primary_institute ? (
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="airplane-mode"
            className="text-sm tracking-tight text-slate-500"
          >
            Make primary
          </Label>
          <Switch
            id="airplane-mode"
            checked={institution?.primary_institute}
            onCheckedChange={(checked) => handleMakePrimary(checked)}
          />
        </div>
      ) : (
        <span className="bg-[var(--brand-color-success)] text-white text-sm tracking-tight flex items-center gap-1 rounded-full px-[6px] font-semibold">
          <CheckCircle className="h-4 w-4" /> Active
        </span>
      )}
      {!institution?.primary_institute && (
        <ConfirmAlertModal
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your University Data."
          onContinue={handleDelete}
          loading={deleteLoading}
        >
          <ActionTooltip label="Remove">
            <Button
              variant="destructive"
              size="icon"
              className="h-auto w-auto p-1"
              disabled={deleteLoading}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </ActionTooltip>
        </ConfirmAlertModal>
      )}
    </div>
  );
};

export default ActionButton;
