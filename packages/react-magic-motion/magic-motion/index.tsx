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
  debug,
}: MagicMotionProps): JSX.Element {
  if (disabled) return children;

  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      layoutDependency,
      transition,
    };
  });

  return (
    <LayoutGroup>
      <LazyMotion features={domMax}>{motionChildren}</LazyMotion>
    </LayoutGroup>
  );
}
