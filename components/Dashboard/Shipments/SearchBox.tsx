"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchBox() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <div>
      <div className="absolute left-0 right-0 top-full px-4 py-3 border-b md:relative md:top-0 md:flex-1 md:px-4 md:py-0 md:border-0 transition-all duration-200">
        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full pl-9 bg-white pr-4"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      {/* Mobile search trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden ml-auto mr-2"
        onClick={() => setIsSearchFocused(!isSearchFocused)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
  
}

export default SearchBox;
