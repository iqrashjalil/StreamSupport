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

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSidebarOpen } = useSelector((state) => state.users);

  return (
    <>
      <div className="fixed hidden lg:flex flex-col justify-between h-[92.5vh] p-2 font-rajdhani w-[15%] bg-gray-600">
        <div>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
              <BiSolidDashboard className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
              <NavLink to={"/streamerdashboard"}>Dashboard</NavLink>
            </li>
            <li className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
              <IoMdSettings className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
              <NavLink>Settings</NavLink>
            </li>
            <li className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
              <FaWallet className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
              <NavLink to={"/wallet"}>Wallet</NavLink>
            </li>
            <li className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
              <FaHandsHelping className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
              <NavLink>Help</NavLink>
            </li>
            <li className="flex items-center gap-2 p-2 text-lg transition-all duration-200 rounded group hover:bg-gray-700 text-neutral-50">
              <BiSolidHelpCircle className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
              <NavLink>Faq</NavLink>
            </li>
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
                className="flex gap-2 p-2 bg-gray-500 rounded"
                to={"/streamerdashboard"}
              >
                {" "}
                <BiSolidDashboard className="text-2xl transition-all duration-200 group-hover:text-redMain" />
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => dispatch(toggleSidebar())}
                className="flex gap-2 p-2 bg-gray-500 rounded"
                to={"/streamerdashboard"}
              >
                {" "}
                <IoMdSettings className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                Settings
              </NavLink>
              <NavLink
                onClick={() => dispatch(toggleSidebar())}
                className="flex gap-2 p-2 bg-gray-500 rounded"
                to={"/wallet"}
              >
                <FaWallet className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                Wallet
              </NavLink>
              <NavLink
                onClick={() => dispatch(toggleSidebar())}
                className="flex gap-2 p-2 bg-gray-500 rounded"
                to={"/streamerdashboard"}
              >
                <FaHandsHelping className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                Help
              </NavLink>
              <NavLink
                onClick={() => dispatch(toggleSidebar())}
                className="flex gap-2 p-2 bg-gray-500 rounded"
                to={"/streamerdashboard"}
              >
                <BiSolidHelpCircle className="text-2xl transition-all duration-200 group-hover:text-redMain" />{" "}
                Faq
              </NavLink>
            </ul>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Sidebar;
