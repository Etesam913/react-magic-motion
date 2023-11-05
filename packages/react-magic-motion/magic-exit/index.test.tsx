import "@testing-library/jest-dom";
import { describe, beforeAll, vi, test, expect } from "vitest";

describe("<MagicExit> tests", () => {
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

  test("empty", () => {
    expect(true).toBeTruthy();
  });
});
