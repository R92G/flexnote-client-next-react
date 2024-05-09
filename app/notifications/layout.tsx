import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Users2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import Sidebar from "./components/sidebar";
import { getWebsitesByUserId } from "@/actions/websites/getWebsitesByUserId";
import { currentUser } from "@/lib/auth";
import NavLoggedIn from "../components/NavLoggedIn";
import { Navbar } from "../components/Navbar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const isWebsiteAdded =
    (await getWebsitesByUserId(user?.id as string)).length > 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-[56px] z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <NavLoggedIn isWebsiteAdded={isWebsiteAdded} />
      </header>
      <Sidebar isWebsiteAdded={isWebsiteAdded} />
      {children}
    </div>
  );
}
