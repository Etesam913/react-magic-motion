import type {
  FunctionComponent,
  Ref,
  ReactNode,
  PropsWithChildren,
} from "react";
import { Children, createElement, isValidElement } from "react";
import { isMotionComponent, m, Transition } from "framer-motion";
import { isPortal } from "react-is";

function isNodeText(node: ReactNode): boolean {
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

export function getAdditionalDefaultProps(
  child: ReactNode,
  layoutDependency: any,
  transition: Transition,
) {
  return {
    layout: getLayoutValueFromChildren(child),
    layoutDependency,
    transition,
  };
}

export function convertChildrenToMotionChildren(
  children: ReactNode,
  layoutDependency: any,
  transition: Transition,
  debug?: boolean,
): ReactNode {
  return Children.map(children, (child): ReactNode => {
    let node = child;

    // Checks if the child is a string or boolean or number
    if (!isValidElement(node) || node.key === "exclude") return node;

    // Checks if the child is a function component
    const nodeProps = node.props as Record<string, unknown>;
    // console.log('💫', node, node.type)

    if (typeof node.type === "function") {
      if (node.key === "animate-presence") {
        // const presenceChild = node.child
        const nodeChild = node.props.children;

        const motionChild = convertChildrenToMotionChildren(
          nodeChild,
          layoutDependency,


          debug,

        );

        const newAnimatePresence = createElement(
          node.type,
          { ...node.props },
          motionChild,
        );
        return newAnimatePresence;
      }
      node = (node.type as FunctionComponent)(nodeProps);
      if (!isValidElement(node)) return node;
    }

    const childType = node.type as keyof typeof m;

    // const passedInProps = customProps
    //   ? customProps((node.props as PropsWithChildren).children)
    //   : {};
    const passedInProps = getAdditionalDefaultProps(
      (node.props as PropsWithChildren).children,
      layoutDependency,
      transition,
    );

    // @ts-expect-error - This is a hack to get around the fact that the ref type is not correct
    const nodeRef = isPortal(node) ? null : (node.ref as Ref<HTMLElement>);

    // If the child is a motion component, we use that as the type otherwise convert it to a motion component
    const typeOfNewElement = (
      isMotionComponent(node.type) ? node.type : m[childType]
    ) as string | FunctionComponent<any>;

    const newElem = createElement(
      typeOfNewElement,
      {
        ...node.props,
        ref: nodeRef,
        ...passedInProps,
      },
      convertChildrenToMotionChildren(
        node.props.children as ReactNode,
        transition,
        layoutDependency
        debug,
      ),
    );

    return newElem;
  });
}
