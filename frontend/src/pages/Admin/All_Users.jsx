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
import { getAllUsers } from "../../store/slices/Users_Slice";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const All_Users = () => {
  const dispatch = useDispatch();
  const { allUsers, totalPages, currentPage } = useSelector(
    (state) => state.users
  );
  const [searchQuery, setSearchQuery] = useState();
  const searchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = () => {
    dispatch(getAllUsers({ searchQuery: searchQuery }));
  };
  // State to manage the current page
  const [page, setPage] = useState(1);

  // Fetch users on page change
  useEffect(() => {
    dispatch(getAllUsers({ page: page })); // Pass the page as a query parameter
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
    <div className="flex w-full">
      <section className="w-[15%] block">
        <Sidebar />
      </section>
      <section className="p-5 w-full lg:w-[85%] font-rajdhani">
        <Table>
          <TableCaption>
            A list of your Top Supporters of Current Week
          </TableCaption>
          <TableHeader>
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={searchChange}
                placeholder="Enter Name To Search"
              />
              <FaSearch
                onClick={handleSearch}
                className="absolute top-0 right-0 p-2 text-[40px] cursor-pointer bg-gray-500 text-redMain"
              />
            </div>
            <TableRow>
              <TableHead className="w-[25%]">Name</TableHead>
              <TableHead className="w-[25%]">Email</TableHead>
              <TableHead className="w-[25%]">Wallet</TableHead>
              <TableHead className="w-[25%]">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers &&
              allUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell className="font-medium">{user.wallet}</TableCell>
                  <TableCell
                    className={`font-medium ${
                      user.role === "admin"
                        ? "text-redMain font-extrabold"
                        : "text-lime-400"
                    }`}
                  >
                    {user.role}
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
  );
};

export default All_Users;
