import React, { useCallback, useEffect, useState } from 'react';

const usePageBottom = () => {
	const [isBottom, setIsBottom] = useState(false);

	const handleScroll = useCallback(() => {
		const scrollTop =
				(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
			scrollHeight =
				(document.documentElement && document.documentElement.scrollHeight) ||
				document.body.scrollHeight,
			scrolledToBottom = scrollTop + window.innerHeight >= scrollHeight;

		setIsBottom(scrolledToBottom);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return isBottom;
};

export default usePageBottom;
