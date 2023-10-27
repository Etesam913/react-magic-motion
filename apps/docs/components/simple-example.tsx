import { useState } from "react";
import { AnimatePresence, MagicMotion } from "react-magic-motion";

export function SimpleExample(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <MagicMotion>
      <div>
        <AnimatePresence key="animate-presence">{isOpen && <div>testing</div>}</AnimatePresence>
        <button onClick={() => setIsOpen(!isOpen)}>click me</button>
      </div>
    </MagicMotion>
  );
}
