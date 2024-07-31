import ActionTooltip from "@/components/action-tooltip";
import UserAvatar from "@/components/user-avatar";
import Link from "next/link";

const BookServer = () => {
  return (
    <Link
      href="/chat/chapters/book-channels"
      className="flex items-center gap-x-2 text-slate-700 hover:bg-[var(--brand-color)] hover:text-white py-[2px] px-[8px] rounded-md transition font-medium text-base"
    >
      <UserAvatar className="rounded-sm h-8 w-8" />
      <ActionTooltip
        label="Properties-or-variant-label-to-animate to while the component is
            pressed."
        side="right"
        sideOffset={20}
      >
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-inherit lowercase">
            Properties-or-variant-label-to-animate to while the component is
            pressed.
          </span>
          <span className="text-xs font-medium text-slate-400">2 chapters</span>
        </div>
      </ActionTooltip>
    </Link>
  );
};

export default BookServer;
