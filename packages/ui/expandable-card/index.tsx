"use client";
import { Transition, motion } from "framer-motion";
import type { ReactNode, FunctionComponent } from "react";
import {
  createElement,
  isValidElement,
  Children,
  useRef,
  useEffect,
  useState,
} from "react";
import "./index.css";

interface ExpandableCardProps {
  isCardExpanded: boolean;
  children: JSX.Element;
  transition?: Transition;
}

function getLayoutValueFromChildren(children: ReactNode): "position" | true {
  if (typeof children === "string") return "position";
  return true;
}

export function ExpandableCard({
  children,
  isCardExpanded,
  transition,
}: ExpandableCardProps): JSX.Element {
  const rootNode = useRef<HTMLElement>(null);

  function convertChildrenToMotionChildren(
    children: ReactNode,
    depth: number
  ): ReactNode {
    return Children.map(children, (child, i): ReactNode => {
      // Checks if the child is a string or boolean or number
      if (!isValidElement(child)) return child;

      let isRoot = false;
      // If first child at the first level, then the node is the root
      if (depth === 1 && i === 0) {
        isRoot = true;
      }

      // Checks if the child is a function component
      if (typeof child.type === "function") {
        child = (child.type as Function)();
        if (!isValidElement(child)) return child;
      }

      const childType = child.type as keyof typeof motion;

      const { className, ...restOfProps } = child.props;
      // Creates a motion version of the element child type
      const newElem = createElement(
        motion[childType] as string | FunctionComponent<any>,
        {
          ...restOfProps,
          ref: isRoot ? rootNode : undefined,
          className: `${className ?? ""} ${
            isRoot && isCardExpanded
              ? "cool-layout-animations-card-expanded"
              : ""
          }`,
          layout: getLayoutValueFromChildren(child.props.children),
          transition: isRoot ? transition : undefined,
        },
        convertChildrenToMotionChildren(
          child.props.children as ReactNode,
          depth + 1
        )
      );

      return newElem;
    });
  }

  const motionChildren = convertChildrenToMotionChildren(children, 1);
  const [cardDimensions, setCardDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!isCardExpanded) {
      if (rootNode.current) {
        setCardDimensions({
          width: rootNode.current.clientWidth,
          height: rootNode.current.clientHeight,
        });
      }
    }
  }, [rootNode, isCardExpanded, setCardDimensions]);

  return (
    <>
      {motionChildren}
      {isCardExpanded ? (
        <div
          style={{ height: cardDimensions.height, width: cardDimensions.width }}
        />
      ) : (
        <> </>
      )}

      {/* <motion.div
        layout
        onClick={() => {
          setIsCardExpanded((prev) => !prev);
        }}
      >
        <motion.h1 layout="position">My Art Gallery</motion.h1>
        <motion.p layout="position">
          Here is the Mona Lisa, created by Leonardo Da Vinci
        </motion.p>
        <motion.img
          layout
          alt="Mona Lisa"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
          style={{ width: isCardExpanded ? "30%" : "20rem" }}
        />
        {isCardExpanded ? (
          <motion.div>
            <motion.p>
              The Mona Lisa is one of the most famous paintings in the world,
              housed at the Louvre Museum in Paris, France. It was painted by
              the Italian Renaissance artist Leonardo da Vinci between 1503 and
              1506, although some experts believe he may have continued to work
              on it until as late as 1517. The painting is executed in oil on a
              poplar wood panel and measures 30 inches by 21 inches (76 cm by 53
              cm).
            </motion.p>
            <motion.p>
              The Mona Lisa is one of the most famous paintings in the world,
              housed at the Louvre Museum in Paris, France. It was painted by
              the Italian Renaissance artist Leonardo da Vinci between 1503 and
              1506, although some experts believe he may have continued to work
              on it until as late as 1517. The painting is executed in oil on a
              poplar wood panel and measures 30 inches by 21 inches (76 cm by 53
              cm).
            </motion.p>
          </motion.div>
        ) : null}
      </motion.div> */}
    </>
  );
}
