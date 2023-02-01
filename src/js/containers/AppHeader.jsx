import { useState } from 'react';
//routes
import { routes } from '../routing/routingConstants/RoutesConfig';
import { getHomePageUrl } from '../routing/routingConstants/AppUrls';
//containers
import Toolbar from './Toolbar/Toolbar';

const AppHeader = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false),
    navigationLinks = routes.map((el) => ({ label: el.label, url: el.path }));

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen((prev) => !prev);
  };

  const closeSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

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
