import type { FunctionComponent, Ref, ReactNode } from "react";
import { Children, createElement, isValidElement } from "react";
import { isMotionComponent, m } from "framer-motion";
import { isPortal } from "react-is";

function isNodeText(node: ReactNode): boolean {
  return (
    typeof node === "string" ||
    (Array.isArray(node) && node.every((child) => typeof child === "string"))
  );
}

function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
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

export function convertChildrenToMotionChildren(
  children: ReactNode,
  customProps: Record<string, unknown>,
): ReactNode {
  return Children.map(children, (child): ReactNode => {
    let node = child;

    // Checks if the child is a string or boolean or number
    if (!isValidElement(node) || node.key === "exclude") return node;

    // Checks if the child is a function component
    const nodeProps = node.props as Record<string, unknown>;
    if (typeof node.type === "function") {
      if (node.type.name === "MagicExit") {
        return node;
      }
      // if (node.key === "react-magic-motion-animate-presence") {

      //   return node;
      // }
      // if (node.key === "magic-ap") {
      //   const nodeChild = node.props.children;

      //   const motionChild = convertChildrenToMotionChildren(nodeChild, {
      //     ...customProps,
      //   });

      //   const newAnimatePresence = createElement(
      //     node.type,
      //     { ...node.props },
      //     motionChild,
      //   );
      //   return newAnimatePresence;
      // }
      node = (node.type as FunctionComponent)(nodeProps);
      if (!isValidElement(node)) return node;
    }

    const childType = node.type as keyof typeof m;

    // @ts-expect-error - This is a hack to get around the fact that the ref type is not correct
    const nodeRef = isPortal(node) ? null : (node.ref as Ref<HTMLElement>);

    // If the child is a motion component, we use that as the type otherwise convert it to a motion component
    const typeOfNewElement = (
      isMotionComponent(node.type) ? node.type : m[childType]
    ) as string | FunctionComponent<any>;

    const childrenCustomProps = { ...customProps };

    const newElemChildren = convertChildrenToMotionChildren(
      node.props.children as ReactNode,
      childrenCustomProps,
    );

    const newElem = createElement(
      typeOfNewElement,
      {
        ...node.props,
        ref: nodeRef,
        ...customProps,
        layout: getLayoutValueFromChildren(child),
      },

      newElemChildren,
    );

    return newElem;
  });
}
