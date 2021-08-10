import React from 'react';
import { Button } from 'react-bootstrap';

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onChange?: (pageNumber: number) => void;
  showPageSize?: number;
  showLastOrFirstPage?: boolean;
}

interface Pager {
  firstPage: number;
  lastPage: number;
  pageRange: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  onChange = (pageNumber: number) => pageNumber,
  showPageSize = 1,
  showLastOrFirstPage = true,
}) => {
  const [cPage, setCPage] = React.useState(currentPage);

  const setPageSelection = React.useCallback(
    (page: number) => {
      setCPage(page);
      onChange(page);
    },
    [onChange],
  );

  const pager: Pager = React.useMemo(() => {
    // eslint-disable-next-line no-lone-blocks
    {
      let startPage: number = cPage - showPageSize <= 1 ? 1 : cPage - Math.floor(showPageSize / 2);
      let endPage: number = cPage - showPageSize <= 1 ? showPageSize : cPage + Math.ceil(showPageSize / 2) - 1;

      if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = totalPages - showPageSize;
      }
      if (startPage < 1) {
        startPage = 1;
      }
      const pageRange = Array(endPage - startPage + 1)
        .fill(0)
        .map((_, i) => i + startPage);

      return {
        firstPage: pageRange[0],
        lastPage: pageRange[pageRange.length - 1],
        pageRange,
      };
    }
  }, [cPage, showPageSize, totalPages]);

  return (
    <div className="w-100 d-flex justify-content-center">
      <div>
        <Button
          variant="primary"
          disabled={cPage === 1}
          className="m-1 rounded-circle"
          onClick={() => setPageSelection(cPage - 1)}
        >
          &lt;
        </Button>
        {pager.firstPage > 1 && showLastOrFirstPage && (
          <>
            <Button type="button" variant="slim" className="m-1 rounded-circle" onClick={() => setPageSelection(1)}>
              1
            </Button>
            <span>...</span>
          </>
        )}
        {pager.pageRange.map(pCount => (
          <Button
            key={`pagination-c-${pCount}`}
            type="button"
            variant="primary"
            className="m-1 rounded-circle"
            disabled={cPage === pCount}
            onClick={() => setPageSelection(pCount)}
          >
            {pCount}
          </Button>
        ))}

        {pager.lastPage < totalPages && showLastOrFirstPage && (
          <>
            <span>...</span>
            <Button
              type="button"
              variant="primary"
              className="m-1 rounded-circle"
              onClick={() => setPageSelection(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="primary"
          className="m-1 rounded-circle"
          disabled={cPage === totalPages}
          onClick={() => setPageSelection(cPage + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export { Pagination };
