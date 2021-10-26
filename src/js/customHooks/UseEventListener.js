import { useEffect, useRef } from 'react';

const useEventListener = (eventType = '', listener = () => null, target = null, options = null) => {
	//used to store and persist the listener function across renders.
	const savedListener = useRef();

	useEffect(() => {
		savedListener.current = listener;
	}, [listener]);

	useEffect(() => {
		if (!target?.addEventListener) return;

		const eventListener = (event) => savedListener.current(event);

		target.addEventListener(eventType, eventListener, options);

		return () => {
			target.removeEventListener(eventType, eventListener, options);
		};
	}, [eventType, target, options]);
};

export default useEventListener;
