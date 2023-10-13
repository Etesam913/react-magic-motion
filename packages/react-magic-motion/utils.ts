import type { FunctionComponent, Ref, ReactNode } from "react";
import { Children, createElement, isValidElement } from "react";
import { AnimatePresence, m } from "framer-motion";
import { isPortal } from "react-is";

function isNodeText(node: ReactNode) {
  return (
    typeof node === "string" ||
    (Array.isArray(node) && node.every((child) => typeof child === "string"))
  );
}

/** Sets the `layout` property depending on the type of the children*/
export function getLayoutValueFromChildren(
  children: ReactNode,
): "position" | true {
  if (isNodeText(children)) {
    return "position";
  }
  return true;
}

export const forbiddenComponentNames = new Set([
  "MagicMotion",
  "MagicExclude",
  "MagicTabSelect",
  "AnimatePresence",
  "svg",
]);

export function convertChildrenToMotionChildren(
  children: ReactNode,
  customProps?: (child: ReactNode) => Record<string, unknown>,
): ReactNode {
  return Children.map(children, (child): ReactNode => {
    let node = child;
    // Checks if the child is a string or boolean or number
    if (!isValidElement(node)) return node;

    // Checks if the child is a function component
    const nodeProps = node.props as Record<string, unknown>;

    if (typeof node.type === "function") {
      if (forbiddenComponentNames.has(node.type.name)) {
        return node;
      }

      node = (node.type as FunctionComponent)(nodeProps);

      if (!isValidElement(node)) return node;
    }

    const childType = node.type as keyof typeof m;

    // Creates a motion version of the element child type
    const passedInProps = customProps ? customProps(node.props.children) : {};
    const nodeRef = isPortal(node) ? null : (node.ref as Ref<HTMLElement>);

    const newElem = createElement(
      m[childType] as string | FunctionComponent<any>,
      {
        ...node.props,
        ref: nodeRef,
        ...passedInProps,
      },
      convertChildrenToMotionChildren(
        node.props.children as ReactNode,
        customProps,
      ),
    );

    return newElem;
  });
}
