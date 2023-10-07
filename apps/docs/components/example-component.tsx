import { useState } from "react";
import { LayoutGroup, MagicMotion, Transition } from "react-magic-motion";
import { Toggle } from "./toggle";

export function ExampleComponent({
  children,
  transition,
}: {
  children: JSX.Element;
  transition?: Transition;
}): JSX.Element {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  return (
    <MagicMotion transition={transition} disabled={!isAnimationEnabled}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}

        <p style={{ marginTop: "0.65rem" }}>Options</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Toggle
            isActive={isAnimationEnabled}
            setIsActive={setIsAnimationEnabled}
          />
          <span>Animation {isAnimationEnabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>
    </MagicMotion>
  );
}
