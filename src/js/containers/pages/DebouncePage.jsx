import { useEffect, useState } from 'react';
import useDebounce from '@/js/customHooks/useDebounce';

//API search function
function searchCharacters(search) {
  return fetch(`https://dummyjson.com/products/search?q=${search}`, { method: 'GET' })
    .then((r) => r.json())
    .then((jsonDta) => {
      return jsonDta.products;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const DebouncePage = () => {
  const [searchTerm, setSearchTerm] = useState(''),
    //API search results
    [results, setResults] = useState([]),
    //searching status (whether there is pending API request)
    [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //make API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input placeholder="Search products" onChange={(e) => setSearchTerm(e.target.value)} />
      {isSearching && <div>Searching ...</div>}
      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img src={result.thumbnail} alt={result.title} />
        </div>
      ))}
    </div>
  );
};

export default DebouncePage;
