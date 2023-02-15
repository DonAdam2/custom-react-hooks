import useRouter from '@/js/customHooks/useRouter';
import { getRouterPageUrl } from '@/js/routing/routingConstants/AppUrls';

const RouterPage = () => {
  const { navigate, params, pathname, searchParams, setSearchParams, location } = useRouter();

  const navigateToCurrentPageWithArgs = () => {
    navigate(getRouterPageUrl('testId'));
  };

  const updateCurrentPageSearchParams = () => {
    setSearchParams({ post: '78787' });
  };

  return (
    <div>
      <p>This hook wraps all react router hooks and exposes just the data and methods we need.</p>
      <div>
        <button onClick={navigateToCurrentPageWithArgs}>Navigate to testId</button>
      </div>
      <div>
        <button onClick={updateCurrentPageSearchParams}>Update search params</button>
      </div>
      <p>Current pathname: {pathname}</p>
      <p>Current params: {JSON.stringify(params)}</p>
      <p>Current search params: {JSON.stringify(searchParams)}</p>
      <p>Current location: {JSON.stringify(location)}</p>
    </div>
  );
};

export default RouterPage;
