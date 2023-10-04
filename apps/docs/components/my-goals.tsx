import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

function ListItem({ children }: { children: string }): JSX.Element {
  return (
    <li
      className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
      style={{ padding: "0.5rem" }}
    >
      {children}
    </li>
  );
}

export function MyGoals(): JSX.Element {
  const [areGoalsShowing, setAreGoalsShowing] = useState(true);
  return (
    <MagicMotion>
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
        <div>
          <button
            type="button"
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              padding: "0.5rem 1rem",
              backgroundColor: "#5a70ed",
              color: "#ffffff",
            }}
            onClick={() => setAreGoalsShowing(!areGoalsShowing)}
          >
            <div>
              {areGoalsShowing ? "Hide" : "wowowowowowowowowowwoo"} my goals
            </div>
          </button>
        </div>
      </div>
    </MagicMotion>
  );
}
