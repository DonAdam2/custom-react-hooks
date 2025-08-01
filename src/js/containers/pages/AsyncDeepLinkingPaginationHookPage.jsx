import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
//custom hooks
import usePagination from '../../customHooks/UsePagination';
import LoadingIcon from '@/js/components/shared/loadingIcon/LoadingIcon';
import Person from '@/js/components/Person';
import Pagination from '@/js/components/shared/Pagination';

const AsyncDeepLinkingPaginationHookPage = () => {
  const [totalCount, setTotalCount] = useState(0),
    [people, setPeople] = useState([]),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(false);

  // Add ref to prevent double fetch in React StrictMode (optional)
  const hasInitialFetch = useRef(false);

  const fetchData = useCallback(async (pageNum, currentRowsPerPage) => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://65e218f7a8583365b317e57e.mockapi.io/api/v1/users', {
        params: {
          page: pageNum,
          limit: currentRowsPerPage,
        },
      });
      setPeople(res.data);
      //should be dynamic from your API
      // setTotalCount(res.data.totalPassengers);
      setTotalCount(52);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { updateCurrentRowsPerPage, skipInitialFetch, contentPerPage, ...paginationData } =
    usePagination({
      contentPerPage: 3,
      count: totalCount,
      fetchData: (num, currentRowsPerPage) => fetchData(num, currentRowsPerPage),
      deepLinking: {
        pageNumKey: 'page',
        pageSizeKey: 'pageSize',
      },
    });

  useEffect(() => {
    // Skip initial fetch if the usePagination hook will handle it
    if (skipInitialFetch) {
      console.log('AsyncPagination: Skipping initial fetch - usePagination hook will handle it');
      return;
    }

    // Prevent double fetch in React StrictMode (optional)
    if (hasInitialFetch.current) {
      console.log('AsyncPagination: Skipping duplicate fetch due to React StrictMode');
      return;
    }
    hasInitialFetch.current = true;

    console.log('AsyncPagination: Initial fetch triggered');
    (async () => {
      await fetchData(1, contentPerPage);
    })();
  }, [fetchData, contentPerPage, skipInitialFetch]);

  /******* use updateCurrentRowsPerPage if you have dynamic rowsPerPage *******/
  const handleChange = async ({ target: { value } }) => {
    await updateCurrentRowsPerPage(+value);
  };

  const options = [
    { value: '1', displayValue: '1 Row' },
    { value: '3', displayValue: '3 Rows' },
    { value: '5', displayValue: '5 Rows' },
    { value: '10', displayValue: '10 Rows' },
    { value: '15', displayValue: '15 Rows' },
  ];

  return (
    <div className="magnify-container">
      {error ? (
        <h2>Error fetching data</h2>
      ) : (
        <>
          <div
            style={{
              position: 'relative',
              padding: people.length === 0 ? '20px 0' : '',
              marginBottom: people.length === 0 ? 10 : '',
            }}
          >
            {isLoading && (
              <div className="center-loader-wrapper">
                <LoadingIcon />
              </div>
            )}
            {people.map((el) => (
              <Person
                key={el.id}
                id={el.id}
                firstName={el.name}
                jobTitle={`Made ${el.id} trips`}
                avatar={el.avatar}
                status="active"
              />
            ))}
          </div>
          <Pagination
            // toolTipText={{ prevThreePages: 'Prev 3', nextThreePages: 'Next 3' }}
            // activePageColors={{ lightColor: '#fbd34d', darkColor: '#78350f' }}
            {...paginationData}
            isLoading={isLoading}
          />
          <select value={String(contentPerPage)} onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default AsyncDeepLinkingPaginationHookPage;
