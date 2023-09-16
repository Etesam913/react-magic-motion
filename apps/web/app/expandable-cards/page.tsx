"use client";
import { useState } from "react";
import { ExpandableCard } from "ui";
import "./page.css";
import "../../global.css";
import Link from "next/link";
import AppRow from "./[app-row]";

export default function ExpandableCards() {
  const [isCardExpanded1, setIsCardExpanded1] = useState(false);
  const [isCardExpanded2, setIsCardExpanded2] = useState(false);

  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Expandable Cards</h1>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <ExpandableCard
          isCardExpanded={isCardExpanded1}
          onBackgroundFadeClick={() => setIsCardExpanded1(false)}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div
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
            {isCardExpanded1 ? (
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
            ) : null}
          </div>
        </ExpandableCard>

        <ExpandableCard isCardExpanded={isCardExpanded2}>
          <div
            className={
              !isCardExpanded2
                ? "app-store-expandable-card-container-condensed"
                : "app-store-expandable-card-container-expanded"
            }
            onClick={() => {
              setIsCardExpanded2((prev) => !prev);
            }}
            style={{
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <div
              className="app-store-expandable-card-background-image"
              style={{
                height: isCardExpanded2 ? "10rem" : "auto",

                transition: "color 0.3s ease-in-out",
              }}
            >
              <h2>Top Apps</h2>
            </div>
            <ul className="app-row-list">
              <AppRow
                isCardExpanded={isCardExpanded2}
                name="Roblox"
                desc="Join Millions of Experiences"
                img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/roblox-icon.webp"
              />
              <AppRow
                isCardExpanded={isCardExpanded2}
                name="Pokémon GO"
                desc="Epic AR adventure & online RPG"
                img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/pokemon-go-logo.png"
              />
              <AppRow
                isCardExpanded={isCardExpanded2}
                name="Subway Surfers"
                desc="Join the endless running fun!"
                img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/subway-surfers-logo.png"
              />
              <AppRow
                isCardExpanded={isCardExpanded2}
                name="Minecraft"
                desc="Create, explore and survive!"
                img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/minecraft-mobile-logo.png"
              />
              {isCardExpanded2 ? (
                <div className="app-row-list" style={{ padding: 0 }}>
                  <AppRow
                    isCardExpanded={isCardExpanded2}
                    name="Dumb Ways to Die"
                    desc="Safety First"
                    img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/dumb-ways-to-die-logo.webp"
                  />

                  <AppRow
                    isCardExpanded={isCardExpanded2}
                    name="Candy Crush Saga"
                    desc="Sugar Rush Match 3 Puzzle Game"
                    img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/candy-crush-logo.png"
                  />

                  <AppRow
                    isCardExpanded={isCardExpanded2}
                    name="FIFA Soccer"
                    desc="Train soccer stars & compete!"
                    img="https://cool-layout-animations.nyc3.cdn.digitaloceanspaces.com/fifa-soccer-logo.png"
                  />
                </div>
              ) : null}
            </ul>
          </div>
        </ExpandableCard>
      </div>
    </main>
  );
}
