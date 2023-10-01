import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

const menuPages = new Map([
  ["home", ["📓 My Classes", "🤩 My Hobbies", "🧑‍💻 My Programming Languages"]],
  [
    "classes",
    [
      "Artificial Intelligence",
      "Spanish",
      "Multivariable Calculus",
      "Roman Art",
      "Natural Language Processing",
      "3D UI and Augmented Reality",
      "Competitive Programming",
    ],
  ],
  [
    "hobbies",
    ["Gym", "Programming", "Watching NBA", "Learning about animation"],
  ],
  ["programming-languages", ["JavaScript/React.js", "Python", "C#", "Java"]],
]);

export function ContextMenu() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "classes" | "hobbies" | "programming-languages"
  >("home");
  return (
    <menu
      className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
      style={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "0.5rem",
        width: "fit-content",
        margin: "1rem 0",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        minWidth: "12.5rem",
      }}
    >
      <header
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.15em",
          display: "flex",
        }}
      >
        {currentPage !== "home" && (
          <button
            style={{ position: "absolute" }}
            onClick={() => setCurrentPage("home")}
          >
            ⬅️
          </button>
        )}
        <span style={{ margin: "0 auto" }}>😀 About Me</span>
      </header>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        {menuPages.get(currentPage)?.map((item) => {
          return (
            <li
              key={item}
              style={{ padding: "0.35rem 0.7rem" }}
              className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
            >
              <button
                disabled={currentPage !== "home"}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.65rem",
                }}
                onClick={() => {
                  if (item.includes("Classes")) {
                    setCurrentPage("classes");
                  } else if (item.includes("Hobbies")) {
                    setCurrentPage("hobbies");
                  } else if (item.includes("Languages")) {
                    setCurrentPage("programming-languages");
                  }
                }}
              >
                {item}
                {currentPage === "home" && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 5.5L18.9261 12.8496C20.5999 14.4018 20.6376 17.0377 19.0087 18.6369L11 26.5"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </menu>
  );
}
