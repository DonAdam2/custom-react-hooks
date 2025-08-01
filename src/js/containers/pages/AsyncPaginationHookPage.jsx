import { useCallback, useEffect, useState, useRef } from 'react';
//axios
import axios from 'axios';
//custom hooks
import usePagination from '../../customHooks/UsePagination';
// import useRouter from '../../customHooks/useRouter';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';

const AsyncPaginationHookPage = () => {
  /* uncomment the following if you want to have deep linking and async pagination
  const { location } = useRouter();

  // Initialize rowsPerPage from URL if available
  const getInitialRowsPerPage = () => {
    const urlParams = new URLSearchParams(location?.search || '');
    const pageSizeFromUrl = urlParams.get('pageSize');
    return pageSizeFromUrl && +pageSizeFromUrl > 0 ? pageSizeFromUrl : '3';
  };

  const [rowsPerPage, setRowsPerPage] = useState(getInitialRowsPerPage),*/
  const [rowsPerPage, setRowsPerPage] = useState('3'),
    [totalCount, setTotalCount] = useState(0),
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

  // uncomment the following if you want to have deep linking and async pagination
  const { updateCurrentRowsPerPage, /*skipInitialFetch,*/ contentPerPage, ...paginationData } =
    usePagination({
      contentPerPage: +rowsPerPage,
      count: totalCount,
      fetchData: (num, currentRowsPerPage) => fetchData(num, currentRowsPerPage),
      /*deepLinking: {
        pageNumKey: 'page',
        pageSizeKey: 'pageSize',
      },*/
    });

  // Sync rowsPerPage state with contentPerPage from the hook
  useEffect(() => {
    setRowsPerPage(String(contentPerPage));
  }, [contentPerPage]);

  useEffect(() => {
    // Skip initial fetch if the usePagination hook will handle it (deep linking case)
    // uncomment the following if you want to have deep linking and async pagination
    /*if (skipInitialFetch) {
      console.log('AsyncPagination: Skipping initial fetch - usePagination hook will handle it');
      return;
    }*/

    // Prevent double fetch in React StrictMode (optional)
    if (hasInitialFetch.current) {
      console.log('AsyncPagination: Skipping duplicate fetch due to React StrictMode');
      return;
    }
    hasInitialFetch.current = true;

    console.log('AsyncPagination: Initial fetch triggered');
    (async () => {
      await fetchData(1, +rowsPerPage);
      // await fetchData(1, perPage);
    })();
    //eslint-disable-next-line
  }, [fetchData /*, skipInitialFetch*/]);

  /******* use updateCurrentRowsPerPage if you have dynamic rowsPerPage *******/
  const handleChange = async ({ target: { value } }) => {
    setRowsPerPage(value);
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
          <select value={rowsPerPage} onChange={handleChange}>
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

export default AsyncPaginationHookPage;
