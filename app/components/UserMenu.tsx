"use client";

import { FaRegUser } from "react-icons/fa";
import { Button } from "./ui/button";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutButton } from "./ui/LogoutButton";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser: any;
}

export function UserMenu({ currentUser }: UserMenuProps) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <FaRegUser className="h-[1.2rem] w-[1.2rem] dark:text-white text-accent-foreground" />

          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currentUser && (
          <>
            <DropdownMenuItem
              onClick={() => {
                router.push("/notifications/dashboard");
              }}
            >
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Upgrades</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Contact</DropdownMenuItem>
            <hr />

            <LogoutButton>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </LogoutButton>
          </>
        )}

        {!currentUser && (
          <>
            <DropdownMenuItem onClick={() => loginModal.onOpen()}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => registerModal.onOpen()}>
              Register
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
