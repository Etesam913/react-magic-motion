"use client";

import {
  LazyMotion,
  type Transition,
  domMax,
  LayoutGroup,
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

  const motionChildren = convertChildrenToMotionChildren(
    children,
    {
      layoutDependency,
      transition,
    },
    true
  );

  return isMotionReduced || disabled ? (
    children
  ) : (
    <LayoutGroup key="MagicMotion">
      <LazyMotion features={domMax}>{motionChildren}</LazyMotion>
    </LayoutGroup>
  );
}
