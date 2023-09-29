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

export function LayoutContainer({
  children,
  transition,
  layoutDependency,
  disabled,
}: LayoutContainerProps): JSX.Element {
  if (disabled) return children;

  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      layoutDependency,
      transition,
    };
  });

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
