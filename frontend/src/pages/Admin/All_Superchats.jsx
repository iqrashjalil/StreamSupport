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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "react-router-dom";
import { getRecentDonations } from "../../store/slices/Donation_Slice";
import Loader from "../../components/Loader/Loader";

const All_Superchats = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { totalPages, loading, recentDonations } = useSelector(
    (state) => state.donations
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getRecentDonations({ id, page: page }));
  }, [dispatch, id, page]);

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
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  // Function to render pagination items dynamically
  const renderPaginationItems = () => {
    const items = [];

    // Prevent rendering pagination if total pages are less than 2
    if (totalPages < 2) {
      return null;
    }

    // Handle first page scenario
    if (page === 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="bg-redMain text-neutral-50"
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Add the next page if it exists
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={2}>
            <PaginationLink onClick={() => handlePageClick(2)}>
              2
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add the third page if total pages are greater than 2
      if (totalPages > 2) {
        items.push(
          <PaginationItem key={3}>
            <PaginationLink onClick={() => handlePageClick(3)}>
              3
            </PaginationLink>
          </PaginationItem>
        );
      }

      // If there are more than 3 pages, add an ellipsis
      if (totalPages > 3) {
        items.push(<PaginationEllipsis key="ellipsis" />);
      }

      // Handle last page scenario
    } else if (page === totalPages) {
      if (totalPages > 3) {
        items.push(<PaginationEllipsis key="ellipsis" />);
      }

      // Render the last two pages
      if (totalPages >= 2) {
        items.push(
          <PaginationItem key={totalPages - 2}>
            <PaginationLink onClick={() => handlePageClick(totalPages - 2)}>
              {totalPages - 2}
            </PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
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

      // Handle middle pages
    } else {
      if (page > 2) {
        items.push(<PaginationEllipsis key="ellipsis-left" />);
      }

      items.push(
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
        </PaginationItem>
      );

      if (page < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-right" />);
      }
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
                <TableRow>
                  <TableHead className="w-[10%]">Name</TableHead>
                  <TableHead className="w-[20%]">Amount</TableHead>
                  <TableHead className="w-[60%]">Message</TableHead>
                  <TableHead className="w-[10%]">Tranasction Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(recentDonations) &&
                  recentDonations?.map((superchat, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {superchat.donatorName}
                      </TableCell>
                      <TableCell className="flex gap-2 font-medium">
                        Rs:
                        <span className="bg-green-500 text-neutral-50 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          {superchat.amount}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {superchat.message}
                      </TableCell>

                      <TableCell className="font-medium">
                        {superchat.transactionStatus}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
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

export default All_Superchats;
