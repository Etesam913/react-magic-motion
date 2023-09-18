"use client";

import { LazyMotion, domMax } from "framer-motion";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";

interface LayoutContainerProps {
  children: JSX.Element;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  const motionChildren = convertChildrenToMotionChildren(children, (child) => {
    return {
      layout: getLayoutValueFromChildren(child),
      transition: { type: "spring", damping: 10, stiffness: 80 },
    };
  });

  console.log(motionChildren);

  return <LazyMotion features={domMax}>{motionChildren}</LazyMotion>;
}
