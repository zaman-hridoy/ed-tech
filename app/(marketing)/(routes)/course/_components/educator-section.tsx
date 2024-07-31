"use client";

import { getProfileById } from "@/actions/get-profile-by-id";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { usernameToSlug } from "@/lib/helper-methods";
import { UserProfileType } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  educatorId: number;
}

const EducatorSection = ({ educatorId }: Props) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProfile() {
      try {
        const profileData = await getProfileById(educatorId);
        if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [educatorId]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-2 items-end justify-end">
        <Skeleton className="w-20 h-20 bg-emerald-200 rounded-full" />
        <Skeleton className="w-[150px] h-3 bg-emerald-200" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end justify-end">
      <UserAvatar className="w-20 h-20" src={profile?.image} />
      <Link
        href={`/${usernameToSlug(profile?.name)}/${profile?.userId}`}
        className="text-base tracking-tight font-semibold text-slate-900 hover:underline whitespace-nowrap hover:text-[var(--brand-color)]"
      >
        {profile?.name}
      </Link>
    </div>
  );
};

export default EducatorSection;
