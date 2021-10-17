import React, { useState } from 'react';

const useAsyncPagination = ({ contentPerPage, count, fetchData }) => {
	const [currentPageNum, setCurrentPageNum] = useState(1),
		pageCount = Math.ceil(count / contentPerPage);

	const changePage = async (isNextPage) => {
		try {
			if (isNextPage) {
				if (currentPageNum !== pageCount) {
					await fetchData(currentPageNum + 1);
				}
			} else {
				if (currentPageNum !== 1) {
					await fetchData(currentPageNum - 1);
				}
			}

			setCurrentPageNum((prev) => {
				if (isNextPage) {
					if (prev === pageCount) {
						return prev;
					}
					return prev + 1;
				} else {
					if (prev === 1) {
						return prev;
					}
					return prev - 1;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const navigateToPage = async (num) => {
		try {
			if (num > pageCount) {
				setCurrentPageNum(pageCount);
			} else if (num < 1) {
				setCurrentPageNum(1);
			} else {
				if (num !== currentPageNum) {
					await fetchData(num);
					setCurrentPageNum(num);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const resetPageNum = () => {
		setCurrentPageNum(1);
	};

	return {
		currentPageNum,
		totalPages: pageCount,
		navigateToNextPage: () => changePage(true),
		navigateToPrevPage: () => changePage(false),
		navigateToPage,
		resetPageNum,
	};
};

export default useAsyncPagination;
