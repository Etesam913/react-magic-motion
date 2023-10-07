"use client";

import {
  type Transition,
  m,
  LazyMotion,
  domMax,
  LayoutGroup,
} from "framer-motion";
import { type FunctionComponent, createElement, useMemo } from "react";

interface TabSelectProps {
  children: JSX.Element;
  id: string;
  transition?: Transition;
}
export function MagicTabSelect({
  children,
  id,
  transition,
}: TabSelectProps): JSX.Element {
  let motionChildren: JSX.Element | null = children;

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

  return <LazyMotion features={domMax}>{motionElement}</LazyMotion>;
}
