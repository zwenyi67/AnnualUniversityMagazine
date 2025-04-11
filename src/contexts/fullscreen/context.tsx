import { createContext } from "react";
import { FullscreenContextType } from "./type";

// Create context with default value
export const FullscreenContext = createContext<FullscreenContextType>({
  isFullscreen: false,
  setIsFullscreen: () => {},
});
