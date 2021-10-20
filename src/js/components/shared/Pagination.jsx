import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//components
import LoadingIcon from './loadingIcon/LoadingIcon';

const Pagination = ({
	currentPageNum,
	totalPages,
	paginationBlocks,
	navigateToPage,
	navigateToNextPage,
	navigateToPrevPage,
	navigateToFirstPage,
	navigateToLastPage,
	navigateToNextPaginationBlock,
	navigateToPrevPaginationBlock,
	isLoading,
}) => {
	const isPrevButtonDisabled = currentPageNum === 1 || totalPages === 0,
		isNextButtonDisabled = currentPageNum === totalPages || totalPages === 0;

	return (
		<div className="pagination-wrapper">
			{isLoading ? (
				<div className="center-loader-wrapper">
					<LoadingIcon />
				</div>
			) : (
				<div className="custom-pagination">
					<i
						onClick={navigateToFirstPage}
						className={`far fa-chevron-double-left first-page-nav pagination-nav ${
							isPrevButtonDisabled ? 'disabled-el' : ''
						}`}
					/>
					<i
						onClick={navigateToPrevPage}
						className={`far fa-chevron-left pagination-nav ${
							isPrevButtonDisabled ? 'disabled-el' : ''
						}`}
					/>
					<ul>
						{paginationBlocks.map((el) => (
							<Fragment key={el}>
								{el === 'LEFT' && (
									<li
										onClick={navigateToPrevPaginationBlock}
										className={currentPageNum === el ? 'active' : ''}
									>
										<i className="far fa-arrow-left pagination-nav inner-pagination-nav" />
									</li>
								)}
								{el !== 'LEFT' && el !== 'RIGHT' && (
									<li
										onClick={async () => await navigateToPage(el)}
										className={currentPageNum === el ? 'active' : ''}
									>
										<span className="pagination-link">{el}</span>
									</li>
								)}
								{el === 'RIGHT' && (
									<li
										onClick={navigateToNextPaginationBlock}
										className={currentPageNum === el ? 'active' : ''}
									>
										<i className="far fa-arrow-right pagination-nav inner-pagination-nav" />
									</li>
								)}
							</Fragment>
						))}
					</ul>
					<i
						onClick={navigateToNextPage}
						className={`far fa-chevron-right pagination-nav ${
							isNextButtonDisabled ? 'disabled-el' : ''
						}`}
					/>
					<i
						onClick={navigateToLastPage}
						className={`far fa-chevron-double-right last-page-nav pagination-nav ${
							isNextButtonDisabled ? 'disabled-el' : ''
						}`}
					/>
				</div>
			)}
		</div>
	);
};

Pagination.propTypes = {
	currentPageNum: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	paginationBlocks: PropTypes.array.isRequired,
	navigateToPage: PropTypes.func.isRequired,
	navigateToNextPage: PropTypes.func.isRequired,
	navigateToPrevPage: PropTypes.func.isRequired,
	navigateToFirstPage: PropTypes.func.isRequired,
	navigateToLastPage: PropTypes.func.isRequired,
	navigateToNextPaginationBlock: PropTypes.func.isRequired,
	navigateToPrevPaginationBlock: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default Pagination;
