"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/public/world.svg";
import Image from "next/image";
import { LuAlignCenter } from "react-icons/lu";
import Link from "next/link";
import {Rethink_Sans} from "next/font/google"

const rethink_sans = Rethink_Sans({subsets: ['latin'], weight: ["700"], style: ["italic"]})
const Navbar = () => {
  const [search, setSearch] = React.useState("");
  return (
    <header className="flex justify-between items-center  w-full h-[90px] bg-gray-100 p-16 gap-16">
      {/* Logo */}
<nav className={rethink_sans.className}>
  Twitter trends
</nav>
      {/* Middle Search Bar */}

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LuAlignCenter size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/"> Home </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>About Us</DropdownMenuItem>
            <DropdownMenuItem>Contact Us</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/privacy-policy"> Privacy Policy </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Disclaimer</DropdownMenuItem>
            <DropdownMenuItem>Terms &amp; conditions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
