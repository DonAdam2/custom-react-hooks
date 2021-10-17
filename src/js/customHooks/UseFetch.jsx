import React, { useEffect, useState } from 'react';
//axios
import axios from 'axios';

const useFetch = (url = '', options = null, initialDataType) => {
	const [data, setData] = useState(initialDataType),
		[error, setError] = useState(''),
		[isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			(async () => {
				setIsLoading(true);
				try {
					const res = await axios(url, options);
					setData(res.data);
				} catch (err) {
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
	}, [url, options]);

	return { isLoading, error, data };
};

export default useFetch;
