"use client";
import Link from "next/link";
import { MagicMotion } from "react-magic-motion";
import "../../global.css";
import "./page.css";
import { useRef, useState } from "react";
import TodoItem from "./todo-item";

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex: number;
  let temporaryValue: T;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
        <MagicMotion>
          <ul className="todo-list">
            {items.map((item) => (
              <TodoItem key={item.id} item={item} setItems={setItems} />
            ))}
          </ul>
        </MagicMotion>
        <MagicMotion>
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
              Add
            </button>
            <button
              type="button"
              onClick={() => setItems(shuffle([...items]))}
              className="shuffle-button"
            >
              Shuffle
            </button>
          </div>
        </MagicMotion>
      </form>
    </main>
  );
}
