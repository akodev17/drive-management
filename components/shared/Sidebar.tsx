import React from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Item from "./Item";
import { Progress } from "../ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopoverActions from "./PopoverActions";

const Sidebar = () => {
  return (
    <div className="h-[90vh] top-[10vh] fixed left-0 z-30 w-72 bg-[#f6f9fc] dark:bg-[#1f1f1f] border-r">
      <div className="flex flex-col p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit h-12 rounded-full px-6">
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 py-2">
            <PopoverActions></PopoverActions>
          </PopoverContent>
        </Popover>

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks &&
            sidebarLinks.map((link) => (
              <Link href={link.path} key={link.path}>
                <Item icon={link.icon} label={link.label} />
              </Link>
            ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={70} />
            <span>20 MB of 1.5 GB used</span>

            <Button className="rounded-full inline-block" variant={"outline"}>
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
const sidebarLinks = [
  {
    label: "My drive",
    icon: Tablet,
    path: "/",
  },
  {
    label: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    label: "Recent",
    icon: Clock5,
    path: "/recent",
  },
  {
    label: "Trash",
    icon: Trash,
    path: "/trash",
  },
  {
    label: "Storage",
    icon: Cloud,
    path: "/cloud",
  },
];
