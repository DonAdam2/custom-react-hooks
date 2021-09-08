//URLs
import {
	getCopyToClipboardPageUrl,
	getHomePageUrl,
	getIntervalPageUrl,
	getTiltPageUrl,
} from './AppUrls';
//pages
import MagnifyHookPage from '../../containers/pages/MagnifyHookPage';
import TiltHookPage from '../../containers/pages/TiltHookPage';
import IntervalHookPage from '../../containers/pages/IntervalHookPage';
import CopyToClipboardPage from '../../containers/pages/CopyToClipboardPage';

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
	{
		path: getIntervalPageUrl(),
		Component: IntervalHookPage,
		label: 'Interval',
	},
	{
		path: getCopyToClipboardPageUrl(),
		Component: CopyToClipboardPage,
		label: 'Copy to clipboard',
	},
];
