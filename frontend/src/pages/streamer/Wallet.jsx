import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { BsBank2 } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Received_Superchats from "../../components/wallet_components/Received_Superchats";
import Bank_Details from "../../components/wallet_components/Bank_Details";
import Withdraw from "../../components/wallet_components/Withdraw";
import { getAllDonations } from "../../store/slices/Donation_Slice";

const Wallet = () => {
  const dispatch = useDispatch();
  const { allDonations } = useSelector((state) => state.donations);
  const { user } = useSelector((state) => state.users);
  const id = user?._id;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("receivedSuperchats");

  useEffect(() => {
    dispatch(getAllDonations(id));
  }, [dispatch, id]);

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "receivedSuperchats":
        return <Received_Superchats allDonations={allDonations} />;
      case "bankDetails":
        return <Bank_Details />;
      case "withdraw":
        return <Withdraw />;
      default:
        return <Received_Superchats allDonations={allDonations} />;
    }
  };

  return (
    <div className="flex w-full">
      <section className="lg:w-[15%]">
        <Sidebar />
      </section>
      <section className="p-5 lg:w-[85%] w-full font-rajdhani">
        <div className="border-b-2 border-gray-600">
          <ul className="flex justify-center gap-4 lg:gap-10 text-neutral-50">
            <NavLink
              className={`flex flex-col lg:flex-row lg:items-start items-center gap-2 font-semibold transition-all duration-200 border-b-2 hover:text-redMain hover:border-redMain ${
                activeTab === "receivedSuperchats"
                  ? "text-redMain border-redMain"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("receivedSuperchats")}
            >
              <GiReceiveMoney />
              Received Superchats
            </NavLink>

            <NavLink
              className={`flex flex-col lg:flex-row lg:items-start items-center gap-2 font-semibold transition-all duration-200 border-b-2 hover:text-redMain hover:border-redMain ${
                activeTab === "bankDetails"
                  ? "text-redMain border-redMain"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("bankDetails")}
            >
              <BsBank2 /> Bank Details
            </NavLink>

            <NavLink
              className={`flex flex-col lg:flex-row lg:items-start items-center gap-2 font-semibold transition-all duration-200 border-b-2 hover:text-redMain hover:border-redMain ${
                activeTab === "withdraw"
                  ? "text-redMain border-redMain"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("withdraw")}
            >
              <BiMoneyWithdraw /> Withdraw
            </NavLink>
          </ul>
        </div>

        {/* Content that changes based on active tab */}
        <div className="mt-5">{renderContent()}</div>
      </section>
    </div>
  );
};

export default Wallet;
