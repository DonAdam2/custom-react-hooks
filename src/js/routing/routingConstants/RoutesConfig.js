//URLs
import { getHomePageUrl } from './AppUrls';
//pages
import MagnifyHookPage from '../../containers/pages/MagnifyHookPage';

export const routes = [
	{
		path: getHomePageUrl(),
		Component: MagnifyHookPage,
	},
];
