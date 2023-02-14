import { useCallback, useEffect, useState } from 'react';
//constants
import { convertObjectToQueryString, convertQueryStringIntoObject } from '../constants/Helpers';
import { useLocation, useNavigate } from 'react-router-dom';

function range(fromPageNum, toPageNum, step = 1) {
  let i = fromPageNum;
  const range = [];

  while (i <= toPageNum) {
    range.push(i);
    i += step;
  }

  return range;
}

function useDeepLinkingPagination({ contentPerPage, count, deepLinkingData: { pageNumKey } }) {
  const { pathname, search } = useLocation(),
    navigate = useNavigate(),
    [currentPageNum, setCurrentPageNum] = useState(1),
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

  const updatePageNum = useCallback(
    (num) => {
      const query = search,
        params = convertQueryStringIntoObject(query);
      params[pageNumKey] = num;

      navigate({
        pathname: pathname,
        search: convertObjectToQueryString(params),
      });

      getPaginationBlocks(num);
    },
    [getPaginationBlocks, navigate, pageNumKey, pathname, search]
  );

  const updatePaginationBlocks = useCallback(
    (activePageNum) => {
      updatePageNum(activePageNum);
      setCurrentPageNum(activePageNum);
    },
    [updatePageNum]
  );

  useEffect(() => {
    const query = search;

    if (query) {
      const params = convertQueryStringIntoObject(query);
      if (params[pageNumKey]) {
        getPaginationBlocks(+params[pageNumKey]);
        setCurrentPageNum(+params[pageNumKey]);
      } else {
        updatePaginationBlocks(currentPageNum);
      }
    } else {
      const paramsString = convertObjectToQueryString({
        page: currentPageNum,
      });
      getPaginationBlocks(currentPageNum);
      navigate({
        pathname,
        search: paramsString,
      });
    }
  }, [
    search,
    pathname,
    navigate,
    getPaginationBlocks,
    updatePaginationBlocks,
    currentPageNum,
    pageNumKey,
  ]);

  // change page based on direction either front or back
  const changePage = (isNextPage) => {
    if (isNextPage) {
      if (currentPageNum !== pageCount && count > 0) {
        updatePageNum(currentPageNum + 1);
      }
    } else {
      if (currentPageNum !== 1 && count > 0) {
        updatePageNum(currentPageNum - 1);
      }
    }

    setCurrentPageNum((prev) => {
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
        updatePaginationBlocks(1);
      }
    } else {
      if (currentPageNum !== pageCount && count > 0) {
        updatePaginationBlocks(pageCount);
      }
    }
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
    firstContentIndex,
    lastContentIndex,
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
  };
}

export default useDeepLinkingPagination;
