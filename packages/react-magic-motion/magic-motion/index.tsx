"use client";

import {
  LazyMotion,
  type Transition,
  domMax,
  LayoutGroup,
  TargetAndTransition,
} from "framer-motion";
import { convertChildrenToMotionChildren } from "../utils";
import { usePrefersReducedMotion } from "../hooks";

interface MagicMotionProps {
  children: JSX.Element;
  transition?: Transition;
  layoutDependency?: unknown;
  disabled?: boolean;
}

export function MagicMotion({
  children,
  transition,
  layoutDependency,
  disabled,
}: MagicMotionProps): JSX.Element {
  const isMotionReduced = usePrefersReducedMotion();

  const motionChildren = convertChildrenToMotionChildren(children, {
    layoutDependency,
    transition,
  });

  return isMotionReduced || disabled ? (
    <>{children}</>
  ) : (
    <LayoutGroup>
      <LazyMotion features={domMax}>{motionChildren}</LazyMotion>
    </LayoutGroup>
  );
}
