//URLs
import {
	getCopyToClipboardPageUrl,
	getHomePageUrl,
	getIntervalPageUrl,
	getPageBottomPageUrl,
	getTiltPageUrl,
	getWindowSizePageUrl,
} from './AppUrls';
//pages
import MagnifyHookPage from '../../containers/pages/MagnifyHookPage';
import TiltHookPage from '../../containers/pages/TiltHookPage';
import IntervalHookPage from '../../containers/pages/IntervalHookPage';
import CopyToClipboardHookPage from '../../containers/pages/CopyToClipboardHookPage';
import PageBottomHookPage from '../../containers/pages/PageBottomHookPage';
import WindowSizeHookPage from '../../containers/pages/WindowSizeHookPage';

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
		Component: CopyToClipboardHookPage,
		label: 'Copy to clipboard',
	},
	{
		path: getPageBottomPageUrl(),
		Component: PageBottomHookPage,
		label: 'Page bottom',
	},
	{
		path: getWindowSizePageUrl(),
		Component: WindowSizeHookPage,
		label: 'Window size',
	},
];
