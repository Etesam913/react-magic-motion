"use client";

import { type Transition, m, LazyMotion, domMax } from "framer-motion";
import { type FunctionComponent, createElement } from "react";
import { usePrefersReducedMotion } from "../hooks";

interface TabSelectProps {
  children: JSX.Element;
  id: string;
  transition?: Transition;
  disabled?: boolean;
}
export function MagicTabSelect({
  children,
  id,
  transition,
  disabled = false,
}: TabSelectProps): JSX.Element {
  let motionChildren: JSX.Element | null = children;
  const isMotionReduced = usePrefersReducedMotion();

  if (typeof motionChildren.type === "function") {
    motionChildren = (motionChildren.type as FunctionComponent)(
      motionChildren.props,
    );
    if (motionChildren === null) motionChildren = <></>;
  }
  const childType = motionChildren.type as keyof typeof m;

  const motionElement = createElement(
    m[childType] as string | FunctionComponent<any>,
    { ...motionChildren.props, layoutId: id, transition },
    motionChildren.props.children,
  );
  console.log(isMotionReduced, disabled);

  return isMotionReduced || disabled ? (
    <>{children}</>
  ) : (
    <LazyMotion features={domMax}>{motionElement}</LazyMotion>
  );
}
