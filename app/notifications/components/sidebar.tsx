"use client";
import React from "react";
import Link from "next/link";
import { Package2, Home, Plus, Settings, FilePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import useGlobalWebsiteCount from "@/hooks/useGlobalWebsiteCount";

interface SidebarProps {
  isWebsiteAdded: boolean;
}

const Sidebar = ({ isWebsiteAdded }: SidebarProps) => {
  const { isWebsiteAddedContext } = useGlobalWebsiteCount();

  const segment = useSelectedLayoutSegment();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Notification Service</span>
        </Link>
        {/* check if isWebsiteAdded or isWebsiteAddedContext */}
        {isWebsiteAdded || isWebsiteAddedContext ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/notifications/dashboard"
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                      segment === "dashboard" ? "bg-accent" : ""
                    )}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/notifications/create"
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                      segment === "create" ? "bg-accent" : ""
                    )}
                  >
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Create Notification</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Create Notification
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/notifications/add-website"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  segment === "add-website" ? "bg-accent" : ""
                )}
              >
                <FilePlus className="h-5 w-5" />
                <span className="sr-only">Add Website</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Add Website</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={
                  (cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  ),
                  segment === "settings" ? "bg-accent" : "")
                }
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
