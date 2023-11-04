import { useState } from "react";
import { MagicMotion, MagicExit } from "react-magic-motion";

export function AccordionWithExitAnim(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MagicMotion>
      <div
        className="nx-bg-black/[.05] dark:nx-bg-gray-50/10"
        style={{
          padding: "1rem",
          borderRadius: 12,
          margin: "1rem 0",
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          style={{
            fontSize: "1.1em",
            fontWeight: 500,
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Click me to see my content
          <svg
            key="exclude"
            style={{
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
              transition: "320ms ease-in-out",
            }}
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 10L15.6714 21L27.5 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <MagicExit
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { y: { type: "spring", damping: 12, stiffness: 120 } },
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: {
              opacity: { duration: 0.175 },
              y: { duration: 0.25 },
            },
          }}
        >
          {isOpen && (
            <div
              style={{
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
              }}
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida lobortis sem, vel blandit dolor ultrices nec. Donec
                dapibus tellus ut libero sagittis, a pharetra eros placerat.
                Aliquam erat volutpat. Nunc nec nisl ac turpis semper pharetra.
                Nullam pulvinar pellentesque mauris, sit amet tincidunt nisl
                convallis id.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida lobortis sem, vel blandit dolor ultrices nec. Donec
                dapibus tellus ut libero sagittis, a pharetra eros placerat.
                Aliquam erat volutpat. Nunc nec nisl ac turpis semper pharetra.
                Nullam pulvinar pellentesque mauris, sit amet tincidunt nisl
                convallis id.
              </div>
            </div>
          )}
        </MagicExit>
      </div>
    </MagicMotion>
  );
}
