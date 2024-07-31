"use client";

import { useAlanCommand } from "@/hooks/use-alan-command";
import { useRouter } from "next/navigation";

export const alan_key =
  "6b3372ded3eee8b7191b64067b98322c2e956eca572e1d8b807a3e2338fdd0dc/stage";

const AlanWidget = () => {
  const router = useRouter();
  const alan = useAlanCommand();
  // useEffect(() => {
  //   alanBtn({
  //     key: alan_key,
  //     onCommand: (commandData: any) => {
  //       console.log({ commandData });
  //       if (commandData.command === "navigation") {
  //         if (commandData.route === "dashboard") {
  //           router.push("/dashboard");
  //         } else if (commandData.route === "drive") {
  //           router.push("/my-drive");
  //         }
  //       } else if (commandData.command === "highlight") {
  //         alan.handleSetCommandData(commandData);
  //       }
  //     },
  //   });
  // }, [router, alan]);
  return null;
};

export default AlanWidget;
