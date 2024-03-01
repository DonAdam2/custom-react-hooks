//custom hooks
import usePagination from '../../customHooks/UsePagination';
//constants
import { people } from '@/js/constants/Constants';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';

const PaginationHookPage = () => {
  const /*[selectedOption, setSelectedOption] = useState('5'),*/
    paginationData = usePagination({
      // contentPerPage: +selectedOption,
      contentPerPage: 3,
      count: people.length,
    });

  /******* use paginationData.updateCurrentRowsPerPage if you have dynamic rowsPerPage *******/
  /*const handleChange = ({ target: { value } }) => {
    setSelectedOption(value);
    paginationData.updateCurrentRowsPerPage(+value);
  };

  const options = [
    { value: '1', displayValue: '1 Row' },
    { value: '5', displayValue: '5 Rows' },
    { value: '10', displayValue: '10 Rows' },
    { value: '15', displayValue: '15 Rows' },
  ];*/

  return (
    <div className="magnify-container">
      <p>
        This hook gives you the pagination functionality out of the box, which can be integrated
        with any pagination component
      </p>
      {people
        .slice(paginationData.firstContentIndex, paginationData.lastContentIndex)
        .map((el, i) => (
          <Person
            key={i}
            id={i}
            firstName={el.first_name}
            lastName={el.last_name}
            jobTitle={el.employment.title}
            status={el.subscription.status}
          />
        ))}

      <Pagination
        // toolTipText={{ prevThreePages: 'Prev 3', nextThreePages: 'Next 3' }}
        // activePageColors={{ lightColor: '#fbd34d', darkColor: '#78350f' }}
        {...paginationData}
      />
      {/*<select value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>*/}
    </div>
  );
};

export default PaginationHookPage;
