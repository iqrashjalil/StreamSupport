import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { useEffect } from "react";
import {
  getAllDonations,
  getDonationsStats,
  getRecentDonations,
  getWeekEarnings,
  getYearDonations,
} from "../../store/slices/Donation_Slice";
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
import { FaCrown } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Streamer_Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const {
    earningStats,
    donationsStats,
    yearDonations,
    topDonators,
    recentDonations,
    currenWeekTopDonators,
  } = useSelector((state) => state.donations);
  const id = user?._id;

  useEffect(() => {
    dispatch(getWeekEarnings(id));
    dispatch(getDonationsStats(id));
    dispatch(getYearDonations(id));
    dispatch(getAllDonations(id));
    dispatch(getRecentDonations(id));
  }, [dispatch, id]);

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
          yearDonations?.jan,
          yearDonations?.feb,
          yearDonations?.mar,
          yearDonations?.apr,
          yearDonations?.may,
          yearDonations?.jun,
          yearDonations?.jul,
          yearDonations?.aug,
          yearDonations?.sep,
          yearDonations?.oct,
          yearDonations?.nov,
          yearDonations?.dec,
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
    <div className="flex w-full">
      <section className="w-[15%] block">
        <Sidebar />
      </section>
      <section className="p-5 w-full lg:w-[85%] font-rajdhani">
        <div className="flex flex-wrap justify-center gap-10">
          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <FaHeart className="text-2xl text-neutral-50" />
            </div>
            <h1 className="text-xl text-neutral-50">
              Rs:
              <span className="text-3xl font-extrabold">
                {new Intl.NumberFormat().format(donationsStats?.totalDonations)}
              </span>
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Total Superchats</p>
            </div>
          </div>
          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <BsCurrencyDollar className="text-3xl text-neutral-50" />
            </div>{" "}
            <h1 className="text-xl text-neutral-50">
              Rs:{" "}
              <span className="text-3xl font-extrabold">
                {new Intl.NumberFormat().format(
                  donationsStats?.averageDonation
                )}
              </span>
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Average Superchat</p>
            </div>
          </div>
          <div className="h-40 p-5 bg-gray-600 border border-gray-500 rounded w-80">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
              <FaHeart className="text-2xl text-neutral-50" />
            </div>{" "}
            <h1 className="text-xl text-neutral-50">
              Rs:{" "}
              <span className="text-3xl font-extrabold">
                {new Intl.NumberFormat().format(
                  earningStats?.previousWeekEarnings
                )}
              </span>
            </h1>
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
              Rs:{" "}
              <span className="text-3xl font-extrabold">
                {new Intl.NumberFormat().format(
                  earningStats?.currentWeekEarnings
                )}
              </span>
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-slate-400">Earning This Week</p>
              <p
                className={`flex items-center font-semibold ${
                  earningStats?.percentageDifference < 0
                    ? "text-redMain"
                    : "text-green-500"
                } `}
              >
                {earningStats?.percentageDifference < 0 ? (
                  <IoMdArrowDown className="mb-1" />
                ) : (
                  <IoMdArrowUp className="mb-1" />
                )}
                {earningStats?.percentageDifference}%
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
              <TableCaption>A list of your Top Supporter.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead className="w-[50%]">Amount Superchated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDonators?.map((donator, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      {donator._id}
                      {index === 0 && (
                        <span>
                          <FaCrown className="text-yellow-400" />
                        </span>
                      )}
                      {index === 1 && <span>🥈</span>}
                      {index === 2 && <span>🥉</span>}
                    </TableCell>
                    <TableCell className="font-medium">
                      {donator.totalDonated}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-10 mt-10 lg:flex-row ">
          <div className="lg:w-[60%] p-5 w-full rounded bg-gray-600">
            <Table>
              <TableCaption>List of Recent Superchats.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%]">Name</TableHead>
                  <TableHead className="w-[20%]">Amount Superchated</TableHead>
                  <TableHead className="w-[60%]">Message</TableHead>
                  <TableHead className="w-[10%]">Transaction Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDonations?.map((donator, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {donator.donatorName}
                    </TableCell>
                    <TableCell className="flex gap-2 font-medium">
                      Rs:
                      <span className="bg-green-500 text-neutral-50 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {donator.amount}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {donator.message}
                    </TableCell>

                    <TableCell className="font-medium">
                      {donator.transactionStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
          <div className="lg:w-[30%] w-full rounded p-4 bg-gray-600">
            <Table>
              <TableCaption>
                A list of your Top Supporters of Current Week
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead className="w-[50%]">Amount Superchated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currenWeekTopDonators?.map((donator, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      {donator._id}
                      {index === 0 && (
                        <span>
                          <FaCrown className="text-yellow-400" />
                        </span>
                      )}
                      {index === 1 && <span>🥈</span>}
                      {index === 2 && <span>🥉</span>}
                    </TableCell>
                    <TableCell className="font-medium">
                      {donator.totalDonated}
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
  );
};

export default Streamer_Dashboard;
