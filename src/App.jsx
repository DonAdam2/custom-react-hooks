import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
//error boundary
import { ErrorBoundary } from 'react-error-boundary';
//error boundary fallback
import ErrorBoundaryFallback from './js/generic/ErrorBoundaryFallback';
//routes
import { routes } from './js/routing/routingConstants/RoutesConfig';
import { getHomePageUrl } from './js/routing/routingConstants/AppUrls';
//pages
import NotFoundPage from './js/containers/pages/NotFoundPage';

const App = () => (
	<ErrorBoundary
		FallbackComponent={ErrorBoundaryFallback}
		onReset={() => {
			//Reset the state of your app so the error doesn't happen again
			console.log('Try again clicked');
		}}
	>
		<Switch>
			<Route exact path="/" render={() => <Redirect to={getHomePageUrl()} />} />
			{routes.map((el, i) => (
				<Route path={el.path} render={(propRouter) => <el.Component {...propRouter} />} key={i} />
			))}
			<Route path="*" render={(propsRouter) => <NotFoundPage {...propsRouter} />} />
		</Switch>
	</ErrorBoundary>
);

export default hot(App);
