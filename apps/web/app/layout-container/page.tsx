"use client";
import Link from "next/link";
import { LayoutContainer } from "ui";
import "../../global.css";
import "./page.css";
import { useRef, useState } from "react";
import TodoItem from "./todo-item";

export default function LayoutContainerPage() {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), text: "Walk the dog" },
    { id: crypto.randomUUID(), text: "Complete math homework" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <main>
      <Link href="/" className="go-back">
        Go To Home 👈
      </Link>
      <h1>Layout Container</h1>
      <form className="submit-form" onSubmit={(e) => e.preventDefault()}>
        <LayoutContainer>
          <ul className="todo-list">
            {items.map((item) => (
              <TodoItem key={item.id} item={item} setItems={setItems} />
            ))}
          </ul>
        </LayoutContainer>
        <LayoutContainer>
          <div className="submit-row">
            <input ref={inputRef} className="add-input" type="text" />

            <button
              onClick={() => {
                const newTodo = inputRef.current?.value;
                if (!newTodo) return;
                setItems([
                  ...items,
                  { id: crypto.randomUUID(), text: newTodo },
                ]);

                inputRef.current.value = "";
              }}
              className="add-button"
              type="submit"
            >
              Add Item
            </button>
          </div>
        </LayoutContainer>
      </form>
    </main>
  );
}
