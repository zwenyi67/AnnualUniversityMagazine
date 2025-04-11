import { ReactNode, useState } from "react";
import { FullscreenContext } from "./context";

// Define props interface for provider
interface FullscreenProviderProps {
  children: ReactNode;
}

// Create provider component
export const FullscreenProvider = ({ children }: FullscreenProviderProps) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};
