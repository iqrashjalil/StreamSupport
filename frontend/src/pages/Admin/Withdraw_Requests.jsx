import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
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

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  deleteWithdrawRequest,
  getAllWithdrawRequests,
  resetMessage,
  updateWithdrawRequest,
} from "../../store/slices/Withdraw_Slice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Loader from "../../components/Loader/Loader";

const Withdraw_Requests = () => {
  const dispatch = useDispatch();
  const { allWithdraws, loading, totalPages, message, error } = useSelector(
    (state) => state.withdraws
  );
  const [status, setStatus] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [page, setPage] = useState(1);

  // Fetch users on page change
  useEffect(() => {
    dispatch(getAllWithdrawRequests(page)); // Pass the page as a query parameter
  }, [dispatch, page]);

  // Handle previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Handle specific page click
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleRequestDelete = (id) => {
    dispatch(deleteWithdrawRequest(id)).then(() => {
      dispatch(getAllWithdrawRequests(page));
    });
  };

  const handleRejectReasonChange = (e) => {
    setRejectReason(e.target.value);
  };

  const handleUpdateStatus = (id) => {
    const updateData = {
      status: status,
      rejectReason: rejectReason,
    };
    dispatch(updateWithdrawRequest({ id, updateData }));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, message]);
  // Function to render pagination items dynamically
  const renderPaginationItems = () => {
    const items = [];

    if (totalPages < 2) {
      return null;
    }
    if (page === 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="bg-redMain text-neutral-50"
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key={2}>
          <PaginationLink onClick={() => handlePageClick(2)}>2</PaginationLink>
        </PaginationItem>,
        <PaginationItem key={3}>
          <PaginationLink onClick={() => handlePageClick(3)}>3</PaginationLink>
        </PaginationItem>,
        totalPages > 3 && <PaginationEllipsis key="ellipsis" />
      );
    } else if (page === totalPages) {
      items.push(
        totalPages > 3 && <PaginationEllipsis key="ellipsis" />,
        <PaginationItem key={totalPages - 2}>
          <PaginationLink onClick={() => handlePageClick(totalPages - 2)}>
            {totalPages - 2}
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key={totalPages - 1}>
          <PaginationLink onClick={() => handlePageClick(totalPages - 1)}>
            {totalPages - 1}
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="bg-redMain text-neutral-50"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      items.push(
        page > 2 && <PaginationEllipsis key="ellipsis-left" />,
        <PaginationItem key={page - 1}>
          <PaginationLink onClick={() => handlePageClick(page - 1)}>
            {page - 1}
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key={page}>
          <PaginationLink
            className="bg-redMain text-neutral-50"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key={page + 1}>
          <PaginationLink onClick={() => handlePageClick(page + 1)}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>,
        page < totalPages - 1 && <PaginationEllipsis key="ellipsis-right" />
      );
    }

    return items;
  };

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
            <Table>
              <TableCaption>
                A list of your Top Supporters of Current Week
              </TableCaption>
              <TableHeader>
                {/* <div className="relative">
              <Input
                value={searchQuery}
                onChange={searchChange}
                placeholder="Enter Name To Search"
              />
              <FaSearch
                onClick={handleSearch}
                className="absolute top-0 right-0 p-2 text-[40px] cursor-pointer bg-gray-500 text-redMain"
              />
            </div> */}
                <TableRow>
                  <TableHead className="w-[10%]">Request At</TableHead>
                  <TableHead className="w-[10%]">Streamer Name</TableHead>
                  <TableHead className="w-[10%]">Email</TableHead>
                  <TableHead className="w-[10%]">CNIC</TableHead>
                  <TableHead className="w-[10%]">Bank Name</TableHead>
                  <TableHead className="w-[10%]">Account Title</TableHead>
                  <TableHead className="w-[10%]">Account Number</TableHead>
                  <TableHead className="w-[10%]">Withdraw Amount</TableHead>
                  <TableHead className="w-[5%]">Status</TableHead>
                  <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allWithdraws &&
                  allWithdraws.map((withdraw, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(withdraw.requestedAt).toLocaleString(
                          "en-US",
                          {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {withdraw.streamer?.userName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {withdraw.streamer?.email}
                      </TableCell>
                      <TableCell className="text-base font-medium">
                        {withdraw.cnic}
                      </TableCell>
                      <TableCell className="font-medium">
                        {withdraw.bankName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {withdraw.accountTitle}
                      </TableCell>
                      <TableCell className="text-base font-medium">
                        {withdraw.bankAccountNumber}
                      </TableCell>
                      <TableCell className="text-xl font-bold">
                        {new Intl.NumberFormat().format(
                          withdraw.withdrawAmount
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <span
                          className={`${
                            withdraw.status === "Pending"
                              ? "bg-yellow-500"
                              : withdraw.status === "Rejected"
                              ? "bg-redMain"
                              : "bg-green-500"
                          } text-neutral-50 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`}
                        >
                          {withdraw.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex gap-2 font-medium">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="secondary"
                              className="gap-1 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                            >
                              Edit <FaEdit />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Status</DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-center gap-5">
                              <Input
                                type="radio"
                                id="pending"
                                name="status"
                                value="Pending"
                                checked={status === "Pending"}
                                onChange={(e) => setStatus(e.target.value)}
                              />{" "}
                              <label
                                className="font-semibold text-yellow-400"
                                htmlFor="pending"
                              >
                                Pending
                              </label>
                              <Input
                                type="radio"
                                id="rejected"
                                name="status"
                                value="Rejected"
                                checked={status === "Rejected"}
                                onChange={(e) => setStatus(e.target.value)}
                              />
                              <label
                                htmlFor="rejected"
                                className="font-extrabold text-redMain"
                              >
                                Rejected
                              </label>{" "}
                              <Input
                                type="radio"
                                id="approved"
                                name="status"
                                value="Approved"
                                checked={status === "Approved"}
                                onChange={(e) => setStatus(e.target.value)}
                              />
                              <label
                                className="font-extrabold text-green-400"
                                htmlFor="approved"
                              >
                                Approved
                              </label>
                            </div>
                            <DialogFooter className="sm:justify-start sm:flex-col">
                              {status === "Rejected" && (
                                <div className="w-full">
                                  <Label>Reject Reason</Label>
                                  <Input
                                    value={rejectReason}
                                    onChange={handleRejectReasonChange}
                                  />
                                </div>
                              )}
                              <div className="w-full mt-4">
                                <Button
                                  onClick={() =>
                                    handleUpdateStatus(withdraw._id)
                                  }
                                  className="w-full "
                                  variant="secondary"
                                >
                                  Update Status
                                </Button>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => handleRequestDelete(withdraw._id)}
                          variant="secondary"
                        >
                          Delete
                          <MdDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={10} className="text-right">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            className={`hover:bg-redMain hover:text-neutral-50 ${
                              page === 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={handlePreviousPage}
                          />
                        </PaginationItem>

                        {renderPaginationItems()}

                        <PaginationItem>
                          <PaginationNext
                            className={`hover:bg-redMain hover:text-neutral-50 ${
                              page === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={handleNextPage}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </section>
        </div>
      )}
    </>
  );
};

export default Withdraw_Requests;
