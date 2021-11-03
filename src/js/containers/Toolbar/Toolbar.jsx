import React, { useCallback, useEffect } from 'react';
import Backdrop from './Backdrop';
import DrawerToggleButton from './DrawerToggleButton';
import MainMenu from './MainMenu';
import Logo from './Logo';

const Toolbar = ({
	onWindowResize,
	logoType,
	logoLabel,
	logoUrl,
	logoSvg,
	isOpenSideDrawer,
	links,
	toggleSideDrawer,
	homePageUrl,
	children,
}) => {
	// will be triggered on window resize
	const handleResizeEvent = useCallback(() => {
		if (window.innerWidth > 768) {
			onWindowResize();
		}
	}, [onWindowResize]);

	useEffect(() => {
		window.addEventListener('resize', handleResizeEvent);

		return () => {
			window.removeEventListener('resize', handleResizeEvent);
		};
	}, [handleResizeEvent]);

	return (
		<header className="toolbar">
			<div className="toolbar-navigation">
				<Logo
					url={homePageUrl}
					logoType={logoType}
					logoLabel={logoLabel ? logoLabel : null}
					logoUrl={logoUrl ? logoUrl : null}
					logoSvg={logoSvg ? logoSvg : null}
				/>
				<div className="spacer" />
				<nav className={`toolbar-navigation-items ${isOpenSideDrawer ? 'open-side-drawer' : ''}`}>
					<MainMenu links={links} closeSideDrawer={onWindowResize} />
					{children}
				</nav>
				<div className="toolbar-toggle-button">
					<DrawerToggleButton show={isOpenSideDrawer} click={toggleSideDrawer} />
				</div>
			</div>
			<Backdrop show={isOpenSideDrawer} click={toggleSideDrawer} />
		</header>
	);
};
export default Toolbar;
