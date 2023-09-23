"use client";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  type Transition,
} from "framer-motion";
import {
  Children,
  createElement,
  isValidElement,
  useRef,
  type FunctionComponent,
  type ReactNode,
} from "react";
import { usePlaceholderBoxSize } from "../hooks";
import { getLayoutValueFromChildren } from "../utils";
import "./index.css";

interface ExpandableCardProps {
  isCardExpanded: boolean;
  children: JSX.Element;
  transition?: Transition;
  isBackgroundFadeEnabled?: boolean;
  onBackgroundFadeClick?: (
    e: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

export function ExpandableCard({
  children,
  isCardExpanded,
  transition,
  isBackgroundFadeEnabled = true,
  onBackgroundFadeClick,
}: ExpandableCardProps): JSX.Element {
  const rootNode = useRef<HTMLElement>(null);

  function convertChildrenToExpandableCardChildren(
    nodes: ReactNode,
    depth: number,
  ): ReactNode {
    return Children.map(nodes, (child, i): ReactNode => {
      // Checks if the node is a string or boolean or number
      const node = child;
      if (!isValidElement(node)) return node;

      let isRoot = false;
      // If first child at the first level, then the node is the root
      if (depth === 1 && i === 0) {
        isRoot = true;
      }

      // Checks if the child is a function component
      if (typeof node.type === "function") {
        child = (node.type as FunctionComponent)(node.props);
        if (!isValidElement(child)) return child;
      }

      const nodeType = node.type as keyof typeof m;

      const { className, ...restOfProps } = node.props;

      // Creates a motion version of the element child type
      const newElem = createElement(
        m[nodeType] as string | FunctionComponent<any>,
        {
          ...restOfProps,
          ref: isRoot ? rootNode : undefined,
          className: `${className ?? ""} ${
            isRoot && isCardExpanded
              ? "cool-layout-animations-card-expanded"
              : "cool-layout-animations-card-condensed"
          }`,
          layout: getLayoutValueFromChildren(node.props.children),
          transition: isRoot ? transition : undefined,
        },
        convertChildrenToExpandableCardChildren(
          node.props.children as ReactNode,
          depth + 1,
        ),
      );

      return newElem;
    });
  }

  const motionChildren = convertChildrenToExpandableCardChildren(children, 1);

  const { placeholderBoxHeight, placeholderBoxWidth } = usePlaceholderBoxSize(
    isCardExpanded,
    rootNode,
  );

  return (
    <LazyMotion features={domMax}>
      {motionChildren}
      {isCardExpanded && (
        <div
          className="cool-layout-animations-placeholder-box"
          style={{
            width: placeholderBoxWidth,
            height: placeholderBoxHeight,
          }}
        />
      )}
      {isBackgroundFadeEnabled && (
        <AnimatePresence>
          {isCardExpanded && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onBackgroundFadeClick}
              className="cool-layout-animations-background-fade"
            />
          )}
        </AnimatePresence>
      )}
    </LazyMotion>
  );
}
