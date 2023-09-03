"use client";

import { motion } from "framer-motion";

export function AnimatedCard(): JSX.Element {
  return (
    <motion.button
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      type="button"
    >
      My name jeff
    </motion.button>
  );
}
