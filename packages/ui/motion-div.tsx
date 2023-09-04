"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MotionDiv({ children }: { children: ReactNode }): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
