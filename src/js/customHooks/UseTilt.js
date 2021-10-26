import React, { useEffect, useRef } from 'react';

const useTilt = () => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const state = {
			rect: undefined,
			mouseX: undefined,
			mouseY: undefined,
		};

		let el = ref.current;

		const handleMouseMove = (e) => {
			if (!el) {
				return;
			}
			if (!state.rect) {
				state.rect = el.getBoundingClientRect();
			}
			state.mouseX = e.clientX;
			state.mouseY = e.clientY;
			const px = (state.mouseX - state.rect.left) / state.rect.width;
			const py = (state.mouseY - state.rect.top) / state.rect.height;

			el.style.setProperty('--px', px);
			el.style.setProperty('--py', py);
		};

		el.addEventListener('mousemove', handleMouseMove);

		return () => {
			el.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return ref;
};

export default useTilt;
