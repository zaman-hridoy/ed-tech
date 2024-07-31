import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { IoIosHelpCircle } from "react-icons/io";
import { MobileToggle } from "../../_components/mobile-toggle";
import NavLink from "./nav-links";

const PageNavLinks = () => {
  return (
    <div className="fixed top-0 left-0 w-full md:pl-[290px]">
      <div className="bg-white px-4 py-3 flex items-center gap-x-4 rounded-md">
        <MobileToggle />
        <NavLink />

        <ActionTooltip label="How to chat and collaborate in realtime?">
          <Button variant="ghost" size="icon" className="ml-auto">
            <IoIosHelpCircle className="w-6 h-6 text-slate-600" />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default PageNavLinks;
