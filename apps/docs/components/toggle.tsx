import { type Dispatch, type SetStateAction } from "react";
import { MagicMotion } from "react-magic-motion";

export function Toggle({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <button
      onClick={() => setIsActive((prev) => !prev)}
      className="toggle-button"
      type="button"
      style={{
        display: "flex",
        justifyContent: isActive ? "flex-end" : "flex-start",
        alignItems: "center",
        padding: "0.25rem 0.35rem",
        width: "3.5rem",
        borderRadius: "999rem",
      }}
    >
      <MagicMotion transition={{ type: "spring", damping: 14, stiffness: 150 }}>
        <span className="toggle-circle" />
      </MagicMotion>
    </button>
  );
}
