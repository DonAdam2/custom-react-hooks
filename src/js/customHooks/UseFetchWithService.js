import React, { useEffect, useState } from 'react';

const useFetchWithService = ({ api, initialDataType }) => {
	const [data, setData] = useState(initialDataType),
		[error, setError] = useState(''),
		[isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			(async () => {
				setIsLoading(true);
				try {
					const res = await api();
					setData(res.data);
				} catch (err) {
					console.log(err);
					//TODO: change it as needed
					setError(err.response);
				} finally {
					setIsLoading(false);
				}
			})();
		}

		return () => {
			isMounted = false;
		};
	}, [api]);

	return {
		isLoading,
		error,
		data,
	};
};

export default useFetchWithService;
