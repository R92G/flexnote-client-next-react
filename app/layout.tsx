import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import LoginModal from "./components/modals/LoginModal";
import "./globals.css";
import RegisterModal from "./components/modals/RegisterModal";
import { auth } from "@/auth";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import NotifyScript from "./components/NotifyScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notify - A notification service ",
  description: "Notify is a notification service for developers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const currentUser = session?.user;

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
            <Toaster />
            {children}
          </ThemeProvider>
          <NotifyScript />
        </body>
      </html>
    </SessionProvider>
  );
}
