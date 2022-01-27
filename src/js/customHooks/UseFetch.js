import React, { useEffect, useReducer } from 'react';
//axios
import axios from 'axios';

const initialState = (initialDataType) => ({
	isLoading: false,
	data: initialDataType,
	error: undefined,
});

const asyncReducer = (initialDataType) => (state, action) => {
	switch (action.type) {
		case 'pending': {
			return { ...initialState(initialDataType), isLoading: true };
		}
		case 'resolved': {
			return { ...initialState(initialDataType), data: action.data };
		}
		case 'rejected': {
			return { ...initialState(initialDataType), error: action.error };
		}
		default: {
			return state;
		}
	}
};

const useFetch = (url = '', options = null, initialDataType) => {
	const [state, dispatch] = useReducer(
		asyncReducer(initialDataType),
		initialState(initialDataType)
	);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			(async () => {
				dispatch({ type: 'pending' });
				try {
					const res = await axios(url, options);
					dispatch({ type: 'resolved', data: res.data });
				} catch (err) {
					console.log(err);
					dispatch({ type: 'rejected', error: err });
				}
			})();
		}

		return () => {
			isMounted = false;
		};
	}, [url, options]);

	return { isLoading: state.isLoading, error: state.error, data: state.data };
};

export default useFetch;
