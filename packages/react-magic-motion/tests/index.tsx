import { forwardRef, useRef, cloneElement } from "react";
import type { ReactElement, ReactNode } from "react";

export function TestComponent({
  customText,
  testId,
}: {
  customText: ReactNode;
  testId: string;
}): JSX.Element {
  return <div data-testid={testId}>{customText}</div>;
}

export function ParentComponent(): JSX.Element {
  return <TestComponent customText="test" testId="string-child" />;
}

interface ForwardedRefComponent {
  children?: ReactNode;
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

export function ForwardedRefParent(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null); // Specify the element type

  return (
    <ForwardedRefComponent ref={buttonRef}>Click me!</ForwardedRefComponent>
  );
}

export function cloneRootElem(rootElem: ReactElement): ReactNode {
  return cloneElement(rootElem, {
    ...rootElem.props,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  });
}
