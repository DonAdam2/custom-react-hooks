import React from 'react';

const DrawerToggleButton = ({ show, click }) => (
	<button className="toggle-button" onClick={click}>
		{show ? <i className="fas fa-times" /> : <i className="fas fa-bars" />}
	</button>
);

export default DrawerToggleButton;
