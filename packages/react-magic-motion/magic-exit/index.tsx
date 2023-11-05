"use client";

import {
  AnimatePresence,
  isMotionComponent,
  m,
  type TargetAndTransition,
} from "framer-motion";
import {
  Children,
  isValidElement,
  type Ref,
  type ReactNode,
  type FunctionComponent,
  createElement,
  cloneElement,
} from "react";
import { isPortal } from "react-is";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";
import { usePrefersReducedMotion } from "../hooks";

export function MagicExit({
  children,
  initial,
  animate,
  exit,
  mode = "sync",
  disabled,
}: {
  children: ReactNode;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  mode?: "sync" | "wait" | "popLayout";
  disabled?: boolean;
}): JSX.Element {
  const isMotionReduced = usePrefersReducedMotion();

  const motionChildren = convertChildrenToMotionChildren(
    children,
    {},
    true,
    (rootElem) => {
      const clonedRootElem = cloneElement(rootElem, {
        ...rootElem.props,
        initial,
        animate,
        exit,
      });
      return clonedRootElem;
    }
  );

  return disabled || isMotionReduced ? (
    <>{children}</>
  ) : (
    <AnimatePresence key="MagicExit" mode={mode}>
      {motionChildren}
    </AnimatePresence>
  );
}
