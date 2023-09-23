"use client";

import { LazyMotion, domMax } from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";

interface LayoutContainerProps {
  children: JSX.Element;
  layoutDependency?: unknown;
}

export function LayoutContainer({
  children,
  layoutDependency,
}: LayoutContainerProps): JSX.Element {
  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      layoutDependency,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
      },
    };
  });

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
