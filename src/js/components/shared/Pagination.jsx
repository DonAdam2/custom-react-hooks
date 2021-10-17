import React from 'react';
import PropTypes from 'prop-types';
//components
import LoadingIcon from './loadingIcon/LoadingIcon';

const Pagination = ({
	currentPageNum,
	totalPages,
	prevPage,
	navigateToPage,
	nextPage,
	isLoading,
}) => (
	<div className="pagination-wrapper">
		{isLoading ? (
			<LoadingIcon />
		) : (
			<div className="custom-pagination">
				<i
					onClick={prevPage}
					className={`far fa-chevron-left pagination-nav ${
						currentPageNum === 1 ? 'disabled-el' : ''
					}`}
				/>
				<ul>
					{[...Array(totalPages).keys()].map((el) => (
						<li
							onClick={async () => await navigateToPage(el + 1)}
							key={el}
							className={currentPageNum === el + 1 ? 'active' : ''}
						>
							<span className="pagination-link">{el + 1}</span>
						</li>
					))}
				</ul>
				<i
					onClick={nextPage}
					className={`far fa-chevron-right pagination-nav ${
						currentPageNum === totalPages ? 'disabled-el' : ''
					}`}
				/>
			</div>
		)}
	</div>
);

Pagination.propTypes = {
	currentPageNum: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	prevPage: PropTypes.func.isRequired,
	navigateToPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default Pagination;
