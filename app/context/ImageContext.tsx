"use client";

import { createContext, useContext, ReactNode } from "react";

interface ImageContextType {
  avatarPath: string;
  cardImagePath: string;
}

const ImageContext = createContext<ImageContextType>({
  avatarPath: "/images/avatar.jpg",
  cardImagePath: "/images/rain.jpg",
});

export const useImages = () => useContext(ImageContext);

export function ImageProvider({ children }: { children: ReactNode }) {
  const value = {
    avatarPath: "/images/avatar.jpg",
    cardImagePath: "/images/rain.jpg",
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}
