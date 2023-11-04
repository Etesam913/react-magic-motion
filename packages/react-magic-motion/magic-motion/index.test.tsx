import { render, cleanup } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import { convertChildrenToMotionChildren } from "../utils";
import { MagicMotion } from ".";
import { type ReactNode } from "react";

function TestComponent({
  customText,
  testId,
}: {
  customText: ReactNode;
  testId: string;
}) {
  return <div data-testid={testId}>{customText}</div>;
}

function ParentComponent() {
  return <TestComponent customText="test" testId="string-child" />;
}

describe("<MagicMotion> tests", () => {
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

  test("div with two div children", () => {
    const children = (
      <div data-testid="parent-container">
        <div data-testid="child-1">child1</div>
        <div data-testid="child-2">child2</div>
      </div>
    );
    const motionChildren = convertChildrenToMotionChildren(
      children,
      {},
      true
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(parentNode.props.layout === true).toBeTruthy();
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    // Checks if child 1 is a motion component
    expect(child1.type.render.name === "MotionComponent").toBeTruthy();
    expect(child1.props.layout === "position").toBeTruthy();
    expect(child1.props.children[0] === "child1").toBeTruthy();

    // Checks if child 2 is a motion component
    expect(child2.type.render.name === "MotionComponent").toBeTruthy();
    expect(child2.props.layout === "position").toBeTruthy();
    expect(child2.props.children[0] === "child2").toBeTruthy();

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(getByTestId("parent-container")).toBeInTheDocument();
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
  });

  test("div with two 1 div child and 1 div child with key='exclude'", () => {
    const children = (
      <div data-testid="parent-container">
        <div data-testid="child-1">child1</div>
        <div data-testid="child-2" key="exclude">
          child2
        </div>
      </div>
    );
    const motionChildren = convertChildrenToMotionChildren(
      children,
      {},
      true
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(parentNode.props.layout === true).toBeTruthy();
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    // Check if child 1 is a motion component
    expect(child1.type.render.name === "MotionComponent").toBeTruthy();
    expect(child1.props.layout === "position").toBeTruthy();
    expect(child1.props.children[0] === "child1").toBeTruthy();

    // Check if child 2 is not a motion component as it is excluded
    expect(child2.type === "div").toBeTruthy();
    expect(child2.props.layout === undefined).toBeTruthy();
    expect(child2.props.children === "child2").toBeTruthy();

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(getByTestId("parent-container")).toBeInTheDocument();
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
  });

  test("custom component with a div inside of it", () => {
    const children1 = (
      <TestComponent
        testId="string-child"
        customText={"This is a string child"}
      />
    );
    const children2 = (
      <TestComponent
        testId="div-child"
        customText={<div>This is a div child</div>}
      />
    );
    const motionChildren1 = convertChildrenToMotionChildren(
      children1,
      {},
      true
    ) as any[];
    let parentNode = motionChildren1.at(0);
    let childNode = parentNode.props.children.at(0);
    expect(motionChildren1).toBeDefined();
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(childNode === "This is a string child").toBeTruthy();

    const motionChildren2 = convertChildrenToMotionChildren(
      children2,
      {},
      true
    ) as any[];
    parentNode = motionChildren2.at(0);
    childNode = parentNode.props.children.at(0);
    expect(motionChildren2).toBeDefined();
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(childNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(
      childNode.props.children.at(0) === "This is a div child"
    ).toBeTruthy();
    expect(childNode.props.layout === "position").toBeTruthy();

    const { getByTestId: getByTestId1 } = render(
      <MagicMotion>{children1}</MagicMotion>
    );
    expect(getByTestId1("string-child")).toBeInTheDocument();
    const { getByTestId: getByTestId2 } = render(
      <MagicMotion>{children2}</MagicMotion>
    );
    expect(getByTestId2("div-child")).toBeInTheDocument();
  });

  test("custom component that renders a custom component", () => {
    const children = <ParentComponent />;
    const motionChildren = convertChildrenToMotionChildren(
      children,
      {},
      true
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(parentNode.type.render.name === "MotionComponent").toBeTruthy();
    expect(parentNode.props.children.at(0) === "test").toBeTruthy();
    expect(parentNode.props.layout === "position").toBeTruthy();
    expect(getByTestId("string-child")).toBeInTheDocument();
  });

  test("a nested <MagicMotion>", () => {});
});
