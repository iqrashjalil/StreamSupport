import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky font-rajdhani font-bold  text-white top-0 z-50 w-full border-border/40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-redMain font-bold">
          <img className="h-8" src={logo} alt="" />
        </div>

        <div className="block lg:hidden">
          <Sheet
            className="border-none font-rajdhani font-bold"
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SheetTrigger asChild>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-redMain focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                    }
                  ></path>
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent className="font-rajdhani font-bold bg-black">
              <SheetHeader>
                <SheetTitle className="flex justify-center text-redMain">
                  <img className="h-8" src={logo} alt="" />
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <ul className="space-y-4">
                <li>
                  <NavLink
                    href="#home"
                    className="text-white  hover:text-redMain transition-all duration-150 block"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="#about"
                    className="text-white hover:text-redMain transition-all duration-150 block"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="#services"
                    className="text-white hover:text-redMain transition-all duration-150 block"
                  >
                    Contact
                  </NavLink>
                </li>
                <div className="flex gap-2">
                  <Button
                    className="bg-transparent text-redMain hover:border-redMain hover:text-neutral-50 hover:bg-redMain"
                    variant="secondary"
                  >
                    Login
                  </Button>
                  <Button variant="secondary">Register</Button>
                </div>{" "}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:space-x-8 lg:items-center">
          <NavLink
            to={"/"}
            className="text-white hover:text-redMain transition-all duration-150 block lg:inline-block nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to={""}
            className="text-white hover:text-redMain transition-all duration-150 block lg:inline-block nav-link"
          >
            About
          </NavLink>
          <NavLink
            to={""}
            className="text-white hover:text-redMain transition-all duration-150 block lg:inline-block nav-link"
          >
            Contact
          </NavLink>
          <div className="flex gap-2">
            <Button
              className="bg-transparent text-redMain hover:border-redMain hover:text-neutral-50 hover:bg-redMain"
              variant="secondary"
            >
              Login
            </Button>
            <Button variant="secondary">Register</Button>
          </div>{" "}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
