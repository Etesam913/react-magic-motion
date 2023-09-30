import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { Toggle } from "./toggle";
import { TodoList } from "./todo-list";

export function ExampleComponent() {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  return (
    <MagicMotion disabled={!isAnimationEnabled}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TodoList />
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
