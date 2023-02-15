export const getHomePageUrl = () => '/use-magnify';
export const getTiltPageUrl = () => '/use-tilt';

export const getScriptPageUrl = () => '/use-external-script-style';
export const getLockScrollPageUrl = () => '/use-lock-scroll';
export const getKeyPressPageUrl = () => '/use-key-press';
export const getPreviousStatePageUrl = () => '/use-previous-state';

export const getRouterPageUrl = (id) => {
  if (id) {
    return `/use-router/${id}`;
  }
  return '/use-router/:id';
};

export const getIntervalPageUrl = () => '/use-interval';
export const getCountDownPageUrl = () => '/use-count-down';

export const getTimerPageUrl = () => '/timer';
export const getCopyToClipboardPageUrl = () => '/use-copy-to-clipboard';
export const getPageBottomPageUrl = () => '/use-page-bottom';
export const getWindowSizePageUrl = () => '/use-window-size';
export const getMobileDetectPageUrl = () => '/use-mobile-detect';
export const getDocumentTitlePageUrl = () => '/use-document-title';
export const getArrayPageUrl = () => '/use-array';
export const getFetchPageUrl = () => '/use-fetch';
export const getFetchWithServicePageUrl = () => '/use-fetch-with-service';
export const getEventListenerPageUrl = () => '/use-event-listener';

export const getEnterEscEventsPageUrl = () => '/use-enter-esc-events';
export const getDebouncePageUrl = () => '/use-debounce';
export const getBooleanPageUrl = () => '/use-boolean';
export const getPaginationHookPageUrl = () => '/use-pagination';
export const getAsyncPaginationHookPageUrl = () => '/use-async-pagination';
export const getDeepLinkingPaginationHookPageUrl = () => '/use-deep-linking-pagination';
export const getOutsideClickHookPageUrl = () => '/use-outside-click';
export const getTouchScreenDetectHookPageUrl = () => '/use-touch-screen-detect';
