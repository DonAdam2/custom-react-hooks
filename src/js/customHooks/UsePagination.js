import { useCallback, useEffect, useState } from 'react';

const range = (fromPageNum, toPageNum, step = 1) => {
  let i = fromPageNum;
  const range = [];

  while (i <= toPageNum) {
    range.push(i);
    i += step;
  }

  return range;
};

const usePagination = ({ contentPerPage, count }) => {
  const [currentPageNum, setCurrentPageNum] = useState(1),
    [paginationBlocks, setPaginationBlocks] = useState([]),
    // number of pages in total (total items / content on each page)
    pageCount = Math.ceil(count / contentPerPage),
    // index of last item of current page
    lastContentIndex = currentPageNum * contentPerPage,
    // index of first item of current page
    firstContentIndex = lastContentIndex - contentPerPage,
    initialPagesDisplayNum = 5;

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

        pages = range(startPage, endPage);

        const pagesCount = pages.length,
          singleSpillOffset = totalNumbers - pagesCount - 1,
          leftSpill = startPage > 2,
          rightSpill = endPage < beforeLastPage;

        if (leftSpill && !rightSpill) {
          const extraPages = range(startPage - singleSpillOffset, startPage - 1);
          pages = ['LEFT', ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
          const extraPages = range(endPage + 1, endPage + singleSpillOffset);
          pages = [...pages, ...extraPages, 'RIGHT'];
        } else if (leftSpill && rightSpill) {
          pages = ['LEFT', ...pages, 'RIGHT'];
        }
        setPaginationBlocks([1, ...pages, pageCount]);
      } else {
        setPaginationBlocks(range(1, pageCount));
      }
    },
    [pageCount]
  );

  useEffect(() => {
    getPaginationBlocks(1);
  }, [getPaginationBlocks]);

  // change page based on direction either front or back
  const changePage = (isNextPage) => {
    if (isNextPage) {
      if (currentPageNum !== pageCount && count > 0) {
        getPaginationBlocks(currentPageNum + 1);
      }
    } else {
      if (currentPageNum !== 1 && count > 0) {
        getPaginationBlocks(currentPageNum - 1);
      }
    }

    setCurrentPageNum((state) => {
      // move forward
      if (isNextPage) {
        // if page is the last page, do nothing
        if (state === pageCount) {
          return state;
        }
        return state + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const updatePaginationBlocks = (activePageNum) => {
    setCurrentPageNum(activePageNum);
    getPaginationBlocks(activePageNum);
  };

  const navigateToPage = (num) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      updatePaginationBlocks(pageCount);
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      updatePaginationBlocks(1);
    } else if (num !== currentPageNum) {
      updatePaginationBlocks(num);
    }
  };

  const navigateToFirstOrLastPage = (isFirstPage) => {
    if (isFirstPage) {
      if (currentPageNum !== 1 && count > 0) {
        getPaginationBlocks(1);
      }
    } else {
      if (currentPageNum !== pageCount && count > 0) {
        getPaginationBlocks(pageCount);
      }
    }

    setCurrentPageNum(() => {
      if (isFirstPage) {
        return 1;
      } else {
        return pageCount;
      }
    });
  };

  const navigateToNextOrPrevPaginationBlock = (isNextBlock) => {
    if (isNextBlock) {
      const activePageNum = currentPageNum + 3;
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
      const activePageNum = currentPageNum - 3;
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

  return {
    currentPageNum,
    totalPages: pageCount,
    paginationBlocks,
    navigateToNextPage: () => changePage(true),
    navigateToPrevPage: () => changePage(false),
    navigateToPage,
    navigateToFirstPage: () => navigateToFirstOrLastPage(true),
    navigateToLastPage: () => navigateToFirstOrLastPage(false),
    navigateToNextPaginationBlock: () => navigateToNextOrPrevPaginationBlock(true),
    navigateToPrevPaginationBlock: () => navigateToNextOrPrevPaginationBlock(false),
    firstContentIndex,
    lastContentIndex,
  };
};

export default usePagination;
