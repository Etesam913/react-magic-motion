"use client";

import { motion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

function getRandomBackgroundColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

export function MotionElement({
  children,
  elementType,
  ...props
}: {
  children?: ReactNode;
  elementType: ElementType;
}): JSX.Element {
  let MotionElementType: ElementType = elementType;
  console.log(elementType, motion(elementType));

  // If elementType is a string, try to find its motion equivalent
  MotionElementType = motion(elementType);

  return (
    <MotionElementType
      animate={{ backgroundColor: getRandomBackgroundColor() }}
      initial={{ backgroundColor: "rgb(255, 255, 255)" }}
      {...props}
    >
      {children}
    </MotionElementType>
  );
}
