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
import { siteMetadata } from "@/lib/siteMetadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteMetadata.title,
    template: "%s | Simplify Engagement",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    description: siteMetadata.description,
    site: siteMetadata.title,
  },
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
