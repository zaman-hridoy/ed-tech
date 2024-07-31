"use client";

import { useAppSettings } from "@/hooks/use-app-settings";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const InfopanelWrapper = ({ children }: Props) => {
  const appSettings = useAppSettings();
  return (
    <AnimatePresence>
      {appSettings.showChatMembersPanel && (
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            type: "tween",
            duration: 1000,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfopanelWrapper;
