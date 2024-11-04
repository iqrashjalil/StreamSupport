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
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

const All_Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, totalPages, loading } = useSelector((state) => state.users);
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

  const handleViewClick = (id) => {
    navigate(`/userprofile/${id}`);
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
                <TableRow className="hidden border-none md:flex">
                  <TableCell colSpan={2} className="w-full text-right ">
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="w-full text-right md:hidden "
                  >
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
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="w-[20%]">Name</TableHead>
                  <TableHead className="w-[20%]">Email</TableHead>
                  <TableHead className="w-[20%]">Wallet</TableHead>
                  <TableHead className="w-[20%]">Role</TableHead>
                  <TableHead className="w-[20%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers &&
                  allUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {user.userName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-xl font-bold">
                        {new Intl.NumberFormat().format(user.wallet)}
                      </TableCell>
                      <TableCell
                        className={`font-medium ${
                          user.role === "admin"
                            ? "text-redMain font-extrabold"
                            : "text-lime-400"
                        }`}
                      >
                        {user.role}
                      </TableCell>
                      <TableCell className="font-medium">
                        {" "}
                        <Button
                          onClick={() => handleViewClick(user._id)}
                          variant="secondary"
                          className="gap-1 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                        >
                          View <FaEye />
                        </Button>
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

export default All_Users;
