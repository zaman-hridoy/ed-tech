import UserAvatar from "@/components/user-avatar";
import { UserProfileType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  profile: UserProfileType | null;
}

const AuthNav = ({ profile }: Props) => {
  return (
    <nav className="px-4 md:px-8 py-2 bg-[var(--brand-color)] flex flex-row justify-between items-center gap-x-2 md:gap-x-6 fixed top-0 left-0 right-0 z-50">
      <Link href="/dashboard">
        <div className="relative w-[147px] h-[30px] lg:w-[167px] lg:h-[40px]">
          <Image
            src="/logos/auth-logo/logo.svg"
            alt="Simplitaught"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>

      <UserAvatar
        className="h-10 w-10"
        fallbackName={profile?.name}
        src={profile?.image}
      />
    </nav>
  );
};

export default AuthNav;
