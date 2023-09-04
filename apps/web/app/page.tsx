"use client";
import { useState } from "react";
import { ExpandableCard, Header } from "ui";
import "./page.css";

export default function Page(): JSX.Element {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  return (
    <>
      <Header text="Web" />
      <ExpandableCard
        setIsCardExpanded={setIsCardExpanded}
        isCardExpanded={isCardExpanded}
      >
        <div className="expanded-card">
          <h1>My Art Gallery</h1>
          <p>Here is the Mona Lisa, created by Leonardo Da Vinci</p>
          {isCardExpanded && (
            <p>
              The "Mona Lisa" is one of the most famous paintings in the world,
              housed at the Louvre Museum in Paris, France. It was painted by
              the Italian Renaissance artist Leonardo da Vinci between 1503 and
              1506, although some experts believe he may have continued to work
              on it until as late as 1517. The painting is executed in oil on a
              poplar wood panel and measures 30 inches by 21 inches (76 cm by 53
              cm).
            </p>
          )}

          <button onClick={() => setIsCardExpanded((prev) => !prev)}>
            {isCardExpanded ? "Expand" : "Close"}
          </button>
        </div>
      </ExpandableCard>
    </>
  );
}
