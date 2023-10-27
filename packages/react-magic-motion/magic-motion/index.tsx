"use client";

import {
  LazyMotion,
  type Transition,
  domMax,
  LayoutGroup,
} from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";
import { usePrefersReducedMotion } from "../hooks";

interface MagicMotionProps {
  children: JSX.Element;
  transition?: Transition;
  layoutDependency?: unknown;
  disabled?: boolean;
  debug?: boolean;
}

export function MagicMotion({
  children,
  transition,
  layoutDependency,
  disabled,
  debug,
}: MagicMotionProps): JSX.Element {
  const isMotionReduced = usePrefersReducedMotion();

  const motionChildren = convertChildrenToMotionChildren(
    children,
    debug,
    (child) => {
      return {
        layout: getLayoutValueFromChildren(child),
        layoutDependency,
        transition,
      };
    }
  );

  return isMotionReduced || disabled ? (
    <>{children}</>
  ) : (
    <LayoutGroup>
      <LazyMotion features={domMax}>{motionChildren}</LazyMotion>
    </LayoutGroup>
  );
}
