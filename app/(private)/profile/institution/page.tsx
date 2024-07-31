import { getInstitutions } from "@/actions/get-institutions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import InstitutionCard from "../_components/institution-card";

export const dynamic = "force-dynamic";

const InstitutionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const institutions = await getInstitutions(session);

  return (
    <div className="max-w-4xl">
      <Button variant="primary" size="sm" asChild>
        <Link href="/profile/institution/add">
          <span className="flex items-center gap-x-2">
            Add <Plus className="w-4 h-4" />
          </span>
        </Link>
      </Button>

      <Separator className="my-4 bg-slate-200" />
      <div className="flex flex-col gap-y-4">
        {institutions.map((item, idx) => (
          <InstitutionCard key={idx} institution={item} />
        ))}
      </div>
    </div>
  );
};

export default InstitutionPage;
