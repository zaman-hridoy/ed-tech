import { authOptions } from "@/lib/auth";
import { getCurrentProfile } from "@/lib/current-profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import FormTabs from "./_components/form-tabs";

export const dynamic = "force-dynamic";

const AddProfileInfo = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const profile = await getCurrentProfile(session);

  return (
    <div className="h-full max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl tracking-tight text-slate-700">
        Welcome to SimpliTaught,{" "}
        <span className="font-bold">{profile?.name}!</span>
      </h1>
      <p className="text-sm text-slate-500 tracking-tight">
        Please fill your information required to generate your profile. You can
        later change this information from your settings.
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FormTabs profile={profile} />
      </Suspense>
    </div>
  );
};

export default AddProfileInfo;
