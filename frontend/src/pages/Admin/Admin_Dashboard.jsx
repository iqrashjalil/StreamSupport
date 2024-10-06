import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/slices/Users_Slice";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";

const Admin_Dashboard = () => {
  const { totalUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="flex w-full">
      <section className="w-[15%] block">
        <Sidebar />
      </section>
      <section className="p-5 w-full lg:w-[85%] font-rajdhani">
        <div className="flex flex-wrap justify-center gap-10">
          <div className="h-40 gap-10 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <IoPeople className="text-2xl text-neutral-50" />
            </div>
            <h1 className="text-5xl font-extrabold text-redMain">
              {totalUsers}
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Total Users</p>
            </div>
          </div>

          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <BsCurrencyDollar className="text-3xl text-neutral-50" />
            </div>{" "}
            <h1 className="text-xl text-neutral-50"></h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Average Superchat</p>
            </div>
          </div>
          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <IoPeople className="text-2xl text-neutral-50" />
            </div>{" "}
            <h1 className="text-xl text-neutral-50"></h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">
                Previous Week Earnings
              </p>
            </div>
          </div>
          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <BsCurrencyDollar className="text-3xl text-neutral-50" />
            </div>{" "}
            <h1 className="text-xl text-neutral-50">
              Rs: <span className="text-3xl font-extrabold"></span>
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Earning This Week</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin_Dashboard;
