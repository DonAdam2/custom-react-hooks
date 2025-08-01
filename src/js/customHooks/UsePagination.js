import { useCallback, useEffect, useState, useRef } from 'react';
import { getPaginationRange } from '@/js/constants/Helpers';
import useRouter from '@/js/customHooks/useRouter';

function usePagination({ contentPerPage: initialContentPerPage, count, fetchData, deepLinking }) {
  // Always call useRouter hook to comply with Rules of Hooks
  const routerData = useRouter();
  // Only destructure and use when deepLinking is provided
  const { setSearchParams, location } = deepLinking ? routerData : {};

  // Initialize state with URL parameters if deep linking is enabled
  const getInitialState = () => {
    if (deepLinking && location?.search) {
      const currentSearchParams = new URLSearchParams(location.search);
      const pageFromUrl = currentSearchParams.get(deepLinking.pageNumKey);
      const pageSizeFromUrl = deepLinking.pageSizeKey
        ? currentSearchParams.get(deepLinking.pageSizeKey)
        : null;

      let initialPage = 1;
      let initialPageSize = initialContentPerPage;

      // Get page size from URL if available
      if (pageSizeFromUrl) {
        const urlPageSize = +pageSizeFromUrl;
        if (urlPageSize > 0) {
          initialPageSize = urlPageSize;
        }
      }

      // Get page from URL if available and valid
      if (pageFromUrl) {
        const urlPage = +pageFromUrl;
        if (urlPage >= 1) {
          // We'll validate against pageCount later, for now just use the URL value
          initialPage = urlPage;
        }
      }

      return { initialPage, initialPageSize };
    }

    return { initialPage: 1, initialPageSize: initialContentPerPage };
  };

  const { initialPage, initialPageSize } = getInitialState();

  const [activePage, setActivePage] = useState(initialPage);
  const [contentPerPage, setContentPerPage] = useState(initialPageSize);
  const [paginationBlocks, setPaginationBlocks] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // Track if we've initialized the URL
  const hasInitializedUrl = useRef(false);
  // Track if we're currently updating the URL to prevent duplicate API calls
  const isUpdatingUrl = useRef(false);

  // Basic pagination indexes (only calculated for non-async mode)
  const lastContentIndex = !fetchData ? activePage * contentPerPage : null;
  const firstContentIndex = !fetchData ? lastContentIndex - contentPerPage : null;

  const initialPagesDisplayNum = 5;

  // Sync contentPerPage with prop when pageSizeKey is not provided
  useEffect(() => {
    if (!deepLinking?.pageSizeKey) {
      setContentPerPage(initialContentPerPage);
    }
  }, [initialContentPerPage, deepLinking?.pageSizeKey]);

  useEffect(() => {
    // number of pages in total (total items / content on each page)
    setPageCount(Math.ceil(count / contentPerPage));
  }, [count, contentPerPage]);

  // Validate activePage when pageCount changes (for deep linking initialization)
  useEffect(() => {
    if (deepLinking && pageCount > 0 && activePage > pageCount) {
      // Active page from URL is invalid, adjust it
      const validPage = pageCount;
      setActivePage(validPage);

      // Update URL with valid page if we have setSearchParams
      if (setSearchParams) {
        const updates = { [deepLinking.pageNumKey]: validPage.toString() };
        if (deepLinking.pageSizeKey) {
          updates[deepLinking.pageSizeKey] = contentPerPage.toString();
        }
        isUpdatingUrl.current = true;
        setSearchParams(updates);
        setTimeout(() => {
          isUpdatingUrl.current = false;
        }, 10);
      }
    }
  }, [pageCount, activePage, deepLinking, setSearchParams, contentPerPage]);

  const getPaginationBlocks = useCallback(
    (activePageNum) => {
      const totalNumbers = initialPagesDisplayNum;
      const totalBlocks = totalNumbers + 2;

      if (pageCount > totalBlocks) {
        let pages = [];

        const leftBound = activePageNum - 1;
        const rightBound = activePageNum + 1;
        const beforeLastPage = pageCount - 1;
        const startPage = leftBound > 2 ? leftBound : 2;
        const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

        pages = getPaginationRange(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;
        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

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

  // Update pagination blocks when activePage or pageCount changes
  useEffect(() => {
    if (pageCount > 0) {
      getPaginationBlocks(activePage);
    }
  }, [pageCount, activePage, getPaginationBlocks]);

  // Deep linking: One-time initialization only
  useEffect(() => {
    if (deepLinking && pageCount > 0 && setSearchParams && !hasInitializedUrl.current) {
      hasInitializedUrl.current = true;

      const currentSearchParams = new URLSearchParams(location?.search || '');
      const pageFromUrl = currentSearchParams.get(deepLinking.pageNumKey);
      const pageSizeFromUrl = deepLinking.pageSizeKey
        ? currentSearchParams.get(deepLinking.pageSizeKey)
        : null;

      const updates = {};
      let needsStateUpdate = false;

      // When pageSizeKey is provided, ensure both pageNumKey and pageSizeKey are in URL
      if (deepLinking.pageSizeKey) {
        let finalPageSize = contentPerPage;

        // Process page size FIRST to calculate correct pageCount
        if (!pageSizeFromUrl) {
          console.log(
            `Deep linking: Initializing URL with ${deepLinking.pageSizeKey}=${contentPerPage}`
          );
          updates[deepLinking.pageSizeKey] = contentPerPage.toString();
        } else {
          // Page size exists, sync state to URL and ensure it's in updates
          const urlPageSize = +pageSizeFromUrl;
          if (urlPageSize > 0) {
            finalPageSize = urlPageSize;
            updates[deepLinking.pageSizeKey] = urlPageSize.toString();
            if (urlPageSize !== contentPerPage) {
              setContentPerPage(urlPageSize);
              needsStateUpdate = true;
            }
          } else {
            // Invalid page size in URL, use current contentPerPage
            updates[deepLinking.pageSizeKey] = contentPerPage.toString();
          }
        }

        // Calculate pageCount based on the final page size
        const newPageCount = Math.ceil(count / finalPageSize);

        // Now process page parameter with correct pageCount
        if (!pageFromUrl) {
          console.log('Deep linking: Initializing URL with page=1');
          updates[deepLinking.pageNumKey] = '1';
        } else {
          // Page exists, validate against the new pageCount
          const urlPage = +pageFromUrl;
          if (urlPage >= 1 && urlPage <= newPageCount) {
            updates[deepLinking.pageNumKey] = urlPage.toString();
            if (urlPage !== activePage) {
              setActivePage(urlPage);
              needsStateUpdate = true;
            }
          } else {
            // Invalid page in URL, reset to valid page
            const validPage = urlPage > newPageCount ? newPageCount : 1;
            updates[deepLinking.pageNumKey] = validPage.toString();
            if (validPage !== activePage) {
              setActivePage(validPage);
              needsStateUpdate = true;
            }
          }
        }
      } else {
        // Original logic when pageSizeKey is not provided
        if (!pageFromUrl) {
          // No page parameter, add page=1
          console.log('Deep linking: Initializing URL with page=1');
          updates[deepLinking.pageNumKey] = '1';
        } else {
          // Page exists, sync state to URL
          const urlPage = +pageFromUrl;
          if (urlPage >= 1 && urlPage <= pageCount && urlPage !== activePage) {
            setActivePage(urlPage);
            needsStateUpdate = true;
          }
        }
      }

      // Update URL if needed
      if (Object.keys(updates).length > 0) {
        isUpdatingUrl.current = true;
        setSearchParams(updates);
        // Reset the flag after a short delay to allow URL change to propagate
        setTimeout(() => {
          isUpdatingUrl.current = false;
        }, 10);
      }

      // Trigger data fetch only if state was updated
      // This prevents duplicate API calls when URL params match defaults
      if (needsStateUpdate && fetchData) {
        const finalPage = pageFromUrl ? +pageFromUrl : activePage;
        const finalPageSize = pageSizeFromUrl ? +pageSizeFromUrl : contentPerPage;
        fetchData(finalPage, finalPageSize);
      }
    }
    //eslint-disable-next-line
  }, [deepLinking, pageCount, setSearchParams, location?.search]);

  // Deep linking: Listen for external URL changes (browser navigation)
  useEffect(() => {
    if (deepLinking && pageCount > 0 && hasInitializedUrl.current && !isUpdatingUrl.current) {
      const currentSearchParams = new URLSearchParams(location?.search || '');
      const pageFromUrl = currentSearchParams.get(deepLinking.pageNumKey);
      const pageSizeFromUrl = deepLinking.pageSizeKey
        ? currentSearchParams.get(deepLinking.pageSizeKey)
        : null;

      let stateChanged = false;

      // Handle page changes
      if (pageFromUrl) {
        const urlPage = +pageFromUrl;
        if (urlPage >= 1 && urlPage <= pageCount && urlPage !== activePage) {
          setActivePage(urlPage);
          stateChanged = true;
        }
      }

      // Handle page size changes
      if (deepLinking.pageSizeKey && pageSizeFromUrl) {
        const urlPageSize = +pageSizeFromUrl;
        if (urlPageSize > 0 && urlPageSize !== contentPerPage) {
          setContentPerPage(urlPageSize);
          stateChanged = true;
        }
      }

      // If state changed and we have fetchData, trigger it
      if (stateChanged && fetchData) {
        const finalPage = pageFromUrl ? +pageFromUrl : activePage;
        const finalPageSize = pageSizeFromUrl ? +pageSizeFromUrl : contentPerPage;
        fetchData(finalPage, finalPageSize);
      }
    }
  }, [location?.search, deepLinking, pageCount, activePage, contentPerPage, fetchData]);

  // Deep linking specific functions
  const updatePageNum = useCallback(
    (num) => {
      if (deepLinking && setSearchParams) {
        const updates = { [deepLinking.pageNumKey]: num.toString() };
        // Preserve current page size in URL
        if (deepLinking.pageSizeKey) {
          updates[deepLinking.pageSizeKey] = contentPerPage.toString();
        }
        isUpdatingUrl.current = true;
        setSearchParams(updates);
        setTimeout(() => {
          isUpdatingUrl.current = false;
        }, 10);
      }
    },
    [deepLinking, setSearchParams, contentPerPage]
  );

  const updatePageSize = useCallback(
    (size) => {
      if (deepLinking && deepLinking.pageSizeKey && setSearchParams) {
        const updates = { [deepLinking.pageSizeKey]: size.toString() };
        // Preserve current page in URL
        updates[deepLinking.pageNumKey] = activePage.toString();
        isUpdatingUrl.current = true;
        setSearchParams(updates);
        setTimeout(() => {
          isUpdatingUrl.current = false;
        }, 10);
      }
    },
    [deepLinking, setSearchParams, activePage]
  );

  const updatePaginationBlocks = useCallback(
    async (activePageNum, newContentPerPage) => {
      try {
        // Handle deep linking - only update URL, let URL effect handle state and fetchData
        if (deepLinking) {
          if (newContentPerPage !== undefined && deepLinking.pageSizeKey && setSearchParams) {
            // Update both page and page size in URL
            const updates = {
              [deepLinking.pageNumKey]: activePageNum.toString(),
              [deepLinking.pageSizeKey]: newContentPerPage.toString(),
            };
            isUpdatingUrl.current = true;
            setSearchParams(updates);
            setTimeout(() => {
              isUpdatingUrl.current = false;
            }, 10);
          } else {
            // Only update page number
            updatePageNum(activePageNum);
          }
        } else {
          // Non-deep linking mode - handle async pagination and state directly
          if (fetchData) {
            await fetchData(activePageNum, newContentPerPage ?? contentPerPage);
          }
          setActivePage(activePageNum);
          if (newContentPerPage !== undefined) {
            setContentPerPage(newContentPerPage);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [fetchData, contentPerPage, deepLinking, updatePageNum, setSearchParams]
  );

  // Change page based on direction either front or back
  const changePage = async (isNextPage) => {
    try {
      const newPage = isNextPage ? activePage + 1 : activePage - 1;

      if (isNextPage) {
        if (activePage !== pageCount && count > 0) {
          // Handle deep linking - only update URL, let URL effect handle state and fetchData
          if (deepLinking) {
            updatePageNum(newPage);
          } else {
            // Non-deep linking mode - handle async pagination and state directly
            if (fetchData) {
              await fetchData(newPage, contentPerPage);
            }
            setActivePage(newPage);
          }
        }
      } else {
        if (activePage !== 1 && count > 0) {
          // Handle deep linking - only update URL, let URL effect handle state and fetchData
          if (deepLinking) {
            updatePageNum(newPage);
          } else {
            // Non-deep linking mode - handle async pagination and state directly
            if (fetchData) {
              await fetchData(newPage, contentPerPage);
            }
            setActivePage(newPage);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToPage = async (num, newContentPerPage) => {
    try {
      if (num > pageCount) {
        await updatePaginationBlocks(pageCount, newContentPerPage);
      } else if (num < 1) {
        await updatePaginationBlocks(1, newContentPerPage);
      } else if (num !== activePage) {
        await updatePaginationBlocks(num, newContentPerPage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToFirstOrLastPage = async (isFirstPage) => {
    try {
      const targetPage = isFirstPage ? 1 : pageCount;

      if (isFirstPage) {
        if (activePage !== 1 && count > 0) {
          // Handle deep linking - only update URL, let URL effect handle state and fetchData
          if (deepLinking) {
            updatePageNum(targetPage);
          } else {
            // Non-deep linking mode - handle async pagination and state directly
            if (fetchData) {
              await fetchData(targetPage, contentPerPage);
            }
            setActivePage(targetPage);
          }
        }
      } else {
        if (activePage !== pageCount && count > 0) {
          // Handle deep linking - only update URL, let URL effect handle state and fetchData
          if (deepLinking) {
            updatePageNum(targetPage);
          } else {
            // Non-deep linking mode - handle async pagination and state directly
            if (fetchData) {
              await fetchData(targetPage, contentPerPage);
            }
            setActivePage(targetPage);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToNextOrPrevPaginationBlock = async (isNextBlock) => {
    try {
      if (isNextBlock) {
        const activePageNum = activePage + 3;
        if (activePageNum >= pageCount) {
          await updatePaginationBlocks(pageCount);
        } else if (!paginationBlocks.includes('LEFT')) {
          const targetPage = initialPagesDisplayNum + 2;
          if (targetPage >= pageCount) {
            await updatePaginationBlocks(pageCount);
          } else {
            await updatePaginationBlocks(targetPage);
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

  const updateCurrentRowsPerPage = async (newContentPerPage) => {
    try {
      const newPageCount = Math.ceil(count / newContentPerPage);

      // If active page > newPageCount => set active page to newPageCount
      if (activePage > newPageCount) {
        const newActivePage = newPageCount === 0 ? 1 : newPageCount;

        // Handle deep linking - only update URL, let URL effect handle state and fetchData
        if (deepLinking) {
          const updates = {
            [deepLinking.pageNumKey]: newActivePage.toString(),
          };
          if (deepLinking.pageSizeKey) {
            updates[deepLinking.pageSizeKey] = newContentPerPage.toString();
          }
          if (setSearchParams) {
            isUpdatingUrl.current = true;
            setSearchParams(updates);
            setTimeout(() => {
              isUpdatingUrl.current = false;
            }, 10);
          }
        } else {
          // Non-deep linking mode - handle async pagination and state directly
          if (fetchData) {
            await fetchData(newActivePage, newContentPerPage);
          }
          setActivePage(newActivePage);
          setContentPerPage(newContentPerPage);
        }
      } else {
        // Handle deep linking - only update URL, let URL effect handle state and fetchData
        if (deepLinking && deepLinking.pageSizeKey) {
          updatePageSize(newContentPerPage);
        } else {
          // Non-deep linking mode - handle async pagination and state directly
          if (fetchData) {
            await fetchData(activePage, newContentPerPage);
          }
          setContentPerPage(newContentPerPage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    // Include firstContentIndex and lastContentIndex only for non-async mode
    ...(firstContentIndex !== null && { firstContentIndex }),
    ...(lastContentIndex !== null && { lastContentIndex }),
    activePage,
    totalPages: pageCount,
    contentPerPage,
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
