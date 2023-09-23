"use client";
import Link from "next/link";
import { LayoutContainer } from "ui";
import "../../global.css";
import "./page.css";
import { useRef, useState } from "react";

function TestContainer({ children }: { children: React.ReactNode }) {
  // console.log(children);
  return <div>{children}</div>;
}

export default function LayoutContainerPage() {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), text: "Walk the dog" },
    { id: crypto.randomUUID(), text: "Complete math homework" },
  ]);

  const [itemToAddText, setItemToAddText] = useState("");
  const inputRef = useRef(null);
  const input2Ref = useRef(null);

  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Layout Container</h1>
      <LayoutContainer layoutDependency={items}>
        <div>
          <form className="submit-form" onSubmit={(e) => e.preventDefault()}>
            <ul className="todo-list">
              {items.map((item) => (
                <li
                  onClick={() =>
                    setItems((prev) => prev.filter((i) => item.id !== i.id))
                  }
                  key={item.id}
                  className="todo-item"
                >
                  {item.text}
                </li>
              ))}
            </ul>
            adksfj
            <div className="submit-row">
              <input
                ref={input2Ref}
                onChange={(e) => setItemToAddText(e.target.value)}
                value={itemToAddText}
                className="add-input"
                type="text"
              />

              <button
                onClick={() => {
                  setItems((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      text: itemToAddText,
                    },
                  ]);
                  setItemToAddText("");
                }}
                className="add-button"
                type="submit"
              >
                Add Item
              </button>
            </div>
          </form>
          <div>test</div>
        </div>
      </LayoutContainer>
      <TestContainer>
        <div ref={inputRef}>wow</div>
      </TestContainer>
    </main>
  );
}
