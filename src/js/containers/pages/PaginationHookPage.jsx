import React, { useEffect, useState } from 'react';
//axios
import axios from 'axios';
//custom hooks
import usePagination from '../../customHooks/UsePagination';
//components
import Person from '../../components/Person';
import Pagination from '../../components/shared/Pagination';
import LoadingIcon from '../../components/shared/loadingIcon/LoadingIcon';

const PaginationHookPage = () => {
	const [people, setPeople] = useState([]),
		[isLoading, setIsLoading] = useState(false),
		[error, setError] = useState(false),
		{
			totalPages,
			navigateToNextPage,
			navigateToPrevPage,
			navigateToPage,
			firstContentIndex,
			lastContentIndex,
			currentPageNum,
		} = usePagination({
			contentPerPage: 3,
			count: people.length,
		});

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const data = await axios.get('https://random-data-api.com/api/users/random_user?size=20');
				setPeople(data.data);
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
					{people.slice(firstContentIndex, lastContentIndex).map((el) => (
						<Person
							key={el.uid}
							id={el.uid}
							firstName={el.first_name}
							lastName={el.last_name}
							jobTitle={el.employment.title}
							status={el.subscription.status}
						/>
					))}
					<Pagination
						currentPageNum={currentPageNum}
						totalPages={totalPages}
						nextPage={navigateToNextPage}
						prevPage={navigateToPrevPage}
						navigateToPage={navigateToPage}
						isLoading={isLoading}
					/>
				</div>
			)}
		</>
	);
};

export default PaginationHookPage;
