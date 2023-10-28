<h1 align="center">react-magic-motion</h1>

<h3 align="center"><a href="https://react-magic-motion.com">react-magic-motion.com</a></h3>

<p align="center"><code>react-magic-motion</code> is a react.js library that ✨ magically animates your components.</p>

## ⭐️ Getting Started

### 📦 Install

```bash
npm i react-magic-motion
```

### 🔎 Simple Example

#### 🎥 Demo

https://github.com/Etesam913/react-magic-motion/assets/55665282/dfc56ad5-5012-4f5e-90cc-8ec372527320

#### 🧑‍💻 Code

```jsx
import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

function ListItem({ children }: { children: string }) {
  return (
    <li
      style={{
        backgroundColor: "#4d4d4dff",
        width: "20rem",
        padding: "0.5rem",
      }}
    >
      {children}
    </li>
  );
}

export default function App() {
  const [areGoalsShowing, setAreGoalsShowing] = useState(true);
  return (
    <MagicMotion>
      <div
        style={{
          margin: "0.75rem auto 0",
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            margin: "0.25rem",
          }}
        >
          My Goals
        </h1>
        {areGoalsShowing && (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              listStyle: "none",
              paddingLeft: "0.5rem",
              margin: 0,
            }}
          >
            <ListItem>🏀 Make 10 three pointers in a row</ListItem>
            <ListItem>🏋️‍♂️ Bench press 225 lbs</ListItem>
            <ListItem>🏃‍♂️ Run a 5k in under 20 minutes</ListItem>
          </ul>
        )}
        <button
          style={{
            width: "fit-content",
            whiteSpace: "nowrap",
            padding: "0.5rem 1rem",
            backgroundColor: "#5a70ed",
            color: "#ffffff",
            border: 0,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onClick={() => setAreGoalsShowing(!areGoalsShowing)}
        >
          {areGoalsShowing ? "Hide" : "Show"} my goals
        </button>
      </div>
    </MagicMotion>
  );
}
```

### 💫 Examples

- [To do list](https://www.react-magic-motion.com/applications)
- [Accordion](https://www.react-magic-motion.com/applications/accordion)
- [Sidebar](https://www.react-magic-motion.com/applications/collapsible-sidebar)
- [Expandable Card](https://www.react-magic-motion.com/applications/expandable-card)
- [Grid Area](https://www.react-magic-motion.com/applications/grid-area)
- [Search](https://www.react-magic-motion.com/applications/search)
- [Tabs](https://www.react-magic-motion.com/applications/tabs)

## 📓 Docs

- For a full understanding of `react-magic-motion visit` the docs [here](https://react-magic-motion.com)

## ❓ Want to Contribute

- Visit the [contributing.md](./CONTRIBUTING.md)
