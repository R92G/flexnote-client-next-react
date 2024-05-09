"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { LogoIcon } from "./Icons";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { UserMenu } from "./UserMenu";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#testimonials",
    label: "Testimonials",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

interface NavbarProps {
  currentUser: any;
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const openModal = () => {
    loginModal.onOpen();
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex">
              Flexnote
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex gap-2 md:hidden">
            <UserMenu currentUser={currentUser} />
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2" onClick={handleMenuClick}>
                <CiMenuFries className="flex md:hidden h-5 w-5">
                  <span className="sr-only">Menu Icon</span>
                </CiMenuFries>
              </SheetTrigger>

              <SheetContent side={"left"} className="w-full">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps, i) => (
                    <Link
                      key={i}
                      href={`${href}`}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map(({ href, label }: RouteProps, i) => (
              <Link
                key={i}
                href={href}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <UserMenu currentUser={currentUser} />
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
