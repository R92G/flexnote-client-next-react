"use client";
import React from "react";
import Link from "next/link";
import { Package2, Home, Plus, Settings, FilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import useGlobalWebsiteCount from "@/hooks/useGlobalWebsiteCount";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "./ui/button";
import { PanelLeft } from "lucide-react";

interface NavbarLoggedInProps {
  isWebsiteAdded: boolean;
}

const NavLoggedIn = ({ isWebsiteAdded }: NavbarLoggedInProps) => {
  const { isWebsiteAddedContext } = useGlobalWebsiteCount();

  const segment = useSelectedLayoutSegment();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <div className="flex justify-between flex-col h-full">
          <nav className="flex flex-col items-start gap-4 px-2 sm:py-4 pt-16">
            {/* Conditional rendering based on whether a website is added */}
            {isWebsiteAdded || isWebsiteAddedContext ? (
              <>
                <SheetTrigger asChild>
                  <Link href="/notifications/dashboard" className="group">
                    <div
                      className={`flex items-center gap-2 justify-center rounded-lg p-2 text-accent-foreground transition-colors hover:text-foreground ${
                        segment === "dashboard" ? "bg-accent" : ""
                      }`}
                    >
                      <Home
                        className={`h-5 w-5 ${
                          segment === "dashboard" ? "bg-accent" : ""
                        }`}
                      />
                      Dashboard
                    </div>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/notifications/create" className="group">
                    <div
                      className={`flex items-center gap-2 justify-center rounded-lg p-2 text-accent-foreground transition-colors hover:text-foreground ${
                        segment === "create" ? "bg-accent" : ""
                      }`}
                    >
                      <Plus
                        className={`h-5 w-5 ${
                          segment === "create" ? "bg-accent" : ""
                        }`}
                      />
                      Create Notification
                    </div>
                  </Link>
                </SheetTrigger>
              </>
            ) : null}
            <SheetTrigger asChild>
              <Link href="/notifications/add-website" className="group">
                <div
                  className={`flex items-center gap-2 justify-center rounded-lg p-2 text-accent-foreground transition-colors hover:text-foreground ${
                    segment === "add-website" ? "bg-accent" : ""
                  }`}
                >
                  <FilePlus
                    className={`h-5 w-5 ${
                      segment === "add-website" ? "bg-accent" : ""
                    }`}
                  />
                  Add Website
                </div>
              </Link>
            </SheetTrigger>
          </nav>
          <nav className="mt-auto flex flex-row justify-start items-start gap-4 px-2 sm:py-4">
            <SheetTrigger asChild>
              <Link href="/settings" className="group">
                <div
                  className={`flex items-center gap-2 justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground ${
                    segment === "settings" ? "bg-accent" : ""
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      segment === "settings" ? "bg-accent" : ""
                    }`}
                  />
                  Settings
                </div>
              </Link>
            </SheetTrigger>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavLoggedIn;
