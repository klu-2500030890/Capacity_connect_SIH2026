import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";
import { AppLayoutWrapper } from "@/components/shell/AppLayoutWrapper";

export const metadata: Metadata = {
  title: "Capacity Connect | Digital Capacity Building & Learning Management Portal",
  description:
    "An enterprise digital capacity building platform uniting training delivery, competency framework development (L1-L5), and peer knowledge sharing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#06070b] text-neutral-100 font-sans antialiased">
        <AppStateProvider>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </AppStateProvider>
      </body>
    </html>
  );
}
