import { type ReactNode, forwardRef, useRef } from "react";

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

export function ForwardedRefParent(): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null); // Specify the element type

  return (
    <ForwardedRefComponent ref={buttonRef}>Click me!</ForwardedRefComponent>
  );
}
