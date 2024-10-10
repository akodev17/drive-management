import FolderMode from "@/components/modals/FolderMode";
import Navbar from "@/components/shared/Navbar";
import { Sidebar } from "lucide-react";
import React from "react";
import Home from "./(home)/page";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <FolderMode />
      <Home />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1f1f1f] pr-4">
        <div className="min-h-[90vh] rounded-xl bg-white dark:bg-black p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
