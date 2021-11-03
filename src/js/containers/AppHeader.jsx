import React, { useCallback, useState } from 'react';
//routes
import { routes } from '../routing/routingConstants/RoutesConfig';
import Toolbar from './Toolbar/Toolbar';
import { getHomePageUrl } from '../routing/routingConstants/AppUrls';

const AppHeader = () => {
	const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false),
		navigationLinks = routes.map((el) => ({ label: el.label, url: el.path }));

	const toggleSideDrawer = () => {
		setIsSideDrawerOpen((prev) => !prev);
	};

	const closeSideDrawer = useCallback(() => {
		setIsSideDrawerOpen(false);
	}, []);

	return (
		<Toolbar
			toggleSideDrawer={toggleSideDrawer}
			onWindowResize={closeSideDrawer}
			isOpenSideDrawer={isSideDrawerOpen}
			links={navigationLinks}
			homePageUrl={getHomePageUrl()}
			logoType="text"
			logoLabel="Custom hooks"
		/>
	);
};

export default AppHeader;
