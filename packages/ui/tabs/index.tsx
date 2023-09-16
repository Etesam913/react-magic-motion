import { motion } from "framer-motion";
import "./index.css";
import { useState } from "react";
interface TabsProps {
  children: JSX.Element;
}
export default function Tabs({ children }: TabsProps) {
  const [selectedIndex1, setSelectedIndex1] = useState(1);
  const [selectedIndex2, setSelectedIndex2] = useState(1);

  const tabs = ["wow", "this is sooooooooooo cool", "yolo"];
  const tabsComponentsUnderline = tabs.map((text, i) => {
    return (
      <motion.button
        key={`tab-${i}`}
        onClick={() => setSelectedIndex1(i)}
        className="tab"
      >
        button {text}
        {selectedIndex1 === i && (
          <div style={{ position: "relative" }}>
            <motion.div layoutId={"bob"} className="underline" />
          </div>
        )}
      </motion.button>
    );
  });

  const tabsComponentsHighlight = tabs.map((text, i) => {
    return (
      <motion.button
        key={`tab-${i}`}
        onClick={() => setSelectedIndex2(i)}
        className="tab-2"
        style={{ color: selectedIndex2 === i ? "white" : "black" }}
      >
        button {text}
        {selectedIndex2 === i && (
          <motion.div
            layoutId={"joe"}
            className="underline-2"
            style={{ borderRadius: 36 }}
          />
        )}
      </motion.button>
    );
  });

  return (
    <>
      <div className="tabs-container">{tabsComponentsUnderline}</div>
      <div className="tabs-container">{tabsComponentsHighlight}</div>
    </>
  );
}
