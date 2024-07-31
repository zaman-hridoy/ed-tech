"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserAvatar from "@/components/user-avatar";
import { formatBytes } from "@/lib/helper-methods";
import axios from "@/lib/instance";
import { UserProfileType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  BookOpenText,
  HelpCircle,
  LayoutGrid,
  Loader2,
  LogOut,
  PlusSquare,
  Settings,
  UserSquareIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DriveProgress } from "./drive-progress";

interface Props {
  children: React.ReactNode;
  side?: "left" | "top" | "bottom" | "right" | null | undefined;
  profile: UserProfileType | null;
}

const UserSidebar = ({ children, side, profile }: Props) => {
  const router = useRouter();
  const { data, status } = useSession();
  const subscription = useQuery({
    queryKey: ["getUserSubscription"],
    queryFn: () =>
      axios
        .get("/profile/getUserSubscription", {
          headers: {
            Authorization: data?.user?.accessToken,
          },
        })
        .then((res) => {
          if (res.data.success) {
            return res.data?.request;
          } else {
            return null;
          }
        }),
    enabled: status === "authenticated",
  });

  const driveState = useQuery({
    queryKey: [`drive-info_${data?.user?.userId}`],
    queryFn: () =>
      axios
        .get(`/auth/users/drive-info/${data?.user?.userId}`)
        .then((res) => res.data?.userDrive),
    enabled: status === "authenticated",
  });

  const [manageLoader, setManageLoader] = useState(false);
  const onManageSubscription = (stripCustomerId: string) => {
    setManageLoader(true);
    axios
      .post("/profile/create-portal-session", {
        stripCustomerId,
      })
      .then((res) => {
        if (res.data.success) {
          router.replace(res.data?.session);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setManageLoader(false);
      });
  };

  const getSubscribeBtnText = (planDetails: any) => {
    if (planDetails) {
      if (planDetails?.plan_name === "Basic") {
        return "Upgrade";
      } else if (planDetails?.plan_name === "Silver") {
        return "Upgrade";
      } else if (planDetails?.plan_name === "Premium") {
        return "Downgrade";
      } else {
        return "Upgrade";
      }
    } else {
      return "View Plans";
    }
  };

  const getUserDriveInPercentage = (
    usedDriveSpace: number,
    totalSpace: number
  ) => {
    if (usedDriveSpace === 0) {
      return 0;
    }
    return Math.floor((usedDriveSpace / totalSpace) * 100);
  };

  const getProgressColor = (val: number) => {
    if (val <= 25) {
      return "#1AD391";
    } else if (val > 25 && val <= 75) {
      return "#DBA824";
    } else if (val > 75) {
      return "#DB2424";
    }
  };

  const [addSpaceLoading, setAddSpaceLoading] = useState(false);
  const onAddExtraDriveSpace = async () => {
    setAddSpaceLoading(true);
    try {
      const plans = await axios
        .get("/profile/getPlans")
        .then((res) => res.data?.products || []);

      const drive_plan = plans.find((p: any) => p.name === "Drive Space");

      if (drive_plan) {
        const driveRes = await axios.post(
          "/profile/create-checkout-session-for-drive",
          {
            stripCustomerId: subscription?.data?.stripCustomerId,
            userId: data?.user?.userId,
            top_up_pricing_id: drive_plan?.plans[0]?.id,
            top_up_quantity: 5,
            top_up_name: "Drive Space",
          }
        );
        router.replace(driveRes.data.session);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddSpaceLoading(false);
    }
  };

  console.log(subscription.data, driveState.data);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[300px] bg-white select-none" side={side}>
        <SheetHeader>
          <div className="flex items-center gap-x-3">
            <UserAvatar
              fallbackName={profile?.name}
              src={profile?.image}
              className="w-12 h-12"
            />
            <div className="text-left">
              <SheetTitle className="text-base line-clamp-1">
                {profile?.name}
              </SheetTitle>
              <SheetDescription className="text-xs font-semibold text-slate-400">
                {profile?.role}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {/* plans */}
        <div className="flex items-center justify-between gap-x-3 tracking-tight ">
          <div className="shrink-0 flex flex-col">
            <p className="text-[10px] font-bold text-slate-500">
              YOUR SUBSCRIPTION
            </p>
            <h2 className="text-base font-semibold text-slate-900">
              {subscription.data?.plan_name || "Free Plan"}
            </h2>
            {subscription.data?.current_period_end &&
              !subscription?.data?.downgrade_date && (
                <p className="text-[10px] text-slate-500 font-semibold">
                  Renew on{" "}
                  {format(
                    new Date(subscription.data?.current_period_end),
                    "MMMM dd, yyyy"
                  )}
                </p>
              )}
          </div>
          {subscription?.data?.downgrade_date ? (
            <Button
              variant="primary"
              size="sm"
              className="text-xs py-0 h-7 shadow-lg border-none"
              onClick={() =>
                onManageSubscription(subscription?.data?.stripCustomerId)
              }
              disabled={manageLoader}
            >
              {manageLoader ? <Loader2 className="w-4 h-4" /> : <>Manage</>}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="text-xs py-0 h-7 shadow-lg border-none"
              asChild
            >
              <Link href="/plans">
                {getSubscribeBtnText(subscription.data)}
              </Link>
            </Button>
          )}
        </div>

        {subscription?.data?.downgrade_date && (
          <div className="text-[12px] text-[var(--brand-color-alert)] font-semibold whitespace-normal mt-4">
            You have downgraded to <span>Basic</span> and will be started from{" "}
            {format(
              new Date(subscription?.data?.downgrade_date),
              "LLLL dd, yyyy"
            )}
          </div>
        )}

        <Separator className="my-4" />

        {/* drive space */}
        {driveState?.data && (
          <div className="flex flex-col gap-y-1">
            <p className="text-[10px] font-bold text-slate-500">DRIVE SPACE</p>
            <DriveProgress
              value={getUserDriveInPercentage(
                +driveState.data?.used_space,
                +driveState.data?.total_space
              )}
              className="w-[100%] h-2"
            />
            <div className="flex items-center gap-x-[52px]">
              <p className="text-[10px] font-bold text-slate-900">Used</p>
              <span className="text-[10px] text-slate-500 font-semibold">
                {formatBytes(+driveState.data?.used_space)}
              </span>
            </div>
            <div className="flex items-center gap-x-6">
              <p className="text-[10px] font-bold text-slate-900">Remaining</p>
              <span className="text-[10px] text-slate-500 font-semibold">
                {formatBytes(+driveState.data?.empty_space)}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="text-xs py-0 h-7 shadow-lg border-none mt-4"
              onClick={onAddExtraDriveSpace}
              disabled={addSpaceLoading}
            >
              {addSpaceLoading ? (
                <Loader2 className="w-4 h-4" />
              ) : (
                <>
                  <PlusSquare className="w-4 h-4 mr-2" /> Add More 5GB
                </>
              )}
            </Button>
          </div>
        )}

        {driveState?.data && <Separator className="my-4" />}

        {/* actions menu */}
        <div className="flex flex-col gap-y-3">
          {menuOptions.map((option) => (
            <Link
              key={option.title}
              href={option.url}
              className={cn(
                "flex items-center gap-x-2 text-sm font-semibold tracking-tight text-slate-700 hover:text-slate-900 transition-all",
                option.showInMobileClasses && option.showInMobileClasses
              )}
            >
              {option.icon}
              {option.title}
            </Link>
          ))}
          <Link
            onClick={() => signOut({ callbackUrl: "/" })}
            href="#"
            className="flex items-center gap-x-2 text-sm font-semibold tracking-tight text-slate-700 hover:text-slate-900 transition-all"
          >
            <LogOut className="w-5 h-5 text-[var(--brand-color)]" />
            Logout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSidebar;

const menuOptions = [
  {
    title: "Dashboard",
    icon: <LayoutGrid className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/dashboard",
    showInMobileClasses: "lg:hidden",
  },
  {
    title: "Profile Information",
    icon: <UserSquareIcon className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/profile",
  },
  {
    title: "My Drive",
    icon: (
      <svg
        width="20"
        height="21"
        viewBox="0 0 26 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4545 15.2727C11.2028 15.2727 10.9568 15.3474 10.7475 15.4872C10.5382 15.6271 10.375 15.8258 10.2787 16.0584C10.1824 16.291 10.1572 16.5469 10.2063 16.7938C10.2554 17.0406 10.3766 17.2674 10.5546 17.4454C10.7326 17.6234 10.9594 17.7446 11.2062 17.7937C11.4531 17.8428 11.709 17.8176 11.9416 17.7213C12.1742 17.625 12.3729 17.4618 12.5128 17.2525C12.6526 17.0432 12.7273 16.7972 12.7273 16.5455C12.7273 16.2079 12.5932 15.8842 12.3545 15.6455C12.1158 15.4068 11.7921 15.2727 11.4545 15.2727ZM6.36364 15.2727C6.11191 15.2727 5.86585 15.3474 5.65655 15.4872C5.44725 15.6271 5.28412 15.8258 5.18779 16.0584C5.09146 16.291 5.06626 16.5469 5.11536 16.7938C5.16447 17.0406 5.28569 17.2674 5.46368 17.4454C5.64168 17.6234 5.86845 17.7446 6.11534 17.7937C6.36222 17.8428 6.61813 17.8176 6.85069 17.7213C7.08325 17.625 7.28202 17.4618 7.42187 17.2525C7.56172 17.0432 7.63636 16.7972 7.63636 16.5455C7.63636 16.2079 7.50227 15.8842 7.26359 15.6455C7.02491 15.4068 6.70118 15.2727 6.36364 15.2727ZM25.4545 3.81818C25.4545 2.80554 25.0523 1.83437 24.3362 1.11832C23.6202 0.402272 22.649 0 21.6364 0H3.81818C2.80554 0 1.83437 0.402272 1.11832 1.11832C0.402272 1.83437 0 2.80554 0 3.81818V8.90909C0.00561351 9.85098 0.359177 10.7576 0.992727 11.4545C0.359177 12.1515 0.00561351 13.0581 0 14V19.0909C0 20.1036 0.402272 21.0747 1.11832 21.7908C1.83437 22.5068 2.80554 22.9091 3.81818 22.9091H11.4545V25.4545H1.27273C0.935179 25.4545 0.611456 25.5886 0.372773 25.8273C0.13409 26.066 0 26.3897 0 26.7273C0 27.0648 0.13409 27.3885 0.372773 27.6272C0.611456 27.8659 0.935179 28 1.27273 28H24.1818C24.5194 28 24.8431 27.8659 25.0818 27.6272C25.3205 27.3885 25.4545 27.0648 25.4545 26.7273C25.4545 26.3897 25.3205 26.066 25.0818 25.8273C24.8431 25.5886 24.5194 25.4545 24.1818 25.4545H14V22.9091H21.6364C22.649 22.9091 23.6202 22.5068 24.3362 21.7908C25.0523 21.0747 25.4545 20.1036 25.4545 19.0909V14C25.4489 13.0581 25.0954 12.1515 24.4618 11.4545C25.0954 10.7576 25.4489 9.85098 25.4545 8.90909V3.81818ZM22.9091 19.0909C22.9091 19.4285 22.775 19.7522 22.5363 19.9909C22.2976 20.2295 21.9739 20.3636 21.6364 20.3636H3.81818C3.48063 20.3636 3.15691 20.2295 2.91823 19.9909C2.67955 19.7522 2.54545 19.4285 2.54545 19.0909V14C2.54545 13.6625 2.67955 13.3387 2.91823 13.1C3.15691 12.8614 3.48063 12.7273 3.81818 12.7273H21.6364C21.9739 12.7273 22.2976 12.8614 22.5363 13.1C22.775 13.3387 22.9091 13.6625 22.9091 14V19.0909ZM22.9091 8.90909C22.9091 9.24664 22.775 9.57036 22.5363 9.80904C22.2976 10.0477 21.9739 10.1818 21.6364 10.1818H3.81818C3.48063 10.1818 3.15691 10.0477 2.91823 9.80904C2.67955 9.57036 2.54545 9.24664 2.54545 8.90909V3.81818C2.54545 3.48063 2.67955 3.15691 2.91823 2.91823C3.15691 2.67954 3.48063 2.54545 3.81818 2.54545H21.6364C21.9739 2.54545 22.2976 2.67954 22.5363 2.91823C22.775 3.15691 22.9091 3.48063 22.9091 3.81818V8.90909ZM11.4545 5.09091C11.2028 5.09091 10.9568 5.16555 10.7475 5.3054C10.5382 5.44525 10.375 5.64402 10.2787 5.87659C10.1824 6.10915 10.1572 6.36505 10.2063 6.61193C10.2554 6.85882 10.3766 7.0856 10.5546 7.26359C10.7326 7.44158 10.9594 7.5628 11.2062 7.61191C11.4531 7.66102 11.709 7.63581 11.9416 7.53948C12.1742 7.44315 12.3729 7.28002 12.5128 7.07073C12.6526 6.86143 12.7273 6.61536 12.7273 6.36364C12.7273 6.02609 12.5932 5.70236 12.3545 5.46368C12.1158 5.225 11.7921 5.09091 11.4545 5.09091ZM6.36364 5.09091C6.11191 5.09091 5.86585 5.16555 5.65655 5.3054C5.44725 5.44525 5.28412 5.64402 5.18779 5.87659C5.09146 6.10915 5.06626 6.36505 5.11536 6.61193C5.16447 6.85882 5.28569 7.0856 5.46368 7.26359C5.64168 7.44158 5.86845 7.5628 6.11534 7.61191C6.36222 7.66102 6.61813 7.63581 6.85069 7.53948C7.08325 7.44315 7.28202 7.28002 7.42187 7.07073C7.56172 6.86143 7.63636 6.61536 7.63636 6.36364C7.63636 6.02609 7.50227 5.70236 7.26359 5.46368C7.02491 5.225 6.70118 5.09091 6.36364 5.09091Z"
          fill="var(--brand-color)"
        />
      </svg>
    ),
    url: "/drive",
    showInMobileClasses: "lg:hidden",
  },
  {
    title: "Books",
    icon: <BookOpenText className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/books",
    showInMobileClasses: "lg:hidden",
  },
  {
    title: "Change Password",
    icon: <Settings className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/profile/change-password",
  },
  {
    title: "How it works?",
    icon: <HelpCircle className="w-5 h-5 text-[var(--brand-color)]" />,
    url: "/how-it-works",
    showInMobileClasses: "lg:hidden",
  },
];
