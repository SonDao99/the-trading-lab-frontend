"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "@/api/users";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function Navbar() {

  const handleLogout = async () => {
    const response = await fetch('http://localhost:8080/logout');

    if (response.ok) {
      window.location.href = 'http://localhost:3000/login';
    } else {
      console.error('Logout failed:', response.statusText);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("Oisin");
  const [lastName, setLastName] = useState("Dermody");
  const [email, setEmail] = useState("oisindermody@gmail.com");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>();

  //useEffect(() => {
    //try {
    //  const fetchUserInfo = async () => {
     //   const res = await getUserInfo("113053702607165718413");
    //    setFirstName(res.firstName);
    //    setLastName(res.lastName);
    //    setEmail(res.email);
    //  };

   //   fetchUserInfo();
   // } catch (error) {
   //   console.log(error);
   // }
  // }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const updateName = async () => {
        const res = await updateUserInfo(
          "113053702607165718413",
          firstName,
          lastName
        );
      };
      updateName();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setDialogOpen(false);
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
              <p className="text-m font-medium leading-none">
                {firstName} {lastName}
              </p>
              <p className="text-s leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Edit name
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
          </DialogHeader>
          <DialogDescription>Change your first and last name</DialogDescription>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First name
                </Label>
                <Input
                  id="firstName"
                  className="col-span-3"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  className="col-span-3"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button disabled>Loading...</Button>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
