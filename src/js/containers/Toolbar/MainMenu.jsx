import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem';

const MainMenu = ({ links, closeSideDrawer }) => {
	let navigationItems = links.map((el, i) =>
		el.children === undefined ? (
			<NavigationItem
				key={i}
				url={el.url}
				label={el.label}
				clicked={() => {
					closeSideDrawer ? closeSideDrawer() : null;
				}}
			/>
		) : (
			<li key={i}>
				<a>
					{el.label} <i className="fas fa-chevron-down" />
				</a>
				<ul className="hidden main-menu-dropdown">
					{el.children.map((childEl, i) => (
						<NavigationItem
							key={i}
							url={childEl.url}
							label={childEl.label}
							clicked={() => {
								closeSideDrawer ? closeSideDrawer() : null;
							}}
						/>
					))}
				</ul>
			</li>
		)
	);
	return (
		<Fragment>
			<div className="main-navigation">
				<ul>{navigationItems}</ul>
			</div>
		</Fragment>
	);
};

export default MainMenu;
