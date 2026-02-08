"use client";
import { useState } from "react";
import { MagicCard } from "react-magic-motion";
import "./page.css";
import "../../global.css";
import Link from "next/link";

export default function MagicCards() {
  const [isCardExpanded1, setIsCardExpanded1] = useState(false);

  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Expandable Cards</h1>

      <div className="expandable-card-container">
        <MagicCard
          isCardExpanded={isCardExpanded1}
          onBackgroundFadeClick={() => setIsCardExpanded1(false)}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <button
            type="button"
            className={
              !isCardExpanded1
                ? "mona-lisa-expandable-card-container-condensed"
                : "mona-lisa-expandable-card-container-expanded"
            }
            onClick={() => {
              setIsCardExpanded1((prev) => !prev);
            }}
            style={{
              borderRadius: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: isCardExpanded1 ? "center" : "flex-start",
              }}
            >
              <h2>Mona Lisa</h2>
              <h3>Leonardo Da Vinci</h3>
            </div>

            <img
              alt="Mona Lisa"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
              style={{
                width: isCardExpanded1 ? "75%" : "20rem",
                marginInline: "auto",
              }}
            />
            {isCardExpanded1 && (
              <div>
                <p>
                  The Mona Lisa is one of the most famous paintings in the
                  world, housed at the Louvre Museum in Paris, France. It was
                  painted by the Italian Renaissance artist Leonardo da Vinci
                  between 1503 and 1506, although some experts believe he may
                  have continued to work on it until as late as 1517. The
                  painting is executed in oil on a poplar wood panel and
                  measures 30 inches by 21 inches (76 cm by 53 cm).
                </p>
              </div>
            )}
          </button>
        </MagicCard>
      </div>
    </main>
  );
}
