"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider, createTheme } from "@mui/material";
import FeatureViewProvider from "@/contexts/FeaturesViewContext";
config.autoAddCss = false;

const inter = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "App",
  description: "",
};

const theme = createTheme({
  palette: {
    primary: { main: "#D96262" },
    secondary: { main: "#84A59D", "200": "#D9E3E1" },
  },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FeatureViewProvider>
        <ThemeProvider theme={theme}>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </FeatureViewProvider>
    </html>
  );
}
