"use client";
import { motion } from "framer-motion";
import type {
  Dispatch,
  SetStateAction,
  ReactNode,
  ElementType,
  ComponentType,
} from "react";
import { createElement, isValidElement, Children, useMemo } from "react";
import "./index.css";
import MotionElement from "../motion-element";

interface ExpandableCardProps {
  isCardExpanded: boolean;
  setIsCardExpanded: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

function getRandomBackgroundColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function convertChildrenToMotionChildren(children: ReactNode) {
  return Children.map(children, (child): ReactNode => {
    // Checks if the child is a string or boolean or number
    if (!isValidElement(child)) return child;

    // Checks if the child is a function component
    if (typeof child.type === "function") {
      child = (child.type as Function)();
      if (!isValidElement(child)) return child;
    }
    const childType = child.type as ComponentType;
    console.log(childType, child.props);
    // Creates a motion version of the element child type
    let newElem = createElement(
      motion[childType],
      {
        ...child.props,
        layout: true,
      },
      convertChildrenToMotionChildren(child.props.children),
    );

    return newElem;
  });
}

export function ExpandableCard({
  isCardExpanded,
  setIsCardExpanded,
  children,
}: ExpandableCardProps): JSX.Element {
  return (
    <div>
      {convertChildrenToMotionChildren(children)}
      {/* <motion.div
        className="expanded-card"
        data-expanded={isCardExpanded}
        layout
      >
        <motion.h1 layout="position">My Art Gallery</motion.h1>
        <motion.p layout="position">
          Here is the Mona Lisa, created by Leonardo Da Vinci
        </motion.p>
        <motion.img
          layout="preserve-aspect"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
          style={{ width: isCardExpanded ? "100%" : "20rem" }}
        />
        {isCardExpanded ? (
          <p>
            The Mona Lisa is one of the most famous paintings in the world,
            housed at the Louvre Museum in Paris, France. It was painted by the
            Italian Renaissance artist Leonardo da Vinci between 1503 and 1506,
            although some experts believe he may have continued to work on it
            until as late as 1517. The painting is executed in oil on a poplar
            wood panel and measures 30 inches by 21 inches (76 cm by 53 cm).
          </p>
        ) : null}

        <motion.button
          className="expandable-button"
          layout="position"
          onClick={() => {
            setIsCardExpanded((prev) => !prev);
          }}
        >
          {isCardExpanded ? "Close" : "Expand"}
        </motion.button>
      </motion.div> */}
    </div>
  );
}
