"use client";

import { LazyMotion, domMax } from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";

interface LayoutContainerProps {
  children: JSX.Element;
  layoutDependency?: any;
}

export function LayoutContainer({
  children,
  layoutDependency,
}: LayoutContainerProps) {
  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
        layoutDependency,
      },
    };
  });

  //console.log(motionChildren);

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
