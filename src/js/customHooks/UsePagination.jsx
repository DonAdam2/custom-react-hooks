import React, { useState } from 'react';

const usePagination = ({ contentPerPage, count }) => {
	const [currentPageNum, setCurrentPageNum] = useState(1),
		// number of pages in total (total items / content on each page)
		pageCount = Math.ceil(count / contentPerPage),
		// index of last item of current page
		lastContentIndex = currentPageNum * contentPerPage,
		// index of first item of current page
		firstContentIndex = lastContentIndex - contentPerPage;

	// change page based on direction either front or back
	const changePage = (isNextPage) => {
		setCurrentPageNum((state) => {
			// move forward
			if (isNextPage) {
				// if page is the last page, do nothing
				if (state === pageCount) {
					return state;
				}
				return state + 1;
				// go back
			} else {
				// if page is the first page, do nothing
				if (state === 1) {
					return state;
				}
				return state - 1;
			}
		});
	};

	const navigateToPage = (num) => {
		// if number is greater than number of pages, set to last page
		if (num > pageCount) {
			setCurrentPageNum(pageCount);
			// if number is less than 1, set page to first page
		} else if (num < 1) {
			setCurrentPageNum(1);
		} else {
			setCurrentPageNum(num);
		}
	};

	return {
		totalPages: pageCount,
		navigateToNextPage: () => changePage(true),
		navigateToPrevPage: () => changePage(false),
		navigateToPage,
		firstContentIndex,
		lastContentIndex,
		currentPageNum,
	};
};

export default usePagination;
