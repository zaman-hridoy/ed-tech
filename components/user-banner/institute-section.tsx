import { UserProfileType } from "@/lib/types";

interface Props {
  profile: UserProfileType;
}

const InstituteSection = async ({ profile }: Props) => {
  return (
    <div className="mt-4 text-white flex flex-col">
      <span className="text-sm text-slate-400 md:text-white font-semibold tracking-tight">
        {profile?.designation}
      </span>
      <span className="text-sm text-slate-400 md:text-white font-semibold tracking-tight">
        {profile?.university}
      </span>
    </div>
  );
};

export default InstituteSection;
