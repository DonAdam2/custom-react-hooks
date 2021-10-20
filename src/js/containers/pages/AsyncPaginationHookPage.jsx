import React, { useCallback, useEffect, useState } from 'react';
//axios
import axios from 'axios';
//custom hooks
import useAsyncPagination from '../../customHooks/UseAsyncPagination';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';

const AsyncPaginationHookPage = () => {
	const [totalCount, setTotalCount] = useState(0),
		[people, setPeople] = useState([]),
		[isLoading, setIsLoading] = useState(false),
		[error, setError] = useState(false),
		perPage = 10;

	const fetchData = useCallback(async (pageNum) => {
		setIsLoading(true);
		try {
			const res = await axios.get('https://api.instantwebtools.net/v1/passenger', {
				params: {
					page: pageNum,
					size: perPage,
				},
			});
			setPeople(res.data.data);
			setTotalCount(res.data.totalPassengers);
		} catch {
			setError(true);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const {
		totalPages,
		currentPageNum,
		paginationBlocks,
		navigateToPage,
		navigateToNextPage,
		navigateToPrevPage,
		navigateToFirstPage,
		navigateToLastPage,
		navigateToNextPaginationBlock,
		navigateToPrevPaginationBlock,
	} = useAsyncPagination({
		contentPerPage: perPage,
		count: totalCount,
		fetchData: (num) => fetchData(num - 1),
	});

	useEffect(() => {
		fetchData(0);
	}, [fetchData]);

	return (
		<>
			{error ? (
				<h2>Error fetching data</h2>
			) : (
				<div className="container">
					{people.map((el) => (
						<Person
							key={el._id}
							id={el._id}
							firstName={el.name}
							jobTitle={`Made ${el.trips} trips`}
							status="active"
						/>
					))}
					<Pagination
						currentPageNum={currentPageNum}
						totalPages={totalPages}
						paginationBlocks={paginationBlocks}
						navigateToPage={navigateToPage}
						navigateToNextPage={navigateToNextPage}
						navigateToPrevPage={navigateToPrevPage}
						navigateToFirstPage={navigateToFirstPage}
						navigateToLastPage={navigateToLastPage}
						navigateToNextPaginationBlock={navigateToNextPaginationBlock}
						navigateToPrevPaginationBlock={navigateToPrevPaginationBlock}
						isLoading={isLoading}
					/>
				</div>
			)}
		</>
	);
};

export default AsyncPaginationHookPage;
