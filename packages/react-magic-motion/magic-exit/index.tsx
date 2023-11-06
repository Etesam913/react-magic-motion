"use client";

import { AnimatePresence, type TargetAndTransition } from "framer-motion";
import { type ReactNode, cloneElement } from "react";
import { convertChildrenToMotionChildren } from "../utils/magic-animation";
import { useComponentInactiveLogging, usePrefersReducedMotion } from "../hooks";

interface MagicExitProps {
  children: ReactNode;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  mode?: "sync" | "wait" | "popLayout";
  disabled?: boolean;
  isLoggingEnabled?: boolean;
}

export function MagicExit({
  children,
  initial,
  animate,
  exit,
  mode = "sync",
  disabled,
  isLoggingEnabled,
}: MagicExitProps): JSX.Element {
  const isMotionReduced = usePrefersReducedMotion();

  const motionChildren = convertChildrenToMotionChildren(
    children,
    {},
    {
      isRootNode: true,
      rootNodeCallback: (rootElem) => {
        const clonedRootElem = cloneElement(rootElem, {
          ...rootElem.props,
          initial,
          animate,
          exit,
        });
        return clonedRootElem;
      },
      isLoggingEnabled,
      depth: 1,
    }
  );

  useComponentInactiveLogging(
    "MagicExit",
    disabled,
    isMotionReduced,
    isLoggingEnabled
  );

  return disabled || isMotionReduced ? (
    <>{children}</>
  ) : (
    <AnimatePresence key="MagicExit" mode={mode}>
      {motionChildren}
    </AnimatePresence>
  );
}
