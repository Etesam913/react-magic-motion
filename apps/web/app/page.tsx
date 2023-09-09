"use client";
import { useState } from "react";
import { ExpandableCard, Header } from "ui";
import "./page.css";

export default function Page(): JSX.Element {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  return (
    <>
      <Header text="Web" />
      <div>oher text</div>
      <ExpandableCard
        isCardExpanded={isCardExpanded}
        transition={{ type: "spring", stiffness: 125, damping: 14 }}
      >
        <div
          className={
            !isCardExpanded
              ? "expandable-card-container-condensed"
              : "expandable-card-container-expanded"
          }
          onClick={() => {
            setIsCardExpanded((prev) => !prev);
          }}
        >
          <h1>My Art Gallery</h1>
          <p>Here is the Mona Lisa, created by Leonardo Da Vinci</p>
          <img
            alt="Mona Lisa"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
            style={{
              width: isCardExpanded ? "75%" : "20rem",
              marginInline: "auto",
            }}
          />
          {isCardExpanded ? (
            <div>
              <p>
                The Mona Lisa is one of the most famous paintings in the world,
                housed at the Louvre Museum in Paris, France. It was painted by
                the Italian Renaissance artist Leonardo da Vinci between 1503
                and 1506, although some experts believe he may have continued to
                work on it until as late as 1517. The painting is executed in
                oil on a poplar wood panel and measures 30 inches by 21 inches
                (76 cm by 53 cm).
              </p>
            </div>
          ) : null}
        </div>
      </ExpandableCard>
      <div>oher text</div>
    </>
  );
}
