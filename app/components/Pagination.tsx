interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

 function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    // Always show first page
    pages.push(1);

    // Add current page and pages around it
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 2 && currentPage > 3) {
        pages.push("...");
      } else {
        pages.push(i);
      }
    }

    // Add last ellipsis and last page
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page if not already added
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-12 space-x-1">
      {getPageNumbers().map((page, index) => (
        <span
          key={index}
          className={`h-10 w-10 flex items-center justify-center rounded-md text-sm cursor-pointer ${
            page === currentPage
              ? "bg-[#7F56D9] text-white"
              : "text-[#667085] hover:bg-[#F9F5FF] hover:text-[#7F56D9]"
          } ${page === "..." ? "cursor-default hover:bg-transparent" : ""}`}
          onClick={() => page !== "..." && onPageChange(page as number)}
        >
          {page}
        </span>
      ))}
    </div>
  );
}

export default Pagination;