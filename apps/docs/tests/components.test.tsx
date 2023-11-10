import {
  act,
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import { describe, test, expect, beforeAll, vi } from "vitest";
import { TodoList } from "../components/todo-list";
import "@testing-library/jest-dom";
import { MagicMotion } from "react-magic-motion";

describe("Application Tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });
  test("to do list component", async () => {
    const { container } = render(
      <MagicMotion>
        <TodoList />
      </MagicMotion>
    );
    expect(container).toHaveTextContent("🐕 Walk the dog");
    expect(container).toHaveTextContent("🍔 Eat lunch");
    expect(container).toHaveTextContent("📚 Study react");
    expect(container).toHaveTextContent("🏀 Play basketball");
    expect(container).toHaveTextContent("🔎 Study biology");
    expect(container).toHaveTextContent("👟 Buy shoes");

    const thirdDeleteButton = getByTestId(container, "todo-2-delete-button");
    act(() => {
      thirdDeleteButton.click();
    });
    await waitFor(() => {
      expect(container).not.toHaveTextContent("📚 Study react");
    });
    const todoInput = getByTestId(container, "add-todo-input");
    fireEvent.change(todoInput, { target: { value: "New To Do Item" } });
    const todoSubmitButton = getByTestId(container, "add-todo-button");
    act(() => {
      todoSubmitButton.click();
    });
    await waitFor(() => {
      expect(container).toHaveTextContent("New To Do Item");
    });
  });
});
