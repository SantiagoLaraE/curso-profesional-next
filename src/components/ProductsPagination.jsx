import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useFetch } from '@hooks/useFetch';
import endPoints from '@services/api';
import { useRouter } from 'next/router';

const ProductsPagination = ({ productLimit, productOffset, currentPage }) => {
  const router = useRouter();
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0))?.length;
  const totalPages = Math.ceil(totalProducts / productLimit);

  let pageIndicator = [];
  let indicatorStart = 1;
  let indicatorEnd = 5;

  if (currentPage > 2) {
    indicatorStart = currentPage - 2;
    indicatorEnd = currentPage + 2;
  }

  if (currentPage > totalPages - 2) {
    indicatorStart = totalPages - 4;
    indicatorEnd = totalPages;
  }

  if (currentPage > totalPages || currentPage < 1) {
    router.push('/404');
  }

  for (indicatorStart; indicatorStart <= indicatorEnd; indicatorStart++) {
    pageIndicator.push(indicatorStart);
  }

  const handlePage = (page) => {
    router.push({ query: { page: page } });
  };

  const handleNextPage = () => {
    router.push({ query: { page: currentPage + 1 } });
  };
  const handlePreviousPage = () => {
    router.push({ query: { page: currentPage - 1 } });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 ? true : false}
          className="disabled:opacity-50 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages ? true : false}
          className="disabled:opacity-50 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{productOffset + 1}</span> to{' '}
            <span className="font-medium">{productOffset + productLimit > totalProducts ? totalProducts : productOffset + productLimit}</span> of <span className="font-medium">{totalProducts}</span>{' '}
            results
          </p>
        </div>
        <div>
          <div className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={handlePreviousPage}
              className="disabled:opacity-50 relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              disabled={currentPage === 1 ? true : false}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pageIndicator?.map((indicator) => (
              <button
                key={`pageIndicator=${indicator}`}
                onClick={() => {
                  handlePage(indicator);
                }}
                className={
                  indicator == currentPage
                    ? 'cursor-pointer relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20'
                    : 'cursor-pointer relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
                }
              >
                {indicator}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              className="disabled:opacity-50 relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              disabled={currentPage >= totalPages ? true : false}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPagination;
