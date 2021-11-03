import React, { useEffect, useState } from 'react';
//axios
import axios from 'axios';
//constants
import { history } from '../../constants/AppConstants';
//custom hooks
import useDeepLinkingPagination from '../../customHooks/UseDeepLinkingPagination';
//components
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';

const DeepLinkingPaginationHookPage = () => {
	const [people, setPeople] = useState([]),
		[isLoading, setIsLoading] = useState(false),
		[error, setError] = useState(false),
		{
			currentPageNum,
			totalPages,
			paginationBlocks,
			navigateToNextPage,
			navigateToPrevPage,
			navigateToPage,
			navigateToFirstPage,
			navigateToLastPage,
			navigateToNextPaginationBlock,
			navigateToPrevPaginationBlock,
			firstContentIndex,
			lastContentIndex,
		} = useDeepLinkingPagination({
			contentPerPage: 3,
			count: people.length,
			history,
			deepLinkingData: {
				pageNumKey: 'page',
			},
		});

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await axios.get('https://random-data-api.com/api/users/random_user?size=20');
				setPeople([...res.data, ...res.data]);
			} catch {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="loader-wrapper">
					<LoadingIcon />
				</div>
			) : error ? (
				<h2>Error fetching data</h2>
			) : (
				<div className="container">
					{people.slice(firstContentIndex, lastContentIndex).map((el, i) => (
						<Person
							key={i}
							id={i}
							firstName={el.first_name}
							lastName={el.last_name}
							jobTitle={el.employment.title}
							status={el.subscription.status}
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

export default DeepLinkingPaginationHookPage;
