import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidDashboard, BiSolidHelpCircle } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaWallet } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../serverUrl";
import { toggleSidebar } from "../store/slices/Users_Slice";
import logo from "../assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaBell } from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSidebarOpen } = useSelector((state) => state.users);

  const activeLinkClass = "bg-gray-700";
  return (
    <>
      {user && user.role === "admin" ? (
        <>
          {" "}
          <div className="fixed hidden lg:flex flex-col justify-between h-[92.5vh] p-2 font-rajdhani w-[15%] bg-gray-600">
            <div>
              <ul className="flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/admindashboard"}
                >
                  {({ isActive }) => (
                    <>
                      <BiSolidDashboard
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Dashboard
                    </>
                  )}
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2  p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/allusers"}
                >
                  {({ isActive }) => (
                    <>
                      <FaWallet
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      All Users
                    </>
                  )}
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2  p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/allwithdraws"}
                >
                  {({ isActive }) => (
                    <>
                      <FaHandsHelping
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Withdraw Requests
                    </>
                  )}
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/faq"}
                >
                  {({ isActive }) => (
                    <>
                      <BiSolidHelpCircle
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Faq
                    </>
                  )}
                </NavLink>
              </ul>
            </div>
            <div className="flex items-center justify-between w-full p-1 bg-gray-700 rounded h-14 ">
              <div className="flex items-center gap-2">
                <LazyLoadImage
                  className="w-10 h-10 rounded-full"
                  src={`${serverUrl}/${user?.profilePic}`}
                />
                <h1 className="text-lg text-neutral-50">{user?.userName}</h1>
              </div>
              <IoMdSettings
                onClick={() => navigate(`/editprofile/${user?._id}`)}
                className="text-2xl transition-all duration-200 cursor-pointer text-neutral-50 hover:text-redMain"
              />
            </div>
          </div>
          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <Sheet
              open={isSidebarOpen}
              onOpenChange={(open) => !open && dispatch(toggleSidebar())}
            >
              <SheetTrigger asChild></SheetTrigger>
              <SheetContent
                side="left"
                className="font-bold bg-black font-rajdhani"
              >
                <SheetHeader>
                  <SheetTitle className="flex justify-center text-redMain">
                    <img className="h-8" src={logo} alt="" />
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col gap-5 mt-5 text-neutral-50">
                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/streamerdashboard"}
                  >
                    <BiSolidDashboard className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Dashboard
                  </NavLink>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="flex items-center gap-2 p-2 text-lg transition-all duration-200 bg-gray-500 rounded group hover:bg-gray-700 text-neutral-50">
                        <span className="flex gap-2">
                          <IoMdSettings className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                          Settings
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <NavLink
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 ml-5 mt-4 bg-gray-500 text-lg transition-all duration-200 rounded group ${
                              isActive
                                ? "bg-gray-700 text-neutral-50"
                                : "hover:bg-gray-700 text-neutral-50"
                            }`
                          }
                          to={"/alertsettings"}
                        >
                          {({ isActive }) => (
                            <>
                              <FaBell
                                className={`text-2xl transition-all duration-200 ${
                                  isActive
                                    ? "text-redMain"
                                    : "text-white group-hover:text-redMain"
                                }`}
                              />
                              Alert Settings
                            </>
                          )}
                        </NavLink>

                        <NavLink
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 ml-5 mt-4 bg-gray-500 text-lg transition-all duration-200 rounded group ${
                              isActive
                                ? "bg-gray-700 text-neutral-50"
                                : "hover:bg-gray-700 text-neutral-50"
                            }`
                          }
                          to={"/audioalertsettings"}
                        >
                          {({ isActive }) => (
                            <>
                              <MdAudiotrack
                                className={`text-2xl transition-all duration-200 ${
                                  isActive
                                    ? "text-redMain"
                                    : "text-white group-hover:text-redMain"
                                }`}
                              />
                              Audio Alert Settings
                            </>
                          )}
                        </NavLink>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex justify-between gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/wallet"}
                  >
                    <span className="flex gap-2">
                      <FaWallet className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                      Wallet{" "}
                    </span>
                    <span>
                      {new Intl.NumberFormat().format(`${user?.wallet}`)}
                    </span>
                  </NavLink>

                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/help"}
                  >
                    <FaHandsHelping className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Help
                  </NavLink>

                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/faq"}
                  >
                    <BiSolidHelpCircle className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Faq
                  </NavLink>
                </ul>
              </SheetContent>
            </Sheet>
          )}
        </>
      ) : (
        <>
          {" "}
          <div className="fixed hidden lg:flex flex-col justify-between h-[92.5vh] p-2 font-rajdhani w-[15%] bg-gray-600">
            <div>
              <ul className="flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/streamerdashboard"}
                >
                  {({ isActive }) => (
                    <>
                      <BiSolidDashboard
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Dashboard
                    </>
                  )}
                </NavLink>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
                      <span className="flex gap-2">
                        <IoMdSettings className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                        Settings
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center gap-2 mt-4 p-2 ml-5 text-lg transition-all duration-200 rounded group ${
                            isActive
                              ? "bg-gray-700 text-neutral-50"
                              : "hover:bg-gray-700 text-neutral-50"
                          }`
                        }
                        to={"/alertsettings"}
                      >
                        {({ isActive }) => (
                          <>
                            <FaBell
                              className={`text-2xl transition-all duration-200 ${
                                isActive
                                  ? "text-redMain"
                                  : "text-white group-hover:text-redMain"
                              }`}
                            />
                            Alert Settings
                          </>
                        )}
                      </NavLink>

                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center gap-2 mt-4 p-2 ml-5 text-lg transition-all duration-200 rounded group ${
                            isActive
                              ? "bg-gray-700 text-neutral-50"
                              : "hover:bg-gray-700 text-neutral-50"
                          }`
                        }
                        to={"/audioalertsettings"}
                      >
                        {({ isActive }) => (
                          <>
                            <MdAudiotrack
                              className={`text-2xl transition-all duration-200 ${
                                isActive
                                  ? "text-redMain"
                                  : "text-white group-hover:text-redMain"
                              }`}
                            />
                            Audio Alert Settings
                          </>
                        )}
                      </NavLink>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-2  p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/wallet"}
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex gap-2">
                        <FaWallet
                          className={`text-2xl flex justify-between transition-all duration-200 ${
                            isActive
                              ? "text-redMain"
                              : "text-white group-hover:text-redMain"
                          }`}
                        />
                        Wallet{" "}
                      </span>
                      <span>
                        {new Intl.NumberFormat().format(`${user?.wallet}`)}
                      </span>
                    </>
                  )}
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2  p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/help"}
                >
                  {({ isActive }) => (
                    <>
                      <FaHandsHelping
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Help
                    </>
                  )}
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group ${
                      isActive
                        ? "bg-gray-700 text-neutral-50"
                        : "hover:bg-gray-700 text-neutral-50"
                    }`
                  }
                  to={"/faq"}
                >
                  {({ isActive }) => (
                    <>
                      <BiSolidHelpCircle
                        className={`text-2xl transition-all duration-200 ${
                          isActive
                            ? "text-redMain"
                            : "text-white group-hover:text-redMain"
                        }`}
                      />
                      Faq
                    </>
                  )}
                </NavLink>
              </ul>
            </div>
            <div className="flex items-center justify-between w-full p-1 bg-gray-700 rounded h-14 ">
              <div className="flex items-center gap-2">
                <LazyLoadImage
                  className="w-10 h-10 rounded-full"
                  src={`${serverUrl}/${user?.profilePic}`}
                />
                <h1 className="text-lg text-neutral-50">{user?.userName}</h1>
              </div>
              <IoMdSettings
                onClick={() => navigate(`/editprofile/${user?._id}`)}
                className="text-2xl transition-all duration-200 cursor-pointer text-neutral-50 hover:text-redMain"
              />
            </div>
          </div>
          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <Sheet
              open={isSidebarOpen}
              onOpenChange={(open) => !open && dispatch(toggleSidebar())}
            >
              <SheetTrigger asChild></SheetTrigger>
              <SheetContent
                side="left"
                className="font-bold bg-black font-rajdhani"
              >
                <SheetHeader>
                  <SheetTitle className="flex justify-center text-redMain">
                    <img className="h-8" src={logo} alt="" />
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col gap-5 mt-5 text-neutral-50">
                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/streamerdashboard"}
                  >
                    <BiSolidDashboard className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Dashboard
                  </NavLink>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="flex items-center gap-2 p-2 text-lg transition-all duration-200 bg-gray-500 rounded group hover:bg-gray-700 text-neutral-50">
                        <span className="flex gap-2">
                          <IoMdSettings className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                          Settings
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <NavLink
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 ml-5 mt-4 bg-gray-500 text-lg transition-all duration-200 rounded group ${
                              isActive
                                ? "bg-gray-700 text-neutral-50"
                                : "hover:bg-gray-700 text-neutral-50"
                            }`
                          }
                          to={"/alertsettings"}
                        >
                          {({ isActive }) => (
                            <>
                              <FaBell
                                className={`text-2xl transition-all duration-200 ${
                                  isActive
                                    ? "text-redMain"
                                    : "text-white group-hover:text-redMain"
                                }`}
                              />
                              Alert Settings
                            </>
                          )}
                        </NavLink>

                        <NavLink
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 ml-5 mt-4 bg-gray-500 text-lg transition-all duration-200 rounded group ${
                              isActive
                                ? "bg-gray-700 text-neutral-50"
                                : "hover:bg-gray-700 text-neutral-50"
                            }`
                          }
                          to={"/audioalertsettings"}
                        >
                          {({ isActive }) => (
                            <>
                              <MdAudiotrack
                                className={`text-2xl transition-all duration-200 ${
                                  isActive
                                    ? "text-redMain"
                                    : "text-white group-hover:text-redMain"
                                }`}
                              />
                              Audio Alert Settings
                            </>
                          )}
                        </NavLink>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex justify-between gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/wallet"}
                  >
                    <span className="flex gap-2">
                      <FaWallet className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                      Wallet{" "}
                    </span>
                    <span>
                      {new Intl.NumberFormat().format(`${user?.wallet}`)}
                    </span>
                  </NavLink>

                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/help"}
                  >
                    <FaHandsHelping className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Help
                  </NavLink>

                  <NavLink
                    onClick={() => dispatch(toggleSidebar())}
                    className={({ isActive }) =>
                      `flex gap-2 p-2 bg-gray-500 rounded ${
                        isActive ? activeLinkClass : ""
                      }`
                    }
                    to={"/faq"}
                  >
                    <BiSolidHelpCircle className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                    Faq
                  </NavLink>
                </ul>
              </SheetContent>
            </Sheet>
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
