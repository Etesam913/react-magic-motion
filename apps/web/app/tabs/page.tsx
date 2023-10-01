"use client";
import Link from "next/link";
import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";
import "../../global.css";
import "./page.css";

export default function TabsPage() {
  const tabs1 = ["Recipes 🧑‍🍳", "Notes 📝", "Programming 🧑‍💻"];
  const [selectedIndex1, setSelectedIndex1] = useState(0);

  const tabs2 = [
    "Homework 📄",
    "Cats 🐱",
    "Jokes and ooooother funny things 😂",
  ];
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  const tabsComponentsUnderline = tabs1.map((text, i) => {
    return (
      <button
        type="button"
        key={`tab-${text}`}
        onClick={() => setSelectedIndex1(i)}
        className="tab-1"
      >
        {text}
        {selectedIndex1 === i && (
          <div style={{ position: "relative" }}>
            <MagicTabSelect id="underline">
              <div className="underline" />
            </MagicTabSelect>
          </div>
        )}
      </button>
    );
  });

  const tabsComponentsHighlight = tabs2.map((text, i) => {
    return (
      <button
        type="button"
        key={`tab-${text}`}
        onClick={() => setSelectedIndex2(i)}
        className="tab-2"
        style={{ color: selectedIndex2 === i ? "white" : "black" }}
      >
        {text}
        {selectedIndex2 === i && (
          <MagicTabSelect
            id="highlight"
            transition={{ type: "spring", damping: 13, stiffness: 110 }}
          >
            <div className="highlight" style={{ borderRadius: 36 }} />
          </MagicTabSelect>
        )}
      </button>
    );
  });

  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Tabs</h1>
      <div className="tabs-container">{tabsComponentsUnderline}</div>
      <div className="tabs-container">{tabsComponentsHighlight}</div>
    </main>
  );
}
