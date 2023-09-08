"use client";

import type { ReactNode, ElementType } from "react";

export function MotionElement({
  children,
  elementType,
  ...props
}: {
  children?: ReactNode;
  elementType: ElementType;
}): JSX.Element {
  const Element = elementType;

  return (
    <Element
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      {...props}
    >
      {children}
    </Element>
  );
}
