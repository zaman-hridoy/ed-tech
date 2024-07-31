"use client";

import { UserProfileType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import InstitutionForms from "./institution-forms";
import ProfileForm from "./profile-form";

interface Props {
  profile: UserProfileType | null;
}

const FormTabs = ({ profile }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("active_tab");

  return (
    <div className="mt-6 md:mt-8">
      {/* tab header */}
      <div className="w-full h-[50px] bg-white shadow-md border rounded-md grid grid-cols-2">
        <button
          className="flex items-center gap-x-2 w-full h-full px-4 relative"
          onClick={() => router.push("/auth/add-info?active_tab=0")}
        >
          <span className="text-sm text-slate-900 font-semibold tracking-tight">
            Educator Information
          </span>
          <CheckCircle2Icon className="w-4 h-4 text-slate-300" />

          <div
            className={cn(
              "absolute bottom-0 left-0 w-0 h-[5px] bg-[var(--brand-color)] rounded-bl-md",
              activeTab === "0" && "w-full transition-all duration-500"
            )}
          />
        </button>

        <button
          className="flex items-center gap-x-2 w-full h-full px-4 relative"
          onClick={() => router.push("/auth/add-info?active_tab=1")}
        >
          <span className="text-sm text-slate-900 font-semibold tracking-tight">
            Institution and Program Information
          </span>
          <CheckCircle2Icon className="w-4 h-4 text-slate-300" />

          <div
            className={cn(
              "absolute bottom-0 left-0 w-0 h-[5px] bg-[var(--brand-color)] rounded-br-md",
              activeTab === "1" && "w-full transition-all duration-500"
            )}
          />
        </button>
      </div>

      {/* form panel */}
      {activeTab === "0" && <ProfileForm profile={profile} />}

      {activeTab === "1" && <InstitutionForms />}
    </div>
  );
};

export default FormTabs;
