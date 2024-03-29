//custom hooks
import useFetch from '../../customHooks/UseFetch';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';

const FetchHookPage = () => {
  // const [fetchData, setFetchData] = useState(false);
  const { data, error, isLoading } = useFetch({
    url: 'https://www.mocky.io/v2/5ccfe7d13200006f0000f8c7',
    initialDataType: [],
    // immediate: fetchData,
  });

  if (error) return <p>Error!</p>;
  if (isLoading)
    return (
      <div className="loader-wrapper">
        <LoadingIcon />
      </div>
    );

  return (
    <div className="fetch-page-wrapper">
      <p>
        This hook allows you to fetch data easily. It returns data on success, error on failure and
        a flag to indicate if the API is loading. It also gives you the control when to fetch data
        using a flag called <strong>immediate</strong>
      </p>
      {/*<button onClick={() => setFetchData(true)}>fetch data</button>*/}
      {data?.movies?.map((el, i) => (
        <div className="movie" key={i}>
          <img src={el.image} alt={el.name} />
          <p>
            <strong>Movie Name:</strong> {el.name}.<strong>director:</strong> {el.director}.
          </p>
        </div>
      ))}
    </div>
  );
};

export default FetchHookPage;
