import { useEffect, useState } from "react";
import type { RefObject } from "react";
/**
 *
 * Attaches a resize observer to the root node of the card to get the dimensions of the card.
 * These dimensions are used in the placeholder box to prevent layout shift when the
 * card is expanded.
 */
export function usePlaceholderBoxSize(
  isCardExpanded: boolean,
  rootNode: RefObject<HTMLElement>,
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
