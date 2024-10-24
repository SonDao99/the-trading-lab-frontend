"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/utils/hooks/useStore";

export default function Navbar() {
  const {
    authStore: { email, name },
  } = useStore();

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <Link href="/strategies" className="text-xl font-bold">
        THE TRADING <span className="text-[#6b27c0]">LAB</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <p className="text-m font-medium leading-none">{name}</p>
              <p className="text-s leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Link href="/user">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link href="/login">
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
