import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  resetSuccess,
  toggleSidebar,
} from "../store/slices/Users_Slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { serverUrl } from "../serverUrl";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, success, user, loading } = useSelector(
    (state) => state.users
  );

  // You can define paths where the hamburger icon should be visible (e.g., on dashboard pages)
  const isDashboardPage =
    location.pathname.startsWith("/streamerdashboard") ||
    location.pathname.startsWith("/editprofile") ||
    location.pathname === "/wallet" ||
    location.pathname === "/alertsettings" ||
    location.pathname === "/audioalertsettings";

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useEffect(() => {
    if (success === true) {
      dispatch(resetSuccess());
    }
  }, [dispatch, success]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {" "}
          <nav className="sticky font-rajdhani font-bold  text-white top-0 z-50 w-full border-border/40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 p-4">
            <div className="container flex items-center justify-between mx-auto">
              <div className="flex items-center gap-2 font-bold text-redMain">
                {isDashboardPage && (
                  <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="flex lg:hidden text-neutral-50 focus:outline-none"
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
                          isOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16m-7 6h7"
                        }
                      ></path>
                    </svg>
                  </button>
                )}

                <img className="h-8" src={logo} alt="" />
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    {user && (
                      <div className="flex items-center gap-1 cursor-pointer group">
                        <div className="relative">
                          <LazyLoadImage
                            className="w-8 h-8 rounded-full "
                            src={`${serverUrl}/${user?.profilePic}`}
                          />
                          <div className="absolute inset-0 transition-all duration-200 bg-black rounded-full opacity-0 group-hover:opacity-50"></div>
                        </div>
                        <BiSolidDownArrow className="transition-all duration-200 group-hover:text-redMain" />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-600" />
                    {user && user?.role == "admin" ? (
                      <DropdownMenuItem
                        onSelect={() => navigate("/admindashboard")}
                      >
                        Dashboard
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onSelect={() => navigate("/streamerdashboard")}
                      >
                        Dashboard
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                      Wallet
                      <DropdownMenuShortcut>
                        {user?.wallet}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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
                            isOpen
                              ? "M6 18L18 6M6 6l12 12"
                              : "M4 6h16M4 12h16m-7 6h7"
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
                      {isAuthenticated ? (
                        <div>
                          {" "}
                          <Button
                            onClick={handleLogout}
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
                          <Button
                            onClick={() => navigate("/register")}
                            variant="secondary"
                          >
                            Register
                          </Button>
                        </div>
                      )}
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
                  <div className="flex items-center gap-2">
                    {" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {" "}
                        {user && (
                          <div className="flex items-center gap-1 cursor-pointer group">
                            <div className="relative">
                              <LazyLoadImage
                                className="w-8 h-8 rounded-full "
                                src={`${serverUrl}/${user?.profilePic}`}
                              />
                              <div className="absolute inset-0 transition-all duration-200 bg-black rounded-full opacity-0 group-hover:opacity-50"></div>
                            </div>
                            <BiSolidDownArrow className="transition-all duration-200 group-hover:text-redMain" />
                          </div>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-neutral-600" />
                        {user && user?.role == "admin" ? (
                          <DropdownMenuItem
                            onSelect={() => navigate("/admindashboard")}
                          >
                            Dashboard
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onSelect={() => navigate("/streamerdashboard")}
                          >
                            Dashboard
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          Wallet{" "}
                          <DropdownMenuShortcut>
                            {user?.wallet}
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      onClick={handleLogout}
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
                    <Button
                      onClick={() => navigate("/register")}
                      variant="secondary"
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
