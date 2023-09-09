"use client";
import { useState } from "react";
import { ExpandableCard, Header } from "ui";
import "./page.css";

function EmojiComponent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} style={{ fontSize: "2rem" }}>
        🍎
      </button>
      <div style={{ fontSize: "2rem" }}>🍌</div>
      {isOpen ? <h1>👍</h1> : <div></div>}
    </div>
  );
}

export default function Page(): JSX.Element {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  return (
    <>
      <Header text="Web" />
      <ExpandableCard
        isCardExpanded={isCardExpanded}
        setIsCardExpanded={setIsCardExpanded}
      >
        <div className="expanded-card" data-expanded={isCardExpanded}>
          <h1>My Art Gallery</h1>
          yolo
          <p>Here is the Mona Lisa, created by Leonardo Da Vinci</p>
          <img
            key={4}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
            style={{ width: isCardExpanded ? "100%" : "20rem" }}
          />
          {isCardExpanded ? (
            <p>
              The Mona Lisa is one of the most famous paintings in the world,
              housed at the Louvre Museum in Paris, France. It was painted by
              the Italian Renaissance artist Leonardo da Vinci between 1503 and
              1506, although some experts believe he may have continued to work
              on it until as late as 1517. The painting is executed in oil on a
              poplar wood panel and measures 30 inches by 21 inches (76 cm by 53
              cm).
            </p>
          ) : null}
        </div>
      </ExpandableCard>
      <button
        className="expandable-button"
        onClick={() => {
          setIsCardExpanded((prev) => !prev);
        }}
      >
        {isCardExpanded ? "Close" : "Expand"}
      </button>
    </>
  );
}
