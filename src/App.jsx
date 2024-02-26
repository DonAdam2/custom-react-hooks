import { Route, Routes, Navigate } from 'react-router-dom';
//toast
import { ToastContainer } from 'react-toastify';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//routes
import { routes } from './js/routing/routingConstants/RoutesConfig';
import { getHomePageUrl } from './js/routing/routingConstants/AppUrls';
//pages
import NotFoundPage from './js/containers/pages/NotFoundPage';
//containers
import AppHeader from './js/containers/AppHeader';

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      //Reset the state of your app so the error doesn't happen again
      console.log('Try again clicked');
    }}
  >
    <AppHeader />
    <Routes>
      <Route path="/" element={<Navigate to={getHomePageUrl()} replace />} />
      {routes.map((route, routeIndex) => (
        <Route key={routeIndex} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <ToastContainer
      toastClassName={'custom-react-toastify'}
      icon={true}
      position="bottom-center"
      autoClose={2000}
      limit={1}
      pauseOnHover={true}
      hideProgressBar
    />
  </ErrorBoundary>
);

export default App;
