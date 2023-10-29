import {
  AnimatePresence,
  isMotionComponent,
  m,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import {
  Children,
  isValidElement,
  type ReactNode,
  type FunctionComponent,
  createElement,
} from "react";
import { getLayoutValueFromChildren } from "../utils";
import { isPortal } from "react-is";

export function MagicExit({
  children,
  initial,
  animate,
  exit,

  mode = "sync",
}: {
  children: false | ReactNode;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;

  mode?: "sync" | "wait" | "popLayout";
}) {
  function addExitAnimationToChildren(
    children: false | ReactNode,
    isRootElem: boolean,
  ) {
    return Children.map(children, (child): ReactNode => {
      let node = child;
      if (!isValidElement(node) || node.key === "exclude") return node;
      const nodeProps = node.props as Record<string, unknown>;
      if (typeof node.type === "function") {
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

      const newElemChildren = addExitAnimationToChildren(
        node.props.children as ReactNode,
        false,
      );

      const newElemProps = {
        ...node.props,
        ref: nodeRef,
        layout: getLayoutValueFromChildren(child),
      };
      if (isRootElem) {
        newElemProps.initial = initial;
        newElemProps.animate = animate;
        newElemProps.exit = exit;
      }

      const newElem = createElement(
        typeOfNewElement,
        newElemProps,
        newElemChildren,
      );

      return newElem;
    });
  }

  return (
    <AnimatePresence mode={mode} key="react-magic-motion-animate-presence">
      {addExitAnimationToChildren(children, true)}
    </AnimatePresence>
  );
}
