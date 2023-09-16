"use client";
import { AnimatePresence, Transition, motion } from "framer-motion";
import type { ReactNode, FunctionComponent } from "react";
import {
  createElement,
  isValidElement,
  Children,
  useRef,
  useState,
} from "react";
import "./index.css";
import { usePlaceholderBoxSize } from "../hooks";

interface ExpandableCardProps {
  isCardExpanded: boolean;
  children: JSX.Element;
  transition?: Transition;
  isBackgroundFadeEnabled?: boolean;
  onBackgroundFadeClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

function getLayoutValueFromChildren(children: ReactNode): "position" | true {
  if (typeof children === "string") return "position";
  return true;
}

export function ExpandableCard({
  children,
  isCardExpanded,
  transition,
  isBackgroundFadeEnabled = true,
  onBackgroundFadeClick,
}: ExpandableCardProps): JSX.Element {
  const rootNode = useRef<HTMLElement>(null);

  function convertChildrenToMotionChildren(
    children: ReactNode,
    depth: number
  ): ReactNode {
    return Children.map(children, (child, i): ReactNode => {
      // Checks if the child is a string or boolean or number
      if (!isValidElement(child)) return child;

      let isRoot = false;
      // If first child at the first level, then the node is the root
      if (depth === 1 && i === 0) {
        isRoot = true;
      }

      // Checks if the child is a function component
      if (typeof child.type === "function") {
        child = (child.type as Function)(child.props);
        if (!isValidElement(child)) return child;
      }

      const childType = child.type as keyof typeof motion;

      const { className, ...restOfProps } = child.props;

      // Creates a motion version of the element child type
      const newElem = createElement(
        motion[childType] as string | FunctionComponent<any>,
        {
          ...restOfProps,
          ref: isRoot ? rootNode : undefined,
          className: `${className ?? ""} ${
            isRoot && isCardExpanded
              ? "cool-layout-animations-card-expanded"
              : "cool-layout-animations-card-condensed"
          }`,
          layout: getLayoutValueFromChildren(child.props.children),
          transition: isRoot ? transition : undefined,
        },
        convertChildrenToMotionChildren(
          child.props.children as ReactNode,
          depth + 1
        )
      );

      return newElem;
    });
  }

  const motionChildren = convertChildrenToMotionChildren(children, 1);

  const [placeholderBoxDimensions, setPlaceholderBoxDimensions] = useState({
    height: 0,
    width: 0,
  });

  const { placeholderBoxHeight, placeholderBoxWidth } = usePlaceholderBoxSize(
    isCardExpanded,
    rootNode
  );

  return (
    <>
      {motionChildren}
      {isCardExpanded && (
        <div
          className={"cool-layout-animations-placeholder-box"}
          style={{
            width: placeholderBoxWidth,
            height: placeholderBoxHeight,
          }}
        />
      )}
      {isBackgroundFadeEnabled && (
        <AnimatePresence>
          {isCardExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onBackgroundFadeClick}
              className="cool-layout-animations-background-fade"
            />
          )}
        </AnimatePresence>
      )}
    </>
  );
}
