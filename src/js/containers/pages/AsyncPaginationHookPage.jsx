import { useCallback, useEffect, useState } from 'react';
//axios
import axios from 'axios';
//custom hooks
import usePagination from '../../customHooks/UsePagination';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';

const AsyncPaginationHookPage = () => {
  const /*[rowsPerPage, setRowsPerPage] = useState('3'),*/
    [totalCount, setTotalCount] = useState(0),
    [people, setPeople] = useState([]),
    [isLoading, setIsLoading] = useState(false),
    [error, setError] = useState(false),
    // perPage = +rowsPerPage;
    perPage = 3;

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

  //eslint-disable-next-line
  const { updateCurrentRowsPerPage, ...paginationData } = usePagination({
    contentPerPage: perPage,
    // contentPerPage: +rowsPerPage,
    count: totalCount,
    fetchData: (num, currentRowsPerPage) => fetchData(num, currentRowsPerPage),
  });

  useEffect(() => {
    (async () => {
      // await fetchData(1, +rowsPerPage);
      await fetchData(1, perPage);
    })();
  }, [fetchData]);

  /******* use updateCurrentRowsPerPage if you have dynamic rowsPerPage *******/
  /*const handleChange = async ({ target: { value } }) => {
    setRowsPerPage(value);
    await updateCurrentRowsPerPage(+value);
  };

  const options = [
    { value: '1', displayValue: '1 Row' },
    { value: '3', displayValue: '3 Rows' },
    { value: '5', displayValue: '5 Rows' },
    { value: '10', displayValue: '10 Rows' },
    { value: '15', displayValue: '15 Rows' },
  ];*/

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
          {/*<select value={rowsPerPage} onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>*/}
        </>
      )}
    </div>
  );
};

export default AsyncPaginationHookPage;
