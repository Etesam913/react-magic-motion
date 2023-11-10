import { describe, beforeAll, vi, test, expect } from "vitest";
import { convertChildrenToMotionChildren } from "../utils/magic-animation";
import { cloneRootElem } from ".";

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

  test("passes initial, animate, and exit to first parent", () => {
    const children = (
      <div>
        <div>first child</div>
        <div>second child</div>
      </div>
    );

    const motionChildren = convertChildrenToMotionChildren(
      children,
      {},
      {
        isRootNode: true,
        rootNodeCallback: (rootElem) => {
          return cloneRootElem(rootElem);
        },
        depth: 1,
      }
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.props.initial).toEqual({ opacity: 0 });
    expect(parentNode.props.animate).toEqual({ opacity: 1 });
    expect(parentNode.props.exit).toEqual({ opacity: 0 });
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);
    expect(child1.props.initial).toBeUndefined();
    expect(child1.props.animate).toBeUndefined();
    expect(child1.props.exit).toBeUndefined();
    expect(child2.props.initial).toBeUndefined();
    expect(child2.props.animate).toBeUndefined();
    expect(child2.props.exit).toBeUndefined();
  });
});
