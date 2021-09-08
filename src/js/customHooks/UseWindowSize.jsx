import React, { useEffect, useState } from 'react';

const useWindowSize = () => {
	const isSSR = typeof window !== 'undefined',
		[windowSize, setWindowSize] = useState({
			width: isSSR ? 1200 : window.innerWidth,
			height: isSSR ? 800 : window.innerHeight,
		});

	function changeWindowSize() {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	}

	useEffect(() => {
		window.addEventListener('resize', changeWindowSize);

		return () => {
			window.removeEventListener('resize', changeWindowSize);
		};
	}, []);

	return windowSize;
};

export default useWindowSize;
