"use client";

import { AnimatePresence, AnimatePresenceProps } from "framer-motion";

interface MagicExitProps extends AnimatePresenceProps {
  children: JSX.Element;
}

export function MagicExit(props: MagicExitProps) {
  const { children, ...rest } = props;
  return <AnimatePresence {...rest}>{children}</AnimatePresence>;
}
