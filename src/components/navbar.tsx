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

export default function Navbar() {

  const handleLogout = async () => {
    const response = await fetch('http://localhost:8080/logout');

    if (response.ok) {
      window.location.href = 'http://localhost:3000/login';
    } else {
      console.error('Logout failed:', response.statusText);
    }
  };

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
              <p className="text-m font-medium leading-none">Mike Hunt</p>
              <p className="text-s leading-none text-muted-foreground">
                mhunt@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Link href="/user">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
