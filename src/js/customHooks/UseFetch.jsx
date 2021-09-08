import React, { useEffect, useState } from 'react';
//axios
import axios from 'axios';

const useFetch = (url = '', options = null, initialDataType) => {
	const [data, setData] = useState(initialDataType),
		[error, setError] = useState(''),
		[isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await axios(url, options);
				setData(res.data);
				setIsLoading(false);
			} catch (err) {
				//change it as needed
				setError(err.response);
				setIsLoading(false);
			}
		};

		if (isMounted) {
			fetchData();
		}

		return () => {
			isMounted = false;
		};
	}, [url, options]);

	return { isLoading, error, data };
};

export default useFetch;
