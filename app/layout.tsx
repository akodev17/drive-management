import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "./providers/theme-provider";
import Sidebar from "@/components/shared/Sidebar";
import ModalProvider from "./providers/modal-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="mt-0">
                <UserButton />
              </div>
            </SignedIn>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <Sidebar />
              <ModalProvider />
              <Toaster position="top-center" />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
