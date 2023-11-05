"use client";

import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  type Transition,
} from "framer-motion";
import { Children, createElement, isValidElement, useRef } from "react";
import type { PropsWithChildren, FunctionComponent, ReactNode } from "react";
import { usePlaceholderBoxSize } from "../hooks";
import { getLayoutValueFromChildren } from "../utils/magic-animation";
import "../card.css";

interface MagicCardProps {
  isCardExpanded: boolean;
  children: JSX.Element;
  transition?: Transition;
  disabled?: boolean;
  isBackgroundFadeEnabled?: boolean;
  onBackgroundFadeClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function MagicCard({
  children,
  isCardExpanded,
  transition,
  isBackgroundFadeEnabled = true,
  onBackgroundFadeClick,
}: MagicCardProps): JSX.Element {
  const rootNode = useRef<HTMLElement>(null);

  function convertChildrenToMagicCardChildren(
    nodes: ReactNode,
    depth: number
  ): ReactNode {
    return Children.map(nodes, (child, i): ReactNode => {
      // Checks if the node is a string or boolean or number
      let node = child;
      if (!isValidElement(node)) return node;

      let isRoot = false;
      // If first child at the first level, then the node is the root
      if (depth === 1 && i === 0) {
        isRoot = true;
      }

      // Checks if the child is a function component
      if (typeof node.type === "function") {
        node = (node.type as FunctionComponent)(node.props);
        if (!isValidElement(node)) return node;
      }

      const nodeType = node.type as keyof typeof m;
      const nodeProps = node.props as PropsWithChildren<{
        className?: string;
      }>;

      const { className, ...restOfProps } = nodeProps;

      // Creates a motion version of the element child type
      const newElem = createElement(
        m[nodeType] as string | FunctionComponent<any>,
        {
          ...restOfProps,
          ref: isRoot ? rootNode : undefined,
          className: `${className ?? ""} ${
            isRoot && isCardExpanded
              ? "react-magic-motion-card-expanded"
              : "react-magic-motion-card-condensed"
          }`,
          layout: getLayoutValueFromChildren(nodeProps.children),
          transition: isRoot ? transition : undefined,
        },
        convertChildrenToMagicCardChildren(nodeProps.children, depth + 1)
      );

      return newElem;
    });
  }

  const motionChildren = convertChildrenToMagicCardChildren(children, 1);

  const { placeholderBoxHeight, placeholderBoxWidth } = usePlaceholderBoxSize(
    isCardExpanded,
    rootNode
  );

  return (
    <LazyMotion features={domMax}>
      {motionChildren}

      {isCardExpanded && (
        <div
          className="react-magic-motion-placeholder-box"
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
              className="react-magic-motion-background-fade"
            />
          )}
        </AnimatePresence>
      )}
    </LazyMotion>
  );
}
