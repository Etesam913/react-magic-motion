"use client";

import { LazyMotion, type Transition, domMax } from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";

interface LayoutContainerProps {
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
}: LayoutContainerProps): JSX.Element {
  if (disabled) return children;
  console.log("---");
  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      layoutDependency,
      transition,
    };
  });
  console.log("---");

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
