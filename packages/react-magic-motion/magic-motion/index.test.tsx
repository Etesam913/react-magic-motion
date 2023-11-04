import { render } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import {
  convertChildrenToMotionChildren,
  getLayoutValueFromChildren,
} from "../utils";
import { MagicMotion } from ".";

describe("<MagicMotion> tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
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
  test("Simple example with two children", () => {
    const children = (
      <div data-testid="parent-container">
        <div data-testid="child-1">child1</div>
        <div data-testid="child-2">child2</div>
      </div>
    );
    const motionChildren = convertChildrenToMotionChildren(
      children,
      (child) => {
        return {
          layout: getLayoutValueFromChildren(child),
        };
      }
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(parentNode.props.layout === true).toBeTruthy();
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    expect(child1.type.render.name === "MotionComponent").toBeTruthy();
    expect(child1.props.layout === "position").toBeTruthy();
    expect(child1.props.children[0] === "child1").toBeTruthy();
    expect(child2.type.render.name === "MotionComponent").toBeTruthy();
    expect(child2.props.layout === "position").toBeTruthy();
    expect(child2.props.children[0] === "child2").toBeTruthy();

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(getByTestId("parent-container")).toBeInTheDocument();
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
  });
});
