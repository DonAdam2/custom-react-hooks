//custom hooks
import usePagination from '../../customHooks/UsePagination';
//constants
import { people } from '@/js/constants/Constants';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';

const PaginationHookPage = () => {
  const {
    firstContentIndex,
    lastContentIndex,
    contentPerPage,
    updateCurrentRowsPerPage,
    ...paginationData
  } = usePagination({
    contentPerPage: 3,
    count: people.length,
  });

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
      <p>
        This hook gives you the pagination functionality out of the box, which can be integrated
        with any pagination component
      </p>
      {people.slice(firstContentIndex, lastContentIndex).map((el, i) => (
        <Person
          key={i}
          id={i}
          firstName={el.first_name}
          lastName={el.last_name}
          jobTitle={el.employment.title}
          status={el.subscription.status}
          avatar={el.avatar}
        />
      ))}

      <Pagination
        // toolTipText={{ prevThreePages: 'Prev 3', nextThreePages: 'Next 3' }}
        // activePageColors={{ lightColor: '#fbd34d', darkColor: '#78350f' }}
        // isLoading={true}
        {...paginationData}
      />
      <select value={String(contentPerPage)} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationHookPage;
