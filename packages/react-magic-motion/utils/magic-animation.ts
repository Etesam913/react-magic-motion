import type { FunctionComponent, Ref, ReactNode, ReactElement } from "react";
import { Children, createElement, isValidElement } from "react";
import { isMotionComponent, m } from "framer-motion";
import { isPortal } from "react-is";
import { FORBIDDENELEMENTMESSAGE, FUNCTIONCOMPONENTMESSAGE, KEYEXCLUDEMESSAGE, logSuccess, logWarning } from "./logging";

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

export const forbiddenComponentKeys = new Set([
  "MagicExit",
  "MagicMotion",
  "MagicTabSelect",
]);

/**
  When a component is encontered that is forbidden (should not be animated)
  this function will return the regular un-animated component.
*/
function handleForbiddenComponent(
  node: React.ReactPortal | React.ReactElement<unknown>,
): null | React.ReactPortal | React.ReactElement<unknown> {
  if (typeof node.type === "function") {
    if (node.key !== null && forbiddenComponentKeys.has(String(node.key))) {
      return node;
    }
    return null;
  }
  return null;
}



export function convertChildrenToMotionChildren(
  children: ReactNode,
  customProps: Record<string, unknown>,
  nodeInfo: {isRootNode: boolean; rootNodeCallback?: (node: ReactElement) => ReactElement; isLoggingEnabled?:boolean, depth:number}
): ReactNode {
  const {isRootNode, rootNodeCallback, isLoggingEnabled, depth} = nodeInfo
  if(isLoggingEnabled && children){
    const numOfDashes = (depth-1)*2 
    /* eslint-disable no-console -- It is fine for console.log as logging is enabled */
    console.groupCollapsed(`${' '.repeat(numOfDashes)}👉 Depth: ${depth},`, "elements:", children)
  }
  const animatedChildren =  Children.map(children, (child): ReactNode => {
    let node = child;

    if(isLoggingEnabled) console.log(node)
    // Checks if the child is a string or boolean or number
    if (!isValidElement(node) || node.key === "exclude"){
       
      if(isLoggingEnabled &&  isValidElement(node) && node.key === "exclude") logWarning(KEYEXCLUDEMESSAGE)
      return node;
    }

    // Checks if the child is a function component
    let parent = null;
    while (typeof node.type === "function") {
       
      if(isLoggingEnabled) logSuccess(FUNCTIONCOMPONENTMESSAGE(node.type.name))
      
      const nodeProps = node.props as Record<string, unknown>;
      parent = node;
      node = (node.type as FunctionComponent)(nodeProps);
      
      if (node) {
        const forbiddenResult = handleForbiddenComponent(node);
        if (forbiddenResult){
           
          if(isLoggingEnabled) logWarning(FORBIDDENELEMENTMESSAGE(node.key))
          return parent;
        }
      }

      if (!isValidElement(node)) return node;
    }

    const childType = node.type as keyof typeof m;

    // @ts-expect-error - This is a hack to get around the fact that the ref type is not correct
    const nodeRef = isPortal(node) ? null : (node.ref as Ref<HTMLElement>);

    // If the child is a motion component, we use that as the type otherwise convert it to a motion component
    const typeOfNewElement = (
      isMotionComponent(node.type) ? node.type : m[childType]
    ) as string | FunctionComponent<any>;

    const newElemChildren = convertChildrenToMotionChildren(
      node.props.children as ReactNode,
      customProps,
      {isRootNode: false, isLoggingEnabled, depth:depth+1}
    );

    const newElem = createElement(
      typeOfNewElement,
      {
        ...node.props,
        ref: nodeRef,
        ...customProps,
        layout: getLayoutValueFromChildren(node.props.children),
      },
      newElemChildren,
    );
    if (isRootNode && rootNodeCallback) {
      return rootNodeCallback(newElem);
    }

    return newElem;
  });
  if(isLoggingEnabled && children){
    /* eslint-disable no-console -- It is fine for console.log as logging is enabled */
    console.groupEnd()
  }
  return animatedChildren
}
