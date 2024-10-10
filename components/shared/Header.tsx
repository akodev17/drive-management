import React from "react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import PopoverActions from "./PopoverActions";

interface HomeProps {
  label: string;
  isHome: boolean;
}

const Header = ({ label, isHome }: HomeProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <>
          <Popover>
            <PopoverTrigger className="flex justify-start">
              <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
                <h2 className="text-xl">{label}</h2>
                <ChevronDown></ChevronDown>
              </div>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-2">
              <PopoverActions></PopoverActions>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
