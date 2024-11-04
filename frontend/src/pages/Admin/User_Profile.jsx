import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect } from "react";
import { getSingleUser } from "../../store/slices/Users_Slice";
import { NavLink, useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { serverUrl } from "../../serverUrl";
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
import { getRecentDonations } from "../../store/slices/Donation_Slice";
import { IoIosArrowForward } from "react-icons/io";
import { getBankdetail } from "../../store/slices/Bankdetail_Slice";

import Loader from "../../components/Loader/Loader";

const User_Profile = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.users);
  const { recentDonations, loading } = useSelector((state) => state.donations);
  const { bankDetails } = useSelector((state) => state.bankdetails);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleUser(id));
    dispatch(getRecentDonations({ id, page: 1 }));
    dispatch(getBankdetail(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full">
          <section className="w-[15%] hidden lg:block">
            <Sidebar />
          </section>
          <section className="p-5 w-full lg:w-[85%] font-rajdhani">
            <div className="flex gap-10">
              <div>
                <LazyLoadImage
                  src={`${serverUrl}/${userDetails?.profilePic}`}
                  effect="blur"
                  className="rounded w-60"
                />
              </div>
              <div className="flex flex-col gap-10">
                <h1 className="text-xl font-extrabold text-neutral-50">
                  Name:{" "}
                  <span className="text-2xl text-redMain">
                    {" "}
                    {userDetails?.userName}
                  </span>
                </h1>
                <h1 className="text-xl font-extrabold text-neutral-50">
                  Email:{" "}
                  <span className="text-2xl text-redMain">
                    {userDetails?.email}
                  </span>
                </h1>

                <h1 className="text-xl font-extrabold text-neutral-50">
                  Lifetime Earnings:{" "}
                  <span className="text-2xl text-redMain">
                    {new Intl.NumberFormat().format(
                      userDetails?.totalDonations
                    )}
                  </span>
                  Pkr
                </h1>
                <h1 className="text-xl font-extrabold text-neutral-50">
                  Role:{" "}
                  <span className="text-2xl text-redMain">
                    {" "}
                    {userDetails?.role}
                  </span>
                </h1>
                <h1 className="text-xl font-extrabold text-neutral-50">
                  Current Balance:{" "}
                  <span className="text-2xl text-redMain">
                    {new Intl.NumberFormat().format(userDetails?.wallet)}
                  </span>
                  Pkr
                </h1>
              </div>
            </div>{" "}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                {" "}
                <h1 className="text-2xl font-extrabold text-neutral-50">
                  Added Bank Details
                </h1>
              </div>
              <div className="w-full p-5 bg-gray-600 rounded ">
                <Table>
                  <TableCaption>List of Added Withdraw Options</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank Name</TableHead>
                      <TableHead>Account Title</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>CNIC</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankDetails &&
                      bankDetails?.map((bank, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {bank.bankName}
                          </TableCell>
                          <TableCell className="flex gap-2 font-medium">
                            {bank.accountTitle}
                          </TableCell>

                          <TableCell className="font-medium">
                            {bank.accountNumber}
                          </TableCell>
                          <TableCell className="font-medium">
                            {bank.cnic}
                          </TableCell>
                          <TableCell className="font-medium "></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter></TableFooter>
                </Table>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between">
                {" "}
                <h1 className="text-2xl font-extrabold text-neutral-50">
                  Recent Superchats
                </h1>
                <NavLink
                  to={`/recentsuperchats/${id}`}
                  className="flex items-center font-semibold text-redMain"
                >
                  View More <IoIosArrowForward />{" "}
                </NavLink>
              </div>
              <div className="w-full p-5 bg-gray-600 rounded ">
                <Table>
                  <TableCaption>List of Recent Superchats.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10%]">Name</TableHead>
                      <TableHead className="w-[20%]">
                        Amount Superchated
                      </TableHead>
                      <TableHead className="w-[60%]">Message</TableHead>
                      <TableHead className="w-[10%]">
                        Transaction Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(recentDonations) &&
                      recentDonations?.map((donator, index) => (
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
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default User_Profile;
