"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Globe, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-[#A5C4D4] transition-all duration-200",
        scrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo_complete.png"
              alt="Logo"
              height={100}
              width={150}
              priority
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-foreground hover:text-muted-foreground transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">To Morocco</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="text-sm bg-[#694A4A] hover:bg-[#594040]">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search and actions */}
        <div className="flex items-center md:hidden">
          {isSearchExpanded ? (
            <div className="absolute inset-x-0 top-0 bg-[#A5C4D4] h-16 flex items-center px-4 z-20">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search ........"
                  className="w-full pl-9 bg-white pr-4"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setIsSearchExpanded(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-[#E6EEF3]">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-6">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">To Morocco</span>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/login"
                        className="flex items-center space-x-2 text-sm font-medium"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full justify-start text-sm bg-[#694A4A] hover:bg-[#594040]">
                          Sign Up
                        </Button>
                      </Link>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm font-medium mb-3">
                        Select Language
                      </div>
                      <div className="grid gap-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                        >
                          <Globe className="h-4 w-4 mr-2" /> English
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                        >
                          <Globe className="h-4 w-4 mr-2" /> Français
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                        >
                          <Globe className="h-4 w-4 mr-2" /> العربية
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
