import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { logWarning } from "./utils/logging";

const PREFERSREDUCEDMOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Attaches a resize observer to the root node of the card to get the dimensions of the card.
 * These dimensions are used in the placeholder box to prevent layout shift when the
 * card is expanded.
 */
export function usePlaceholderBoxSize(
  isCardExpanded: boolean,
  rootNode: RefObject<HTMLElement>
): { placeholderBoxHeight: number; placeholderBoxWidth: number } {
  const [placeholderBoxDimensions, setPlaceholderBoxDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!isCardExpanded && rootNode.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const dimensions = {
          width: entries[0].borderBoxSize[0].inlineSize,
          height: entries[0].borderBoxSize[0].blockSize,
        };

        setPlaceholderBoxDimensions({
          width: dimensions.width,
          height: dimensions.height,
        });
      });

      resizeObserver.observe(rootNode.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isCardExpanded, rootNode]);

  return {
    placeholderBoxHeight: placeholderBoxDimensions.height,
    placeholderBoxWidth: placeholderBoxDimensions.width,
  };
}

/**
 * Updates the `prefersReducedMotion` state whenever
 * the `prefers-reduced-motion:reduce` option is set
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(PREFERSREDUCEDMOTION);
    setPrefersReducedMotion(!mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
}

/**
 * When logging is enabled this hook will output messages to
 * stdout that tell the user if a component is disabled or has
 * prefers-reduced-motion set to 'reduce'
 */
export function useComponentInactiveLogging(
  componentName: string,
  disabled?: boolean,
  isMotionReduced?: boolean,
  isLoggingEnabled?: boolean
): void {
  useEffect(() => {
    if (isLoggingEnabled && disabled)
      logWarning(`${componentName} is disabled as disabled='true'`);
  }, [disabled, isLoggingEnabled, componentName]);

  useEffect(() => {
    if (isLoggingEnabled && isMotionReduced)
      logWarning(
        `${componentName} is disabled as prefers-reduced-motion is set to 'reduce'`
      );
  }, [isMotionReduced, isLoggingEnabled, componentName]);
}
