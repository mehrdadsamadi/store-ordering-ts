"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { DirectionProvider } from "@radix-ui/react-direction";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <DirectionProvider dir="rtl">
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </DirectionProvider>
  )
}