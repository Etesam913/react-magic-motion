"use client";
import { useState } from "react";
import { ExpandableCard, Header } from "ui";
import "./page.css";

function EmojiComponent() {
  return (
    <div>
      <div style={{ fontSize: "2rem" }}>🍎</div>
      <div style={{ fontSize: "2rem" }}>🍌</div>
      <h1>👍</h1>
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
        <span>
          testing
          <EmojiComponent />
        </span>
      </ExpandableCard>
    </>
  );
}
