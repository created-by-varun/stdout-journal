import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  logoText?: string;
  navItems?: Array<{ label: string; href: string }>;
  onNavItemClick?: (href: string) => boolean;
}

const Header = ({
  logoText = "Stdout Journal",
  navItems = [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  onNavItemClick,
}: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Check if viewport is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <header className="bg-black text-green-500 border-b border-green-500/30 p-4 font-mono sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            {logoText}
            <span
              className={`ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            >
              _
            </span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-green-300 transition-colors duration-200 relative group"
                onClick={(e) => {
                  if (onNavItemClick && onNavItemClick(item.href)) {
                    e.preventDefault();
                  }
                }}
              >
                <span className="opacity-0 absolute -left-4 group-hover:opacity-100 transition-opacity">
                  &gt;
                </span>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:text-green-300 hover:bg-green-900/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black border-green-500/30 text-green-500 font-mono"
            >
              {navItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="hover:text-green-300 hover:bg-green-900/20"
                >
                  <a
                    href={item.href}
                    className="w-full"
                    onClick={(e) => {
                      if (onNavItemClick && onNavItemClick(item.href)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    &gt; {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
