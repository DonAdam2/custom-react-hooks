import React, { useEffect, useState } from 'react';

const usePageBottom = () => {
	const [isBottom, setIsBottom] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const scrollTop =
				(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
			scrollHeight =
				(document.documentElement && document.documentElement.scrollHeight) ||
				document.body.scrollHeight,
			scrolledToBottom = scrollTop + window.innerHeight >= scrollHeight;

		setIsBottom(scrolledToBottom);
	};

	return isBottom;
};

export default usePageBottom;
