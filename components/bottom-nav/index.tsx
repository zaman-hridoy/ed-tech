"use client";

import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/lib/types";
import { Bell, LayoutGrid, Menu, UserSquare2 } from "lucide-react";
import Link from "next/link";
import UserSidebar from "../private-navbar/user-sidebar";

interface Props {
  profile: UserProfileType | null;
}

const BottomNav = ({ profile }: Props) => {
  return (
    <div className="bg-[var(--brand-color)] px-0 py-[1px] fixed bottom-0 z-50 w-full flex items-center justify-evenly sm:hidden border-t border-slate-100">
      <Button
        variant="ghost"
        className="h-auto w-auto text-white flex-grow"
        asChild
      >
        <Link href="/dashboard">
          <div className="flex flex-col items-center">
            <LayoutGrid className="w-7 h-7" />
            <span className="text-[10px] font-bold tracking-tighter">
              Dashboard
            </span>
          </div>
        </Link>
      </Button>
      <Button variant="ghost" className="h-auto w-auto text-white flex-grow">
        <Link href="/profile">
          <div className="flex flex-col items-center">
            <UserSquare2 className="w-7 h-7" />
            <span className="text-[10px] font-bold tracking-tighter">
              Profile
            </span>
          </div>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="h-auto w-auto text-white flex-grow relative"
      >
        <div className="flex flex-col items-center">
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H5C4.73478 18 4.48043 18.1054 4.29289 18.2929C4.10536 18.4804 4 18.7348 4 19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM16 13V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H13C13.7956 16 14.5587 15.6839 15.1213 15.1213C15.6839 14.5587 16 13.7956 16 13ZM8 2H10V6.86L9.64 6.56C9.46031 6.41033 9.23385 6.32837 9 6.32837C8.76615 6.32837 8.53969 6.41033 8.36 6.56L8 6.86V2ZM2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6V9C5.99999 9.19116 6.05477 9.37833 6.15785 9.53932C6.26094 9.7003 6.40801 9.82837 6.58164 9.90835C6.75527 9.98832 6.94819 10.0169 7.13754 9.99056C7.32688 9.96427 7.50473 9.88426 7.65 9.76L9 8.63L10.35 9.76C10.5311 9.91491 10.7617 10 11 10C11.1447 9.99898 11.2876 9.96835 11.42 9.91C11.5936 9.82967 11.7405 9.70124 11.8433 9.53995C11.9461 9.37866 12.0005 9.19127 12 9V2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13Z"
              fill="currentColor"
            />
          </svg>
          <span className="absolute top-0 right-1/4 w-2 h-2 bg-[var(--brand-color-alert)] rounded-full"></span>
          <span className="text-[10px] font-bold tracking-tighter">Recent</span>
        </div>
      </Button>
      <Button
        variant="ghost"
        className="h-auto w-auto text-white flex-grow relative"
      >
        <div className="flex flex-col items-center">
          <Bell className="w-7 h-7" />
          <span className="absolute top-0 right-1/3 w-2 h-2 bg-[var(--brand-color-alert)] rounded-full"></span>
          <span className="text-[10px] font-bold tracking-tighter">
            Notifications
          </span>
        </div>
      </Button>
      <UserSidebar side="right" profile={profile}>
        <Button variant="ghost" className="h-auto w-auto text-white flex-grow">
          <div className="flex flex-col items-center">
            <Menu className="w-7 h-7" />
            <span className="text-[10px] font-bold tracking-tighter">Menu</span>
          </div>
        </Button>
      </UserSidebar>
    </div>
  );
};

export default BottomNav;
