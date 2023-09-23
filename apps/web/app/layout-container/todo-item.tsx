"use client";

import { type Dispatch, type SetStateAction } from "react";

export default function TodoItem({
  item,
  setItems,
}: {
  item: { id: string; text: string };
  setItems: Dispatch<SetStateAction<{ id: string; text: string }[]>>;
}) {
  return (
    <li className="todo-item">
      {item.text}
      <button
        type="button"
        onClick={() => setItems((prev) => prev.filter((i) => item.id !== i.id))}
      >
        Delete
      </button>
    </li>
  );
}
