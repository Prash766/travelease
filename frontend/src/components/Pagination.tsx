import { ChevronLeft, ChevronRight } from 'lucide-react'

export type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  const getPageNumbers = () => {
    const pageNumbers = []
    const showEllipsis = totalPages > 7

    if (showEllipsis) {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (page >= totalPages - 3) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = page - 1; i <= page + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Pagination">
      <button
        className="p-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
            disabled={pageNumber === '...'}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              ${pageNumber === page
                ? 'bg-primary text-white'
                : pageNumber === '...'
                  ? 'text-gray-700 cursor-default'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }
              ${pageNumber === '...' ? 'cursor-default' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className="p-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Number(page) + 1)}
        disabled={Number(page) === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}

export default Pagination