import { useMemo } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function useRouter() {
  const params = useParams(), //dynamic URL parts
    [searchParams, setSearchParams] = useSearchParams(), //search query params
    navigate = useNavigate(),
    location = useLocation();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      navigate,
      location,
      pathname: location.pathname,
      params,
      searchParams: Array.from(searchParams.entries()).reduce(function (acc, arr) {
        acc[arr[0]] = arr[1];
        return acc;
      }, {}),
      setSearchParams,
    };
  }, [navigate, location, params, searchParams, setSearchParams]);
}

export default useRouter;
