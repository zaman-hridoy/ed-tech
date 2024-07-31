import UserAvatar from "@/components/user-avatar";
import { UserProfileType } from "@/lib/types";
import { Check } from "lucide-react";
import Image from "next/image";
import FollowUnfollowActions from "./follow-unfollow-actions";
import InstituteSection from "./institute-section";
import StudentTerms from "./student-terms";
import UploadAvatar from "./upload-avatar";

interface Props {
  profile: UserProfileType | null;
  showUploadIcon?: boolean;
}

const UserBanner = async ({ profile, showUploadIcon = true }: Props) => {
  return (
    <div className="w-full relative">
      <div className="w-full h-[150px] md:h-[240px] relative">
        <Image
          alt="Banner"
          src="/images/cover-photo/10.png"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900/60 from-40%" />
      </div>
      <div className="flex flex-col items-start justify-end w-full h-full p-6 -mt-20 md:mt-0 md:absolute md:top-0 md:left-0">
        <div className="flex items-center flex-col justify-center md:flex-row gap-x-4 w-full md:w-auto">
          {showUploadIcon ? (
            <UploadAvatar
              className="w-[110px] h-[110px]"
              fallbackName="Raymond Reddington"
              src={profile?.image}
            />
          ) : (
            <UserAvatar
              className="w-[110px] h-[110px]"
              fallbackName="Raymond Reddington"
              src={profile?.image}
            />
          )}

          <div className="text-center md:text-left">
            <h2 className="text-slate-900 md:text-white relative text-2xl font-semibold tracking-tight flex items-center justify-center md:justify-start gap-x-2">
              {profile?.name || "Anonymous User"}{" "}
              {profile?.isVerified && (
                <span className="w-4 h-4 rounded-full bg-[var(--brand-color-success)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
            </h2>
            <p className="text-sm font-semibold text-slate-400 md:text-white tracking-tight">
              {profile?.role}
            </p>

            {profile?.role === "Educator" && (
              <InstituteSection profile={profile} />
            )}

            {profile?.role === "Student" && showUploadIcon && <StudentTerms />}

            {!showUploadIcon && profile?.userId && (
              <FollowUnfollowActions otherUserId={profile.userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
