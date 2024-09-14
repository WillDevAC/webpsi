import type { Metadata } from "next";

import "@/globals.css";

import { Session } from "next-auth";

import { AppProvider } from "@/providers/app-provider";

export const metadata: Metadata = {
  title: "WEB PSI",
  description: "Seu criador de sites inteligente.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AppProvider session={session}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
