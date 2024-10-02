import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Bem vindo a pagina de login da empresa Arp Dev solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
