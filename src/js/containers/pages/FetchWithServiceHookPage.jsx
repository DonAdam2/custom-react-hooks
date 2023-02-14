import { useCallback } from 'react';
//custom hooks
import useFetchWithService from '../../customHooks/UseFetchWithService';
//services
import MoviesService from '../../services/MoviesService';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';

const FetchWithServiceHookPage = () => {
  // const [fetchData, setFetchData] = useState(false);
  const api = useCallback(() => MoviesService.fetchMovies(), []),
    { data, isLoading, error } = useFetchWithService({
      api,
      initialDataType: {},
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

export default FetchWithServiceHookPage;
