import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getTopStreamers } from "../../store/slices/Users_Slice";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { getAllWithdrawRequests } from "../../store/slices/Withdraw_Slice";
import { getYearDonationsOfAllUsers } from "../../store/slices/Donation_Slice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VscRequestChanges } from "react-icons/vsc";
import { FaCrown } from "react-icons/fa6";
import Loader from "../../components/Loader/Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Admin_Dashboard = () => {
  const { totalUsers, topStreamers, totalBalance } = useSelector(
    (state) => state.users
  );
  const { allUsersYearlyDonations, loading } = useSelector(
    (state) => state.donations
  );
  const { pendingRequest } = useSelector((state) => state.withdraws);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ page: 1 }));
    dispatch(getAllWithdrawRequests());
    dispatch(getYearDonationsOfAllUsers());
    dispatch(getTopStreamers());
  }, [dispatch]);
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Superchats",
        data: [
          allUsersYearlyDonations?.jan,
          allUsersYearlyDonations?.feb,
          allUsersYearlyDonations?.mar,
          allUsersYearlyDonations?.apr,
          allUsersYearlyDonations?.may,
          allUsersYearlyDonations?.jun,
          allUsersYearlyDonations?.jul,
          allUsersYearlyDonations?.aug,
          allUsersYearlyDonations?.sep,
          allUsersYearlyDonations?.oct,
          allUsersYearlyDonations?.nov,
          allUsersYearlyDonations?.dec,
        ],
        backgroundColor: "#fd5c63",
        borderColor: "#9e1b32",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Superchats In Each Month",
        color: "white",
      },
    },
    scales: {
      x: {
        grid: {
          color: "gray",
          borderColor: "gray",
        },
        ticks: {
          color: "gray",
        },
      },
      y: {
        grid: {
          color: "gray",
          borderColor: "gray",
        },
        ticks: {
          color: "gray",
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full">
          <section className="w-[15%] block">
            <Sidebar />
          </section>
          <section className="p-5 w-full lg:w-[85%] font-rajdhani">
            <div className="flex flex-wrap justify-center gap-10">
              <div className="flex items-center justify-between h-40 gap-10 p-5 bg-gray-600 border border-gray-500 rounded w-80">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
                    <IoPeople className="text-2xl text-neutral-50" />
                  </div>

                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-400">Total Users</p>
                  </div>
                </div>
                <h1 className="text-5xl font-extrabold text-redMain">
                  {totalUsers}
                </h1>
              </div>

              <div className="flex items-center justify-between h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
                <div className="w-40">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
                    <VscRequestChanges className="text-3xl text-neutral-50" />
                  </div>{" "}
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-400">
                      Pending Winthdraw Requests
                    </p>
                  </div>
                </div>
                <h1 className="text-5xl font-extrabold text-redMain">
                  {pendingRequest}
                </h1>
              </div>
              <div className="flex items-center justify-between h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
                    <BsCurrencyDollar className="text-2xl text-neutral-50" />
                  </div>

                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-400">
                      All Users Balance
                    </p>
                  </div>
                </div>
                <h1 className="text-5xl font-extrabold text-redMain">
                  {new Intl.NumberFormat().format(totalBalance)}
                </h1>
              </div>
              <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
                  <BsCurrencyDollar className="text-3xl text-neutral-50" />
                </div>{" "}
                <h1 className="text-xl text-neutral-50">
                  Rs:{" "}
                  <span className="text-3xl font-extrabold text-redMain"></span>
                </h1>
                <div className="flex justify-between">
                  <p className="font-semibold text-slate-400">
                    Earning This Week
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-10 mt-10 lg:flex-row">
              <div className="h-[30rem] lg:w-[60%] w-full rounded p-5 bg-gray-600">
                <Bar data={data} options={options} />
              </div>
              <div className="lg:w-[30%] w-fulls rounded p-4 bg-gray-600">
                <Table>
                  <TableCaption>
                    A list of top streamers ranked by their lifetime earnings
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Name</TableHead>
                      <TableHead className="w-[50%]">Amount Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStreamers?.map((donator, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex items-center gap-2 font-medium">
                          {donator.userName}
                          {index === 0 && (
                            <span>
                              <FaCrown className="text-yellow-400" />
                            </span>
                          )}
                          {index === 1 && <span>🥈</span>}
                          {index === 2 && <span>🥉</span>}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Intl.NumberFormat().format(
                            donator.totalDonations
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter></TableFooter>
                </Table>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Admin_Dashboard;
