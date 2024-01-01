import { useState } from 'react';
import axios from 'axios';
//custom hooks
import useDebouncedValue from '@/js/customHooks/useDebouncedValue';
import useDebouncedFunc from '@/js/customHooks/useDebouncedFunc';
//components
import SearchInput from '@/js/components/shared/SearchInput';

const DebouncePage = () => {
  const [testString, setTestString] = useState(''),
    debouncedTestString = useDebouncedValue(testString, 500),
    //API search results
    [results, setResults] = useState([]),
    //searching status (whether there is pending API request)
    [isSearching, setIsSearching] = useState(false);

  const debouncedFunc = useDebouncedFunc(() => {
    alert('I was called after a delay of 500 ms');
  }, 500);

  const searchCharacters = async (search) => {
    setIsSearching(true);
    try {
      const res = await axios(`https://dummyjson.com/products/search?q=${search}`);
      setResults(res.data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="magnify-container">
      <p>
        <strong>useDebouncedFunc</strong> hook example:
      </p>
      <button onClick={debouncedFunc}>Debounced function</button>
      <hr style={{ width: '100%' }} />
      <p>
        <strong>useDebouncedValue</strong> hook example:
      </p>
      <input
        placeholder="Type something"
        onChange={({ target: { value } }) => setTestString(value)}
      />
      <p>
        <strong>Debounced testString is:</strong> {debouncedTestString}
      </p>
      <hr style={{ width: '100%' }} />
      <p>
        The following is a debounced search input using the <strong>debounce</strong> function from{' '}
        <strong>lodash</strong>:
      </p>
      <SearchInput
        placeholder="Search products"
        onInputChange={async (val) => {
          await searchCharacters(val);
        }}
      />
      {isSearching ? (
        <div>Searching ...</div>
      ) : (
        results.map((result) => (
          <div key={result.id}>
            <h4>{result.title}</h4>
            <img src={result.thumbnail} alt={result.title} />
          </div>
        ))
      )}
    </div>
  );
};

export default DebouncePage;
