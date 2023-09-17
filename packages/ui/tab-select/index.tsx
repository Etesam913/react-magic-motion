import { Transition, motion } from "framer-motion";
import { createElement } from "react";
import type { FunctionComponent } from "react";
import "./index.css";

interface TabSelectProps {
  children: JSX.Element;
  id: string;
  transition?: Transition;
}
export default function TabSelect({
  children,
  id,
  transition,
}: TabSelectProps) {
  let motionChildren = children;

  if (typeof motionChildren.type === "function") {
    motionChildren = (motionChildren.type as Function)(motionChildren.props);
  }
  const childType = motionChildren.type as keyof typeof motion;

  const motionElement = createElement(
    motion[childType] as string | FunctionComponent<any>,
    { ...motionChildren.props, layoutId: id, transition },
    motionChildren.props.children,
  );

  return <>{motionElement}</>;
}
