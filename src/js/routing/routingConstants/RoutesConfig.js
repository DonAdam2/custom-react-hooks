//URLs
import { getHomePageUrl, getTiltPageUrl } from './AppUrls';
//pages
import MagnifyHookPage from '../../containers/pages/MagnifyHookPage';
import TiltHookPage from '../../containers/pages/TiltHookPage';

export const routes = [
	{
		path: getHomePageUrl(),
		Component: MagnifyHookPage,
		label: 'Magnify',
	},
	{
		path: getTiltPageUrl(),
		Component: TiltHookPage,
		label: 'Tilt',
	},
];
