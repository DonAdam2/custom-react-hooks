import { useCallback, useEffect, useState } from 'react';
import { getPaginationRange } from '@/js/constants/Helpers';

function usePagination({ contentPerPage, count }) {
  const [activePage, setActivePage] = useState(1),
    [paginationBlocks, setPaginationBlocks] = useState([]),
    [pageCount, setPageCount] = useState(0),
    // index of last item of current page
    lastContentIndex = activePage * contentPerPage,
    // index of first item of current page
    firstContentIndex = lastContentIndex - contentPerPage,
    initialPagesDisplayNum = 5;

  useEffect(() => {
    // number of pages in total (total items / content on each page)
    setPageCount(Math.ceil(count / contentPerPage));
  }, [count, contentPerPage]);

  const getPaginationBlocks = useCallback(
    (activePageNum) => {
      const totalNumbers = initialPagesDisplayNum,
        totalBlocks = totalNumbers + 2;

      if (pageCount > totalBlocks) {
        let pages = [];

        const leftBound = activePageNum - 1,
          rightBound = activePageNum + 1,
          beforeLastPage = pageCount - 1,
          startPage = leftBound > 2 ? leftBound : 2,
          endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

        pages = getPaginationRange(startPage, endPage);

        const pagesCount = pages.length,
          singleSpillOffset = totalNumbers - pagesCount - 1,
          leftSpill = startPage > 2,
          rightSpill = endPage < beforeLastPage;

        if (leftSpill && !rightSpill) {
          const extraPages = getPaginationRange(startPage - singleSpillOffset, startPage - 1);
          pages = ['LEFT', ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
          const extraPages = getPaginationRange(endPage + 1, endPage + singleSpillOffset);
          pages = [...pages, ...extraPages, 'RIGHT'];
        } else if (leftSpill && rightSpill) {
          pages = ['LEFT', ...pages, 'RIGHT'];
        }
        setPaginationBlocks([1, ...pages, pageCount]);
      } else {
        setPaginationBlocks(getPaginationRange(1, pageCount));
      }
    },
    [pageCount]
  );

  useEffect(() => {
    getPaginationBlocks(activePage);
  }, [getPaginationBlocks]);

  // change page based on direction either front or back
  const changePage = (isNextPage) => {
    if (isNextPage) {
      if (activePage !== pageCount && count > 0) {
        getPaginationBlocks(activePage + 1);
      }
    } else {
      if (activePage !== 1 && count > 0) {
        getPaginationBlocks(activePage - 1);
      }
    }

    setActivePage((prev) => {
      // move forward
      if (isNextPage) {
        // if page is the last page, do nothing
        if (prev === pageCount) {
          return prev;
        }
        return prev + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (prev === 1) {
          return prev;
        }
        return prev - 1;
      }
    });
  };

  const updatePaginationBlocks = (activePageNum) => {
    setActivePage(activePageNum);
    getPaginationBlocks(activePageNum);
  };

  const navigateToPage = (num) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      updatePaginationBlocks(pageCount);
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      updatePaginationBlocks(1);
    } else if (num !== activePage) {
      updatePaginationBlocks(num);
    }
  };

  const navigateToFirstOrLastPage = (isFirstPage) => {
    if (isFirstPage) {
      if (activePage !== 1 && count > 0) {
        getPaginationBlocks(1);
      }
    } else {
      if (activePage !== pageCount && count > 0) {
        getPaginationBlocks(pageCount);
      }
    }

    setActivePage(() => {
      if (isFirstPage) {
        return 1;
      } else {
        return pageCount;
      }
    });
  };

  const navigateToNextOrPrevPaginationBlock = (isNextBlock) => {
    if (isNextBlock) {
      const activePageNum = activePage + 3;
      if (activePageNum >= pageCount) {
        updatePaginationBlocks(pageCount);
      } else if (!paginationBlocks.includes('LEFT')) {
        const activePageNum = initialPagesDisplayNum + 2;
        if (activePageNum >= pageCount) {
          updatePaginationBlocks(pageCount);
        } else {
          updatePaginationBlocks(activePageNum);
        }
      } else {
        updatePaginationBlocks(activePageNum);
      }
    } else {
      const activePageNum = activePage - 3;
      if (activePageNum <= 1) {
        updatePaginationBlocks(1);
      } else if (!paginationBlocks.includes('RIGHT')) {
        const num = paginationBlocks[2] - 2;
        updatePaginationBlocks(num);
      } else {
        updatePaginationBlocks(activePageNum);
      }
    }
  };

  const updateCurrentRowsPerPage = (newContentPerPage) => {
    const newPageCount = Math.ceil(count / newContentPerPage);

    //if active page > newPageCount => set active page to newPageCount
    if (activePage > newPageCount) {
      setActivePage(newPageCount);
    }
  };

  return {
    firstContentIndex,
    lastContentIndex,
    activePage,
    totalPages: pageCount,
    paginationBlocks,
    navigateToNextPage: () => changePage(true),
    navigateToPrevPage: () => changePage(false),
    navigateToPage,
    navigateToFirstPage: () => navigateToFirstOrLastPage(true),
    navigateToLastPage: () => navigateToFirstOrLastPage(false),
    updateCurrentRowsPerPage,
    navigateToNextPaginationBlock: () => navigateToNextOrPrevPaginationBlock(true),
    navigateToPrevPaginationBlock: () => navigateToNextOrPrevPaginationBlock(false),
  };
}

export default usePagination;
