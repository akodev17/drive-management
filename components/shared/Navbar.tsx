import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/Images/pngwing.com.png";
import { ModeToggle } from "./ModeToggle";
import { HelpCircle, Settings } from "lucide-react";
import UserBox from "./UserBox";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="container">
      <div className="h-[10vh] flex justify-between items-center fixed left-0 top-0 right-0 z-30 bg-[#f6f9fc] dark:bg-[#1f1f1f] border-b">
        <Link href={"/"} className="flex justify-center items-center my-4 mx-6">
          <Image src={logo} alt="Logo" width={"50"} height={"50"} />
          <span className="pl-2 text-[22px] opacity-75">Drive</span>
        </Link>
        <div className="my-4 mx-6">
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <div
              className="p-2 hover:bg-secondary rounded-full transition"
              role="button"
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div
              className="p-2 hover:bg-secondary rounded-full transition"
              role="button"
            >
              <Settings className="w-5 h-5" />
            </div>
            {userId ? (
              <UserBox />
            ) : (
              <Avatar className="cursor-pointer flex justify-center items-center border dark:border-cyan-800">
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
