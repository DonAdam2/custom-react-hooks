import React, { useEffect, useState } from 'react';

const useMobileDetect = () => {
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent,
			mobile = Boolean(
				userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
			);
		setMobile(mobile);
	}, []);

	return { isMobile };
};

export default useMobileDetect;
