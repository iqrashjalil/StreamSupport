import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidDashboard, BiSolidHelpCircle } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaWallet } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { serverUrl } from "../serverUrl";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  return (
    <div className="fixed flex flex-col justify-between h-[92.5vh] p-2 font-rajdhani w-[15%] bg-gray-600">
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
            <NavLink>Wallet</NavLink>
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
  );
};

export default Sidebar;
