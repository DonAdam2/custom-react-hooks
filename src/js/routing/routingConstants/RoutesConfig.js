//URLs
import {
  getArrayPageUrl,
  getAsyncPaginationHookPageUrl,
  getBooleanPageUrl,
  getCopyToClipboardPageUrl,
  getCountDownPageUrl,
  getDebouncePageUrl,
  getDeepLinkingPaginationHookPageUrl,
  getDocumentTitlePageUrl,
  getEnterEscEventsPageUrl,
  getEventListenerPageUrl,
  getFetchPageUrl,
  getFetchWithServicePageUrl,
  getHomePageUrl,
  getIntervalPageUrl,
  getKeyPressPageUrl,
  getLockScrollPageUrl,
  getMobileDetectPageUrl,
  getOutsideClickHookPageUrl,
  getPageBottomPageUrl,
  getPaginationHookPageUrl,
  getPreviousStatePageUrl,
  getRouterPageUrl,
  getScriptPageUrl,
  getTiltPageUrl,
  getTimerPageUrl,
  getTouchScreenDetectHookPageUrl,
  getWindowSizePageUrl,
} from './AppUrls';
//pages
import MagnifyHookPage from '../../containers/pages/MagnifyHookPage';
import TiltHookPage from '../../containers/pages/TiltHookPage';
import IntervalHookPage from '../../containers/pages/IntervalHookPage';
import CopyToClipboardHookPage from '../../containers/pages/CopyToClipboardHookPage';
import PageBottomHookPage from '../../containers/pages/PageBottomHookPage';
import WindowSizeHookPage from '../../containers/pages/WindowSizeHookPage';
import MobileDetectHookPage from '../../containers/pages/MobileDetectHookPage';
import DocumentTitleHookPage from '../../containers/pages/DocumentTitleHookPage';
import ArrayHookPage from '../../containers/pages/ArrayHookPage';
import FetchHookPage from '../../containers/pages/FetchHookPage';
import EventListenerHookPage from '../../containers/pages/EventListenerHookPage';
import BooleanHookPage from '../../containers/pages/BooleanHookPage';
import PaginationHookPage from '../../containers/pages/PaginationHookPage';
import FetchWithServiceHookPage from '../../containers/pages/FetchWithServiceHookPage';
import AsyncPaginationHookPage from '../../containers/pages/AsyncPaginationHookPage';
import OutsideClickHookPage from '../../containers/pages/OutsideClickHookPage';
import TouchScreenDetectHookPage from '../../containers/pages/TouchScreenDetectHookPage';
import DeepLinkingPaginationHookPage from '../../containers/pages/DeepLinkingPaginationHookPage';
import CountDownPage from '@/js/containers/pages/CountDownPage';
import TimerPage from '@/js/containers/pages/TimerPage';
import EnterEscEventsPage from '@/js/containers/pages/EnterEscEventsPage';
import DebouncePage from '@/js/containers/pages/DebouncePage';
import RouterPage from '@/js/containers/pages/RouterPage';
import ScriptPage from '@/js/containers/pages/ScriptPage';
import LockScrollPage from '@/js/containers/pages/LockScrollPage';
import KeyPressPage from '@/js/containers/pages/KeyPressPage';
import PreviousValuePage from '@/js/containers/pages/PreviousValuePage';

export const routes = [
  {
    path: getEventListenerPageUrl(),
    element: <EventListenerHookPage />,
    label: 'Event listener',
  },
  {
    path: getKeyPressPageUrl(),
    element: <KeyPressPage />,
    label: 'Key press',
  },
  {
    path: getEnterEscEventsPageUrl(),
    element: <EnterEscEventsPage />,
    label: 'Enter & ESC events',
  },
  {
    path: getPageBottomPageUrl(),
    element: <PageBottomHookPage />,
    label: 'Page bottom',
  },
  {
    path: getWindowSizePageUrl(),
    element: <WindowSizeHookPage />,
    label: 'Window size',
  },
  {
    path: getLockScrollPageUrl(),
    element: <LockScrollPage />,
    label: 'Lock scroll',
  },
  {
    path: getOutsideClickHookPageUrl(),
    element: <OutsideClickHookPage />,
    label: 'Outside click',
  },
  {
    path: getMobileDetectPageUrl(),
    element: <MobileDetectHookPage />,
    label: 'Mobile detect',
  },
  {
    path: getTouchScreenDetectHookPageUrl(),
    element: <TouchScreenDetectHookPage />,
    label: 'Touch screen',
  },
  {
    path: getPaginationHookPageUrl(),
    element: <PaginationHookPage />,
    label: 'Pagination',
  },
  {
    path: getAsyncPaginationHookPageUrl(),
    element: <AsyncPaginationHookPage />,
    label: 'Async pagination',
  },
  {
    path: getDeepLinkingPaginationHookPageUrl(),
    element: <DeepLinkingPaginationHookPage />,
    label: 'Deep linking pagination',
  },
  {
    path: getArrayPageUrl(),
    element: <ArrayHookPage />,
    label: 'Array',
  },
  {
    path: getBooleanPageUrl(),
    element: <BooleanHookPage />,
    label: 'Boolean',
  },
  {
    path: getCopyToClipboardPageUrl(),
    element: <CopyToClipboardHookPage />,
    label: 'Copy to clipboard',
  },
  {
    path: getDocumentTitlePageUrl(),
    element: <DocumentTitleHookPage />,
    label: 'Document title',
  },
  {
    path: getScriptPageUrl(),
    element: <ScriptPage />,
    label: 'External script | style',
  },
  {
    path: getCountDownPageUrl(),
    element: <CountDownPage />,
    label: 'Count down',
  },
  {
    path: getIntervalPageUrl(),
    element: <IntervalHookPage />,
    label: 'Interval',
  },
  {
    path: getTimerPageUrl(),
    element: <TimerPage />,
    label: 'Timer',
  },
  {
    path: getDebouncePageUrl(),
    element: <DebouncePage />,
    label: 'Debounce',
  },
  {
    path: getFetchPageUrl(),
    element: <FetchHookPage />,
    label: 'Fetch',
  },
  {
    path: getFetchWithServicePageUrl(),
    element: <FetchWithServiceHookPage />,
    label: 'Fetch with service',
  },
  {
    path: getHomePageUrl(),
    element: <MagnifyHookPage />,
    label: 'Magnify',
  },
  {
    path: getTiltPageUrl(),
    element: <TiltHookPage />,
    label: 'Tilt',
  },
  {
    path: getPreviousStatePageUrl(),
    element: <PreviousValuePage />,
    label: 'Previous value',
  },
  {
    path: getRouterPageUrl(),
    element: <RouterPage />,
    label: 'Router',
  },
];
