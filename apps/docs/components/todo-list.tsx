import { Dispatch, SetStateAction, useRef, useState } from "react";

function TodoListItem({
  todo,
  setTodos,
}: {
  todo: { id: string; text: string };
  setTodos: Dispatch<SetStateAction<{ id: string; text: string }[]>>;
}) {
  return (
    <li
      className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
      style={{
        display: "flex",
        justifyContent: "space-between",
        lineHeight: "2rem",
        padding: "0.35rem 1rem",
      }}
    >
      {todo.text}
      <button
        type="button"
        title="Delete this item"
        className="nx-bg-black/[.02]"
        onClick={() =>
          setTodos((todos) => todos.filter((t) => t.id !== todo.id))
        }
      >
        🗑️
      </button>
    </li>
  );
}

export function TodoList() {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), text: "🐕 Walk the dog" },
    { id: crypto.randomUUID(), text: "🍔 Eat lunch" },
    { id: crypto.randomUUID(), text: "📚 Study React" },
  ]);

  const newTodoInput = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginTop: "1rem",
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          overflow: "auto",
        }}
      >
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "flex", gap: "1rem" }}
      >
        <input
          ref={newTodoInput}
          type="text"
          placeholder="Write a new todo 📝"
          className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            width: "100%",
          }}
        />
        <button
          type="submit"
          title="Add a new todo"
          style={{
            whiteSpace: "nowrap",
            padding: "0.5rem 1rem",
            backgroundColor: "#5a70ed",
            color: "#ffffff",
          }}
          onClick={() => {
            if (!newTodoInput.current?.value) return;
            setTodos([
              ...todos,
              {
                id: crypto.randomUUID(),
                text: newTodoInput.current.value,
              },
            ]);
            newTodoInput.current.value = "";
          }}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
