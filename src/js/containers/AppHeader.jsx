import React from 'react';
import { NavLink } from 'react-router-dom';
//routes
import { routes } from '../routing/routingConstants/RoutesConfig';

const AppHeader = () => (
	<div className="header-wrapper">
		{routes.map((el, i) => (
			<NavLink key={i} to={el.path} exact={el.exact}>
				{el.label}
			</NavLink>
		))}
	</div>
);

export default AppHeader;
