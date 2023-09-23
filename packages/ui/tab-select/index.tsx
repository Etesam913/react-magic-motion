"use client";
import { type Transition, m, LazyMotion, domMax } from "framer-motion";
import { createElement } from "react";
import type { FunctionComponent } from "react";

interface TabSelectProps {
  children: JSX.Element;
  id: string;
  transition?: Transition;
}
export function TabSelect({
  children,
  id,
  transition,
}: TabSelectProps): JSX.Element {
  let motionChildren = children;

  if (typeof motionChildren.type === "function") {
    motionChildren = (motionChildren.type as Function)(motionChildren.props);
  }
  const childType = motionChildren.type as keyof typeof m;

  const motionElement = createElement(
    m[childType] as string | FunctionComponent<any>,
    { ...motionChildren.props, layoutId: id, transition },
    motionChildren.props.children,
  );

  return <LazyMotion features={domMax}>{motionElement}</LazyMotion>;
}
