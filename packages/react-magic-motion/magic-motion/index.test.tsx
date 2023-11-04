import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

describe("Accordion test", () => {
  test("Should show title", () => {
    render(<div>test</div>);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
