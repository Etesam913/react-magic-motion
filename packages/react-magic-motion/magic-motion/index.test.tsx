import { render } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { convertChildrenToMotionChildren } from "../utils/magic-animation";
import { MagicExit } from "../magic-exit";
import { MagicMotion } from ".";

function TestComponent({
  customText,
  testId,
}: {
  customText: ReactNode;
  testId: string;
}): JSX.Element {
  return <div data-testid={testId}>{customText}</div>;
}

function ParentComponent(): JSX.Element {
  return <TestComponent customText="test" testId="string-child" />;
}

interface ForwardedRefComponent {
  children?: React.ReactNode;
}

const ForwardedRefComponent = forwardRef<
  HTMLButtonElement,
  ForwardedRefComponent
>((props, ref) => {
  return (
    <button type="button" ref={ref} className="FancyButton">
      {props.children}
    </button>
  );
});

ForwardedRefComponent.displayName = "ForwardedRefComponent";

function ForwardedRefParent(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null); // Specify the element type

  return (
    <ForwardedRefComponent ref={buttonRef}>Click me!</ForwardedRefComponent>
  );
}

describe("<MagicMotion> tests", () => {
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);
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

  afterEach(() => {
    consoleMock.mockReset();
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
      { transition: { layout: { bounce: 0.35 } } },
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(parentNode.props.layout).toEqual(true);
    expect(parentNode.props.transition).toBeDefined();
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    // Checks if child 1 is a motion component
    expect(child1.type.render.name).toEqual("MotionComponent");
    expect(child1.props.layout).toEqual("position");
    expect(child1.props.children[0]).toEqual("child1");
    expect(child1.props.transition).toBeDefined();

    // Checks if child 2 is a motion component
    expect(child2.type.render.name).toEqual("MotionComponent");
    expect(child2.props.layout).toEqual("position");
    expect(child2.props.children[0]).toEqual("child2");
    expect(child2.props.transition).toBeDefined();

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
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];

    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "👆 Above element is excluded from being animated"
    );

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(parentNode.props.layout).toEqual(true);
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    // Check if child 1 is a motion component
    expect(child1.type.render.name).toEqual("MotionComponent");
    expect(child1.props.layout).toEqual("position");
    expect(child1.props.children[0]).toEqual("child1");

    // Check if child 2 is not a motion component as it is excluded
    expect(child2.type).toEqual("div");
    expect(child2.props.layout).toBeUndefined();
    expect(child2.props.children).toEqual("child2");

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(getByTestId("parent-container")).toBeInTheDocument();
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
  });

  test("div with two 1 div child and 1 motion.div child ", () => {
    const children = (
      <div data-testid="parent-container">
        <div data-testid="child-1">child1</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="child-2"
        >
          child2
        </motion.div>
      </div>
    );
    const motionChildren = convertChildrenToMotionChildren(
      children,
      {},
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);
    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(parentNode.props.layout).toEqual(true);
    const child1 = parentNode.props.children.at(0);
    const child2 = parentNode.props.children.at(1);

    // Check if child 1 is a motion component
    expect(child1.type.render.name).toEqual("MotionComponent");
    expect(child1.props.layout).toEqual("position");
    expect(child1.props.children[0]).toEqual("child1");

    // Check if child 2 is a motion component even when manually defined as so
    expect(child2.type.render.name).toEqual("MotionComponent");
    expect(child2.props.layout).toEqual("position");
    expect(child2.props.initial).toEqual({ opacity: 0 });
    expect(child2.props.animate).toEqual({ opacity: 1 });
    expect(child2.props.children.at(0)).toEqual("child2");

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);
    expect(getByTestId("parent-container")).toBeInTheDocument();
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
  });

  test("custom component with a div inside of it", () => {
    const children1 = (
      <TestComponent
        testId="string-child"
        customText="This is a string child"
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
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];
    let parentNode = motionChildren1.at(0);
    let childNode = parentNode.props.children.at(0);
    expect(motionChildren1).toBeDefined();
    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(childNode).toEqual("This is a string child");

    const motionChildren2 = convertChildrenToMotionChildren(
      children2,
      {},
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];
    parentNode = motionChildren2.at(0);
    childNode = parentNode.props.children.at(0);

    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: TestComponent"
    );

    expect(motionChildren2).toBeDefined();
    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(childNode.type.render.name).toEqual("MotionComponent");
    expect(childNode.props.children.at(0)).toEqual("This is a div child");
    expect(childNode.props.layout).toEqual("position");

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
      { isRootNode: true, depth: 1, isLoggingEnabled: true }
    ) as any[];

    expect(motionChildren).toBeDefined();
    const parentNode = motionChildren.at(0);

    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: ParentComponent"
    );

    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: TestComponent"
    );

    const { getByTestId } = render(<MagicMotion>{children}</MagicMotion>);

    expect(parentNode.type.render.name).toEqual("MotionComponent");
    expect(parentNode.props.children.at(0)).toEqual("test");
    expect(parentNode.props.layout).toEqual("position");
    expect(getByTestId("string-child")).toBeInTheDocument();
  });

  test("a nested <MagicMotion>", () => {
    const children = (
      <MagicMotion>
        <div data-testid="div-parent" id="div-parent">
          element
        </div>
      </MagicMotion>
    );
    const { getByTestId } = render(
      <MagicMotion isLoggingEnabled>{children}</MagicMotion>
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: MagicMotion"
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "Forbidden element encountered: MagicMotion \nStopping traversal!"
    );

    expect(getByTestId("div-parent")).toBeInTheDocument();
  });

  test("a nested <MagicMotion>", () => {
    const children = (
      <MagicMotion>
        <div data-testid="div-parent" id="div-parent">
          element
        </div>
      </MagicMotion>
    );
    const { getByTestId } = render(
      <MagicMotion isLoggingEnabled>{children}</MagicMotion>
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: MagicMotion"
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "Forbidden element encountered: MagicMotion \nStopping traversal!"
    );

    expect(getByTestId("div-parent")).toBeInTheDocument();
  });

  test("a nested <MagicExit>", () => {
    const children = (
      <MagicExit>
        <div data-testid="div-parent" id="div-parent">
          element
        </div>
      </MagicExit>
    );
    const { getByTestId } = render(
      <MagicMotion isLoggingEnabled>{children}</MagicMotion>
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cSuccess: %s",
      "color: green; font-weight: bold;",
      "Function component encountered: MagicExit"
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "Forbidden element encountered: MagicExit \nStopping traversal!"
    );

    expect(getByTestId("div-parent")).toBeInTheDocument();
  });

  test("the disabled property", () => {
    render(
      <MagicMotion disabled isLoggingEnabled>
        <div>
          <div>this is some text</div>
          <div>this is some other text</div>
        </div>
      </MagicMotion>
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "MagicMotion is disabled as disabled='true'"
    );
  });
  test("the prefers-reduced-motion accessibility property", () => {
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

    render(
      <MagicMotion isLoggingEnabled>
        <div>
          <div>this is some text</div>
          <div>this is some other text</div>
        </div>
      </MagicMotion>
    );
    expect(consoleMock).toHaveBeenCalledWith(
      "%cWarning: %s",
      "color: darkorange; font-weight: bold;",
      "MagicMotion is disabled as prefers-reduced-motion is set to 'reduce'"
    );
  });

  test("a forwardRef child", () => {
    render(
      <MagicMotion>
        <ForwardedRefParent />
      </MagicMotion>
    );
  });
});
