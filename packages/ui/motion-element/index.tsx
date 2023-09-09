"use client";

import { motion } from "framer-motion";
import { type ReactNode, type ElementType, forwardRef } from "react";

const MotionElement = forwardRef(
  (
    {
      children,
      elementType,
      keyValue,
      ...props
    }: {
      children?: ReactNode;
      elementType: ElementType;
      keyValue?: string;
    },
    ref: any, // You could specify a more specific type here
  ): JSX.Element => {
    let MotionElementType: ElementType = elementType;

    // If elementType is a string, try to find its motion equivalent
    MotionElementType = motion(elementType, { forwardMotionProps: true });
    console.log(MotionElementType);
    return (
      <MotionElementType ref={ref} {...props}>
        {children}
      </MotionElementType>
    );
  },
);

export default MotionElement;
