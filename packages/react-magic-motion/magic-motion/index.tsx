"use client";

import {
  LazyMotion,
  type Transition,
  domMax,
  LayoutGroup,
} from "framer-motion";
import { convertChildrenToMotionChildren } from "../utils/magic-animation";
import { useComponentInactiveLogging, usePrefersReducedMotion } from "../hooks";

interface MagicMotionProps {
  children: JSX.Element;
  transition?: Transition;
  layoutDependency?: unknown;
  disabled?: boolean;
  isLoggingEnabled?: boolean;
}

export function MagicMotion({
  children,
  transition,
  layoutDependency,
  disabled,
  isLoggingEnabled,
}: MagicMotionProps): JSX.Element {
  const isMotionReduced = usePrefersReducedMotion();

  const motionChildren = convertChildrenToMotionChildren(
    children,
    {
      layoutDependency,
      transition,
    },
    { isRootNode: true, isLoggingEnabled, depth: 1 }
  );

  useComponentInactiveLogging(
    "MagicMotion",
    disabled,
    isMotionReduced,
    isLoggingEnabled
  );

  return isMotionReduced || disabled ? (
    children
  ) : (
    <LayoutGroup key="MagicMotion">
      <LazyMotion features={domMax}>{motionChildren}</LazyMotion>
    </LayoutGroup>
  );
}
