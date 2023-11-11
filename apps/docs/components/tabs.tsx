import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";

const underlineTabs = ["Recipes 🧑‍🍳", "Notes 📝", "Programming 🧑‍💻"];

export function UnderlineTabs(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const tabsComponents = underlineTabs.map((text, i) => {
    return (
      <button
        type="button"
        key={`tab-${text}`}
        onClick={() => setSelectedIndex(i)}
        style={{ padding: "0.65rem 0.75rem" }}
        className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
      >
        {text}

        {selectedIndex === i && (
          <div style={{ position: "relative", transform: "translateY(3px)" }}>
            <MagicTabSelect
              id="underlineTabs"
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "0.15rem",
                  backgroundColor: "currentColor",
                  position: "absolute",
                }}
              />
            </MagicTabSelect>
          </div>
        )}
      </button>
    );
  });

  return (
    <div style={{ display: "flex", gap: "0.75rem", margin: "0.75rem 0" }}>
      {tabsComponents}
    </div>
  );
}

const pillTabs = [
  "Hobbies",
  "Work",
  "Projects",
  "This is a loooooooooong item",
  "Languages",
];

export function PillTabs(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const tabsComponents = pillTabs.map((text, i) => {
    return (
      <button
        type="button"
        key={text}
        onMouseEnter={() => setHoveredIndex(i)}
        style={{
          position: "relative",
          padding: "0.65rem 0.75rem",
          color: "currentColor",
        }}
      >
        {hoveredIndex === i && (
          <MagicTabSelect
            id="pillTabs"
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <span
              style={{
                borderRadius: "999px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: "currentColor",
                mixBlendMode: "difference",
              }}
            />
          </MagicTabSelect>
        )}
        {text}
      </button>
    );
  });

  return (
    <div style={{ display: "flex", gap: "0.75rem", margin: "0.75rem 0" }}>
      {tabsComponents}
    </div>
  );
}
