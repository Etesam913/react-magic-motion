import { useState } from "react";
import { LayoutContainer } from "react-motionize";

function ListItem({ children }: { children: string }) {
  return (
    <li
      className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
      style={{ padding: "0.5rem" }}
    >
      {children}
    </li>
  );
}

export function MyGoals() {
  const [areGoalsShowing, setAreGoalsShowing] = useState(true);
  return (
    <LayoutContainer>
      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
        }}
      >
        <h1 style={{ fontWeight: "bold" }}>My Goals</h1>
        {areGoalsShowing && (
          <ul
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <ListItem>🏀 Make 10 three pointers in a row</ListItem>
            <ListItem>🏋️‍♂️ Bench press 225 lbs</ListItem>
            <ListItem>🏃‍♂️ Run a 5k in under 20 minutes</ListItem>
          </ul>
        )}
        <button
          style={{
            width: "fit-content",
            whiteSpace: "nowrap",
            padding: "0.5rem 1rem",
            backgroundColor: "#5a70ed",
            color: "#ffffff",
          }}
          onClick={() => setAreGoalsShowing(!areGoalsShowing)}
        >
          {areGoalsShowing ? "Hide" : "Show"} my goals
        </button>
      </div>
    </LayoutContainer>
  );
}
