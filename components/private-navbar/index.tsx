"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { UserProfileType } from "@/lib/types";
import {
  BookOpenText,
  HelpCircle,
  HomeIcon,
  LayoutGrid,
  MessagesSquare,
  UserSquare2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GlobalSearch from "../global-search";
import PrivateNavSkeleton from "../skeletons/private-nav-skeleton";
import Cart from "./cart";
import LogoMobile from "./logo-mobile";
import RecentlyViewed from "./recently-viewed";
import SmallLogo from "./small-logo";
import UserNotifications from "./user-notifications";
import UserSidebar from "./user-sidebar";

interface Props {
  profile: UserProfileType | null;
}

const PrivateNavbar = ({ profile }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <PrivateNavSkeleton />;
  }

  return (
    <div className="bg-[#F6F6FF] fixed top-0 left-0 z-30 w-full px-4 md:px-8 py-2 sm:bg-[var(--brand-color)] flex flex-row items-center gap-x-2 md:gap-x-6">
      <div className="hidden sm:block lg:hidden">
        <UserSidebar side="left" profile={profile}>
          <Button
            className="text-[#EDF67D] w-[30px] h-[30px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 30 18"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 15H1.5C1.10218 15 0.720644 15.158 0.43934 15.4393C0.158035 15.7206 0 16.1022 0 16.5C0 16.8978 0.158035 17.2794 0.43934 17.5607C0.720644 17.842 1.10218 18 1.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5C18 16.1022 17.842 15.7206 17.5607 15.4393C17.2794 15.158 16.8978 15 16.5 15ZM1.5 3H28.5C28.8978 3 29.2794 2.84196 29.5607 2.56066C29.842 2.27936 30 1.89782 30 1.5C30 1.10218 29.842 0.720645 29.5607 0.43934C29.2794 0.158036 28.8978 0 28.5 0H1.5C1.10218 0 0.720644 0.158036 0.43934 0.43934C0.158035 0.720645 0 1.10218 0 1.5C0 1.89782 0.158035 2.27936 0.43934 2.56066C0.720644 2.84196 1.10218 3 1.5 3ZM28.5 7.5H1.5C1.10218 7.5 0.720644 7.65804 0.43934 7.93934C0.158035 8.22064 0 8.60218 0 9C0 9.39782 0.158035 9.77936 0.43934 10.0607C0.720644 10.342 1.10218 10.5 1.5 10.5H28.5C28.8978 10.5 29.2794 10.342 29.5607 10.0607C29.842 9.77936 30 9.39782 30 9C30 8.60218 29.842 8.22064 29.5607 7.93934C29.2794 7.65804 28.8978 7.5 28.5 7.5Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </UserSidebar>
      </div>

      <div className="hidden sm:block">
        <SmallLogo />
      </div>
      <div className="sm:hidden">
        <LogoMobile />
      </div>
      <div className="w-[1px] h-[15px] bg-[#EDF67D] hidden lg:block" />

      {/* dashboard */}
      <div className="hidden lg:block">
        <ActionTooltip label="Home">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <Link href="/dashboard">
              <HomeIcon />
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      {/* dashboard */}
      <div className="hidden lg:block">
        <ActionTooltip label="Dashboard">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <Link href="/s/dashboard">
              <LayoutGrid />
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      {/* profile */}
      <div className="hidden lg:block">
        <ActionTooltip label="Setup your profile">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
            asChild
          >
            <Link href="/profile/about">
              <UserSquare2 />
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      {/* drive */}
      <div className="hidden lg:block">
        <ActionTooltip label="My drive">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <Link href="/my-drive">
              <svg
                width="20"
                height="22"
                viewBox="0 0 26 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4545 15.2727C11.2028 15.2727 10.9568 15.3474 10.7475 15.4872C10.5382 15.6271 10.375 15.8258 10.2787 16.0584C10.1824 16.291 10.1572 16.5469 10.2063 16.7938C10.2554 17.0406 10.3766 17.2674 10.5546 17.4454C10.7326 17.6234 10.9594 17.7446 11.2062 17.7937C11.4531 17.8428 11.709 17.8176 11.9416 17.7213C12.1742 17.625 12.3729 17.4618 12.5128 17.2525C12.6526 17.0432 12.7273 16.7972 12.7273 16.5455C12.7273 16.2079 12.5932 15.8842 12.3545 15.6455C12.1158 15.4068 11.7921 15.2727 11.4545 15.2727ZM6.36364 15.2727C6.11191 15.2727 5.86585 15.3474 5.65655 15.4872C5.44725 15.6271 5.28412 15.8258 5.18779 16.0584C5.09146 16.291 5.06626 16.5469 5.11536 16.7938C5.16447 17.0406 5.28569 17.2674 5.46368 17.4454C5.64168 17.6234 5.86845 17.7446 6.11534 17.7937C6.36222 17.8428 6.61813 17.8176 6.85069 17.7213C7.08325 17.625 7.28202 17.4618 7.42187 17.2525C7.56172 17.0432 7.63636 16.7972 7.63636 16.5455C7.63636 16.2079 7.50227 15.8842 7.26359 15.6455C7.02491 15.4068 6.70118 15.2727 6.36364 15.2727ZM25.4545 3.81818C25.4545 2.80554 25.0523 1.83437 24.3362 1.11832C23.6202 0.402272 22.649 0 21.6364 0H3.81818C2.80554 0 1.83437 0.402272 1.11832 1.11832C0.402272 1.83437 0 2.80554 0 3.81818V8.90909C0.00561351 9.85098 0.359177 10.7576 0.992727 11.4545C0.359177 12.1515 0.00561351 13.0581 0 14V19.0909C0 20.1036 0.402272 21.0747 1.11832 21.7908C1.83437 22.5068 2.80554 22.9091 3.81818 22.9091H11.4545V25.4545H1.27273C0.935179 25.4545 0.611456 25.5886 0.372773 25.8273C0.13409 26.066 0 26.3897 0 26.7273C0 27.0648 0.13409 27.3885 0.372773 27.6272C0.611456 27.8659 0.935179 28 1.27273 28H24.1818C24.5194 28 24.8431 27.8659 25.0818 27.6272C25.3205 27.3885 25.4545 27.0648 25.4545 26.7273C25.4545 26.3897 25.3205 26.066 25.0818 25.8273C24.8431 25.5886 24.5194 25.4545 24.1818 25.4545H14V22.9091H21.6364C22.649 22.9091 23.6202 22.5068 24.3362 21.7908C25.0523 21.0747 25.4545 20.1036 25.4545 19.0909V14C25.4489 13.0581 25.0954 12.1515 24.4618 11.4545C25.0954 10.7576 25.4489 9.85098 25.4545 8.90909V3.81818ZM22.9091 19.0909C22.9091 19.4285 22.775 19.7522 22.5363 19.9909C22.2976 20.2295 21.9739 20.3636 21.6364 20.3636H3.81818C3.48063 20.3636 3.15691 20.2295 2.91823 19.9909C2.67955 19.7522 2.54545 19.4285 2.54545 19.0909V14C2.54545 13.6625 2.67955 13.3387 2.91823 13.1C3.15691 12.8614 3.48063 12.7273 3.81818 12.7273H21.6364C21.9739 12.7273 22.2976 12.8614 22.5363 13.1C22.775 13.3387 22.9091 13.6625 22.9091 14V19.0909ZM22.9091 8.90909C22.9091 9.24664 22.775 9.57036 22.5363 9.80904C22.2976 10.0477 21.9739 10.1818 21.6364 10.1818H3.81818C3.48063 10.1818 3.15691 10.0477 2.91823 9.80904C2.67955 9.57036 2.54545 9.24664 2.54545 8.90909V3.81818C2.54545 3.48063 2.67955 3.15691 2.91823 2.91823C3.15691 2.67954 3.48063 2.54545 3.81818 2.54545H21.6364C21.9739 2.54545 22.2976 2.67954 22.5363 2.91823C22.775 3.15691 22.9091 3.48063 22.9091 3.81818V8.90909ZM11.4545 5.09091C11.2028 5.09091 10.9568 5.16555 10.7475 5.3054C10.5382 5.44525 10.375 5.64402 10.2787 5.87659C10.1824 6.10915 10.1572 6.36505 10.2063 6.61193C10.2554 6.85882 10.3766 7.0856 10.5546 7.26359C10.7326 7.44158 10.9594 7.5628 11.2062 7.61191C11.4531 7.66102 11.709 7.63581 11.9416 7.53948C12.1742 7.44315 12.3729 7.28002 12.5128 7.07073C12.6526 6.86143 12.7273 6.61536 12.7273 6.36364C12.7273 6.02609 12.5932 5.70236 12.3545 5.46368C12.1158 5.225 11.7921 5.09091 11.4545 5.09091ZM6.36364 5.09091C6.11191 5.09091 5.86585 5.16555 5.65655 5.3054C5.44725 5.44525 5.28412 5.64402 5.18779 5.87659C5.09146 6.10915 5.06626 6.36505 5.11536 6.61193C5.16447 6.85882 5.28569 7.0856 5.46368 7.26359C5.64168 7.44158 5.86845 7.5628 6.11534 7.61191C6.36222 7.66102 6.61813 7.63581 6.85069 7.53948C7.08325 7.44315 7.28202 7.28002 7.42187 7.07073C7.56172 6.86143 7.63636 6.61536 7.63636 6.36364C7.63636 6.02609 7.50227 5.70236 7.26359 5.46368C7.02491 5.225 6.70118 5.09091 6.36364 5.09091Z"
                  fill="#EDF67D"
                />
              </svg>
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      {/* books */}
      <div className="hidden lg:block">
        <ActionTooltip label="Books">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <Link href="/text-books">
              <BookOpenText />
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      {/* how it works */}
      <div className="hidden lg:block">
        <ActionTooltip label="How it works">
          <Button
            className="text-[#EDF67D] w-[35px] h-[35px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50"
            size="icon"
            variant="ghost"
          >
            <Link href="/how-it-works">
              <HelpCircle />
            </Link>
          </Button>
        </ActionTooltip>
      </div>

      <div className="flex items-center ml-auto gap-x-4">
        <div className="w-auto md:w-[200px]">
          <GlobalSearch />
        </div>

        <div className="hidden sm:block">
          <RecentlyViewed />
        </div>
        <ActionTooltip label="Messages">
          <Button
            className="text-[var(--brand-color)] sm:text-[#EDF67D] w-[30px] h-[30px] hover:text-[#EDF67D] hover:bg-blue-600/95 hover:bg-opacity-50 relative"
            size="icon"
            variant="ghost"
          >
            <Link href="/chat">
              <MessagesSquare className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--brand-color-alert)] rounded-full"></span>
            </Link>
          </Button>
        </ActionTooltip>
        <div className="hidden sm:block">
          <UserNotifications />
        </div>
        <div className="hidden sm:block">
          <Cart />
        </div>
        <UserAvatar
          className="lg:hidden h-10 w-10 sm:w-8 sm:h-8"
          fallbackName={profile?.name}
          src={profile?.image}
        />
        <div className="hidden lg:block">
          <UserSidebar profile={profile}>
            <Button
              size="icon"
              className="rounded-full bg-transparent"
              variant="ghost"
            >
              <UserAvatar
                fallbackName={profile?.name}
                src={profile?.image}
                className="h-10 w-10"
              />
            </Button>
          </UserSidebar>
        </div>
      </div>
    </div>
  );
};

export default PrivateNavbar;
