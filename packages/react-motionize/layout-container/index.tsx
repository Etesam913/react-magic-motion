"use client";

import { LazyMotion, Transition, domMax } from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";

interface LayoutContainerProps {
  children: JSX.Element;
  transition?: Transition;
  layoutDependency?: unknown;
}

export function LayoutContainer({
  children,
  transition,
  layoutDependency,
}: LayoutContainerProps): JSX.Element {
  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      layoutDependency,
      transition: transition,
    };
  });

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
