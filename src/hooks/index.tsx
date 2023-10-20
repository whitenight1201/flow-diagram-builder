import { useState } from "react";

// Make a custom hook with future shared state
export const useGlobalState = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  return {
    zoomLevel,
    setZoomLevel,
  };
};
