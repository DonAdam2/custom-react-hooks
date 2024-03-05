import { useCallback, useEffect, useState } from 'react';
import { getPaginationRange } from '@/js/constants/Helpers';

function useAsyncPagination({ contentPerPage, count, fetchData }) {
  const [activePage, setActivePage] = useState(1),
    [paginationBlocks, setPaginationBlocks] = useState([]),
    [pageCount, setPageCount] = useState(0),
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
    // eslint-disable-next-line
  }, [getPaginationBlocks]);

  const changePage = async (isNextPage) => {
    try {
      if (isNextPage) {
        if (activePage !== pageCount && count > 0) {
          await fetchData(activePage + 1, contentPerPage);
          getPaginationBlocks(activePage + 1);
        }
      } else {
        if (activePage !== 1 && count > 0) {
          await fetchData(activePage - 1, contentPerPage);
          getPaginationBlocks(activePage - 1);
        }
      }

      setActivePage((prev) => {
        if (isNextPage) {
          if (prev === pageCount) {
            return prev;
          }
          return prev + 1;
        } else {
          if (prev === 1) {
            return prev;
          }
          return prev - 1;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToPage = async (num, newContentPerPage) => {
    try {
      if (num > pageCount) {
        setActivePage(pageCount);
        getPaginationBlocks(pageCount);
      } else if (num < 1) {
        setActivePage(1);
        getPaginationBlocks(1);
      } else if (num !== activePage) {
        await updatePaginationBlocks(num, newContentPerPage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToFirstOrLastPage = async (isFirstPage) => {
    try {
      if (isFirstPage) {
        if (activePage !== 1 && count > 0) {
          await fetchData(1, contentPerPage);
          getPaginationBlocks(1);
        }
      } else {
        if (activePage !== pageCount && count > 0) {
          await fetchData(pageCount, contentPerPage);
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
    } catch (err) {
      console.log(err);
    }
  };

  const updatePaginationBlocks = async (activePageNum, newContentPerPage) => {
    await fetchData(activePageNum, newContentPerPage ?? contentPerPage);
    setActivePage(activePageNum);
    getPaginationBlocks(activePageNum);
  };

  const navigateToNextOrPrevPaginationBlock = async (isNextBlock) => {
    try {
      if (isNextBlock) {
        const activePageNum = activePage + 3;
        if (activePageNum >= pageCount) {
          await updatePaginationBlocks(pageCount);
        } else if (!paginationBlocks.includes('LEFT')) {
          const activePageNum = initialPagesDisplayNum + 2;
          if (activePageNum >= pageCount) {
            await updatePaginationBlocks(pageCount);
          } else {
            await updatePaginationBlocks(activePageNum);
          }
        } else {
          await updatePaginationBlocks(activePageNum);
        }
      } else {
        const activePageNum = activePage - 3;
        if (activePageNum <= 1) {
          await updatePaginationBlocks(1);
        } else if (!paginationBlocks.includes('RIGHT')) {
          const num = paginationBlocks[2] - 2;
          await updatePaginationBlocks(num);
        } else {
          await updatePaginationBlocks(activePageNum);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateCurrentRowsPerPage = async (num) => {
    const newPageCount = Math.ceil(count / num);

    //if active page > newPageCount => set active page to newPageCount
    if (activePage > newPageCount) {
      const newActivePage = newPageCount === 0 ? 1 : newPageCount;
      await fetchData(newActivePage, num);
      setActivePage(newActivePage);
    } else {
      await fetchData(activePage, num);
    }
  };

  return {
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

export default useAsyncPagination;
