import React, { useEffect, useRef } from 'react';

const useMagnify = (magnifyTimes) => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const state = {
			src: undefined,
			ratio: undefined,
			imgWidth: undefined,
		};

		let el = ref.current;

		Object.assign(el.style, {
			backgroundPosition: 'center',
			backgroundSize: '100%',
			backgroundRepeat: 'no-repeat',
			transition: 'background-size 90ms ease-in',
		});

		const handleMouseLeave = (e) => {
			Object.assign(el.style, {
				backgroundPosition: 'center',
				backgroundSize: '100%',
			});
		};

		const handleMouseMove = (e) => {
			const boxWidth = el.clientWidth,
				xPos = e.pageX - el.offsetLeft,
				yPos = e.pageY - el.offsetTop,
				xPercent = `${xPos / (boxWidth / 100)}%`,
				yPercent = `${yPos / ((boxWidth * state.ratio) / 100)}%`;

			Object.assign(el.style, {
				backgroundPosition: `${xPercent} ${yPercent}`,
				backgroundSize: `${state.imgWidth * magnifyTimes}px`,
			});
		};

		const getImageRatio = (e) => {
			if (!el) {
				return;
			}
			if (!state.src) {
				let imageSrc = el.currentStyle || window.getComputedStyle(el, false);
				state.src = imageSrc.backgroundImage.slice(4, -1).replace(/"/g, '');
			}
			const img = new Image();
			img.src = state.src;

			img.onload = () => {
				const imgWidth = img.naturalWidth,
					imgHeight = img.naturalHeight;
				state.ratio = imgHeight / imgWidth;
				state.imgWidth = imgWidth;

				el.addEventListener('mousemove', handleMouseMove);
				el.addEventListener('mouseleave', handleMouseLeave);
			};
		};

		getImageRatio();

		return () => {
			el.removeEventListener('mousemove', handleMouseMove);
			el.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return ref;
};

export default useMagnify;
