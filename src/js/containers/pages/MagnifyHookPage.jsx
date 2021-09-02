import React from 'react';
//custom hooks
import useMagnify from '../../customHooks/UseMagnify';

const MagnifyHookPage = () => {
	const ref = useMagnify(1.1);

	return (
		<div className="magnify-container">
			<h3>Hover over the image to zoom in</h3>
			<div className="zoom" ref={ref} />
		</div>
	);
};

export default MagnifyHookPage;
