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
import { MagicMotion } from "../../../packages/react-magic-motion/magic-motion";
import { Accordion } from "../components/accordion";
import { Search } from "../components/search";

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

  test("accordion component", async () => {
    const { container } = render(
      <MagicMotion>
        <Accordion />
      </MagicMotion>
    );
    expect(container).toHaveTextContent("Click me to see my content");
    expect(container).not.toHaveTextContent(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida lobortis sem, vel blandit dolor ultrices nec. Donec dapibus tellus ut libero sagittis, a pharetra eros placerat. Aliquam erat volutpat. Nunc nec nisl ac turpis semper pharetra. Nullam pulvinar pellentesque mauris, sit amet tincidunt nisl convallis id."
    );

    const accordionButton = getByTestId(container, "accordion-button");
    act(() => {
      accordionButton.click();
    });
    await waitFor(() => {
      expect(container).toHaveTextContent(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida lobortis sem, vel blandit dolor ultrices nec. Donec dapibus tellus ut libero sagittis, a pharetra eros placerat. Aliquam erat volutpat. Nunc nec nisl ac turpis semper pharetra. Nullam pulvinar pellentesque mauris, sit amet tincidunt nisl convallis id."
      );
    });
  });
  test("search component", async () => {
    const { container } = render(
      <MagicMotion>
        <Search />
      </MagicMotion>
    );
    expect(container).toHaveTextContent("Dune");
    expect(container).toHaveTextContent("Foundation");
    expect(container).toHaveTextContent("Gone Girl");
    const searchInput = getByTestId(container, "search-input");
    fireEvent.change(searchInput, { target: { value: "Dune" } });
    await waitFor(() => {
      expect(container).toHaveTextContent("Dune");
      expect(container).not.toHaveTextContent("Foundation");
      expect(container).not.toHaveTextContent("Gone Girl");
    });
  });
});
