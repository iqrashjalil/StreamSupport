import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.users);

  return (
    <nav className="sticky font-rajdhani font-bold  text-white top-0 z-50 w-full border-border/40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 p-4">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-redMain">
          <img className="h-8" src={logo} alt="" />
        </div>

        <div className="block lg:hidden">
          <Sheet
            className="font-bold border-none font-rajdhani"
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
            <SheetContent className="font-bold bg-black font-rajdhani">
              <SheetHeader>
                <SheetTitle className="flex justify-center text-redMain">
                  <img className="h-8" src={logo} alt="" />
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <ul className="space-y-4">
                <li>
                  <NavLink
                    to={"/"}
                    className="block text-white transition-all duration-150 hover:text-redMain"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/about"}
                    className="block text-white transition-all duration-150 hover:text-redMain"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/contact"}
                    className="block text-white transition-all duration-150 hover:text-redMain"
                  >
                    Contact
                  </NavLink>
                </li>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate("/login")}
                    className="bg-transparent text-redMain hover:border-redMain hover:text-neutral-50 hover:bg-redMain"
                    variant="secondary"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="secondary"
                  >
                    Register
                  </Button>
                </div>{" "}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:space-x-8 lg:items-center">
          <NavLink
            to={"/"}
            className="block text-white transition-all duration-150 hover:text-redMain lg:inline-block nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className="block text-white transition-all duration-150 hover:text-redMain lg:inline-block nav-link"
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className="block text-white transition-all duration-150 hover:text-redMain lg:inline-block nav-link"
          >
            Contact
          </NavLink>
          {isAuthenticated ? (
            <div>
              {" "}
              <Button
                onClick={() => navigate("/login")}
                className="bg-transparent text-redMain hover:border-redMain hover:text-neutral-50 hover:bg-redMain"
                variant="secondary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/login")}
                className="bg-transparent text-redMain hover:border-redMain hover:text-neutral-50 hover:bg-redMain"
                variant="secondary"
              >
                Login
              </Button>
              <Button onClick={() => navigate("/register")} variant="secondary">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
