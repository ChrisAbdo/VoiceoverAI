import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import NavLinks from "./nav-links";

export default function MainNav() {
  return (
    <header className="sticky top-0 z-50 supports-backdrop-blur:bg-background/80 backdrop-blur">
      <nav
        className="flex items-center justify-between py-3 px-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">VoiceoverAI</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {/* <Menu className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <NavLinks />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
