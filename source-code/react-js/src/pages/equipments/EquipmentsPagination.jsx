import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function EquipmentsPagination({
  currentPage,
  maxItems,
  maxPage,
}) {
  const navigateToPage = (e, isAllowed) => {
    if (!isAllowed) {
      e.preventDefault();
    }
  };
  return (
    <div className="mt-40 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            currentPage > 1
              ? "hover:bg-gray-50"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          Previous
        </a>
        <a
          href={`?page=${currentPage < maxPage ? currentPage + 1 : maxPage}`}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            currentPage < maxPage
              ? "hover:bg-gray-50"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * 10, maxItems)}
            </span>{" "}
            of <span className="font-medium">{maxItems}</span> results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={(e) => navigateToPage(e, currentPage > 1)}
              href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage > 1
                  ? "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {[...Array(maxPage).keys()].map((page) => (
              <a
                key={page}
                href={`?page=${page + 1}`}
                aria-current={page + 1 === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page + 1 === currentPage
                    ? "bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {page + 1}
              </a>
            ))}
            <a
              onClick={(e) => navigateToPage(e, currentPage < maxPage)}
              href={`?page=${currentPage + 1}`}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage < maxPage
                  ? "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
