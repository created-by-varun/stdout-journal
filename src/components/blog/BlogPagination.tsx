import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const BlogPagination = ({
  totalPages = 5,
  currentPage = 1,
  onPageChange = () => {},
}: BlogPaginationProps) => {
  const [activePage, setActivePage] = useState(currentPage);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, activePage - 1);
      let endPage = Math.min(totalPages - 1, activePage + 1);

      // Adjust if we're near the beginning
      if (activePage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (activePage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis1");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis2");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="bg-black text-green-500 font-mono p-4 rounded-md w-full">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (activePage > 1) handlePageChange(activePage - 1);
              }}
              className={`text-green-500 hover:text-green-300 hover:bg-gray-900 border-green-500 ${activePage === 1 ? "opacity-50 pointer-events-none" : ""}`}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis1" || page === "ellipsis2") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="text-green-500" />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  isActive={page === activePage}
                  className={`text-green-500 hover:text-green-300 hover:bg-gray-900 border-green-500 ${page === activePage ? "bg-gray-900" : ""}`}
                >
                  {page}
                  {page === activePage && cursorVisible && (
                    <span className="ml-1 inline-block">_</span>
                  )}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (activePage < totalPages) handlePageChange(activePage + 1);
              }}
              className={`text-green-500 hover:text-green-300 hover:bg-gray-900 border-green-500 ${activePage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlogPagination;
