import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

const SearchInput = ({
  label,
  id,
  onInputChange,
  resetSearch,
  placeholder,
  disabled,
  isDebounce = true,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (resetSearch) {
      resetSearch(() => {
        setQuery('');
      });
    }
    // eslint-disable-next-line
  }, []);

  const debounceLoadData = useMemo(
    () => debounce(onInputChange, 500),
    // eslint-disable-next-line
    []
  );

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    if (onInputChange && !isDebounce) {
      onInputChange(value);
    }
    if (onInputChange && isDebounce) {
      debounceLoadData(value);
    }
  };

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        value={query}
        onChange={changeHandler}
        disabled={disabled}
        placeholder={placeholder}
      />
    </>
  );
};

export default SearchInput;
