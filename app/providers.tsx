"use client";

import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "brand",
  colors: {
    // Brand base: rgb(44, 21, 150) -> #2c1596
    // Mantine expects 10 shades from light (0) to dark (9)
    brand: [
      "#f3f1ff",
      "#e6e2ff",
      "#cdc7ff",
      "#b1a7ff",
      "#9688ff",
      "#806fff",
      "#725fff",
      "#5e49ff",
      "#4b34ff",
      "#2c1596",
    ],
  },
  defaultRadius: "md",
  fontFamily: "var(--font-outfit), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

