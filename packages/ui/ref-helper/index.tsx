import { ForwardedRef, useEffect } from "react";

export function RefHelper({
  children,
  test,
}: {
  children: JSX.Element;
  test: any;
}) {
  useEffect(() => {
    console.log("good", test);
  }, [test]);

  return <span>{children}</span>;
}
