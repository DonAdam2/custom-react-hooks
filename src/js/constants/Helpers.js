export const convertQueryStringIntoObject = (query) => {
	const criteria = query.split('&');
	return criteria.reduce((acc, el, i) => {
		const [key, val] = el.split('=');
		let criteriaKey = key;
		//remove question mark
		if (i === 0) {
			criteriaKey = key.substr(1);
		}

		return { ...acc, [criteriaKey]: val };
	}, {});
};

export const convertObjectToQueryString = (paramsObj) => {
	const list = Object.entries(paramsObj);

	return list.reduce((acc, el, i) => {
		const [key, val] = el;
		return (acc += `${key}=${val}${i === list.length - 1 ? '' : '&'}`);
	}, '');
};
