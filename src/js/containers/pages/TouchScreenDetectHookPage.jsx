import React from 'react';
//custom hooks
import useTouchScreenDetect from '../../customHooks/UseTouchScreenDetect';

const TouchScreenDetectHookPage = () => {
	const isTouchScreen = useTouchScreenDetect();

	return (
		<div className="magnify-container">This is {isTouchScreen ? 'a' : 'not a'} touch screen</div>
	);
};

export default TouchScreenDetectHookPage;
