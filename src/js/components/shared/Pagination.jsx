import { Fragment } from 'react';
//components
import LoadingIcon from './loadingIcon/LoadingIcon';
import ToolTip from '@/js/components/shared/TooTip';
//icons
import ChevronDoubleLeftIcon from '@/js/components/icons/ChevronDoubleLeftIcon';
import ChevronLeftIcon from '@/js/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/js/components/icons/ChevronRightIcon';
import ChevronDoubleRightIcon from '@/js/components/icons/ChevronDoubleRightIcon';
import DotsHorizontalIcon from '@/js/components/icons/DotsHorizontalIcon';

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
  isDisplayNavigateToFirstOrLastPageButtons = true,
  toolTipText,
  activePageColors,
}) => {
  const { prevThreePages = 'Previous 3 pages', nextThreePages = 'Next 3 pages' } =
      toolTipText ?? {},
    { lightColor = '#4776e6', darkColor = '#8e54e9' } = activePageColors ?? {},
    isPrevButtonDisabled =
      currentPageNum === 1 ||
      totalPages === 0 ||
      !paginationBlocks.includes(currentPageNum) ||
      isNaN(totalPages),
    isNextButtonDisabled =
      currentPageNum === totalPages ||
      totalPages === 0 ||
      !paginationBlocks.includes(currentPageNum) ||
      isNaN(totalPages);

  return (
    <div className="pagination-wrapper">
      {isLoading && (
        <div className="center-loader-wrapper">
          <LoadingIcon />
        </div>
      )}
      <ul>
        {isDisplayNavigateToFirstOrLastPageButtons && (
          <li className="pagination-icon-wrapper">
            <ChevronDoubleLeftIcon
              onClick={navigateToFirstPage}
              className={`first-page-nav pagination-nav ${
                isPrevButtonDisabled ? 'disabled-el' : ''
              }`}
            />
          </li>
        )}
        <li className="pagination-icon-wrapper">
          <ChevronLeftIcon
            onClick={navigateToPrevPage}
            className={`first-page-nav pagination-nav  ${
              isPrevButtonDisabled ? 'disabled-el' : ''
            }`}
          />
        </li>
        {paginationBlocks.length > 0 ? (
          paginationBlocks.map((el) => (
            <Fragment key={el}>
              {el === 'LEFT' && (
                <li onClick={navigateToPrevPaginationBlock} className="pagination-icon-wrapper">
                  <ToolTip className="is-inline-flex" tooltipContent={prevThreePages}>
                    <DotsHorizontalIcon className="pagination-nav inner-pagination-nav" />
                  </ToolTip>
                </li>
              )}
              {el !== 'LEFT' && el !== 'RIGHT' && (
                <li
                  onClick={() => navigateToPage(el)}
                  className={currentPageNum === el ? 'active' : ''}
                >
                  <span
                    className="pagination-link-number"
                    style={{
                      '--light-color': lightColor,
                      '--dark-color': darkColor,
                    }}
                  >
                    {el}
                  </span>
                </li>
              )}
              {el === 'RIGHT' && (
                <li onClick={navigateToNextPaginationBlock} className="pagination-icon-wrapper">
                  <ToolTip className="is-inline-flex" tooltipContent={nextThreePages}>
                    <DotsHorizontalIcon className="pagination-nav inner-pagination-nav" />
                  </ToolTip>
                </li>
              )}
            </Fragment>
          ))
        ) : (
          <li className="active">
            <span className="pagination-link-number">1</span>
          </li>
        )}
        <li className="pagination-icon-wrapper">
          <ChevronRightIcon
            onClick={navigateToNextPage}
            className={`pagination-nav ${isNextButtonDisabled ? 'disabled-el' : ''}`}
          />
        </li>
        {isDisplayNavigateToFirstOrLastPageButtons && (
          <li className="pagination-icon-wrapper">
            <ChevronDoubleRightIcon
              onClick={navigateToLastPage}
              className={`last-page-nav pagination-nav ${
                isNextButtonDisabled ? 'disabled-el' : ''
              }`}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
