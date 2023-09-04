"use client";
import { createElement } from "react";
import { motion } from "framer-motion";
import { MotionDiv } from "./motion-div";
import "./expandable-card.css";

interface ExpandableCardProps {
  isCardExpanded: boolean;
  children: JSX.Element;
}

export function ExpandableCard({
  isCardExpanded,
  children,
}: ExpandableCardProps): JSX.Element {
  const element = createElement(MotionDiv, null, <div> my name is jeff</div>);

  return (
    <motion.div layout className="expanded-card" data-expanded={isCardExpanded}>
      <motion.h1 layout="position">My Art Gallery</motion.h1>
      <motion.p layout="position">
        Here is the Mona Lisa, created by Leonardo Da Vinci
      </motion.p>
      {isCardExpanded && (
        <p>
          The Mona Lisa is one of the most famous paintings in the world, housed
          at the Louvre Museum in Paris, France. It was painted by the Italian
          Renaissance artist Leonardo da Vinci between 1503 and 1506, although
          some experts believe he may have continued to work on it until as late
          as 1517. The painting is executed in oil on a poplar wood panel and
          measures 30 inches by 21 inches (76 cm by 53 cm).
        </p>
      )}
    </motion.div>
  );
}
