import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//custom hooks
import useTouchScreenDetect from '@/js/customHooks/UseTouchScreenDetect';
//constants
import { getElementOffset, getScrollParent } from '@/js/constants/Helpers';
//components
import ConditionalWrapper from '@/js/components/shared/ConditionalWrapper';
import ClickAwayWrapper from '@/js/components/shared/ClickAwayWrapper';
import Portal from '@/js/components/shared/Portal';

export const ToolTipPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

const ToolTip = ({
  tooltipContent,
  position = ToolTipPosition.TOP,
  color,
  backgroundColor,
  className = '',
  messageClassName = '',
  disabled,
  isParentFixed,
  isDisplayTooltipIndicator = true,
  trigger = 'hover',
  children,
}) => {
  const { isTouchDevice } = useTouchScreenDetect(),
    [show, setShow] = useState(false),
    [styles, setStyles] = useState({}),
    tooltipWrapperRef = useRef(null),
    tooltipMessage = useRef(null),
    newPosition = useRef(position),
    space = 15,
    [childrenWidth, setChildrenWidth] = useState(undefined),
    [childrenHeight, setChildrenHeight] = useState(undefined),
    [isTooltipVisible, setIsTooltipVisible] = useState(false),
    [wrapperParentUpdated, setWrapperParentUpdated] = useState({
      top: 0,
      left: 0,
    }),
    availableTooltipPositions = useMemo(
      () => ({
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
      }),
      []
    ),
    isHoverTrigger = useMemo(() => trigger === 'hover', [trigger]),
    isClickTrigger = useMemo(() => trigger === 'click', [trigger]);

  //set children width and height
  useEffect(() => {
    if (show && childrenWidth === undefined && childrenHeight === undefined) {
      setChildrenHeight(tooltipMessage.current?.offsetHeight);
      setChildrenWidth(tooltipMessage.current?.offsetWidth);
    }
  }, [show, childrenWidth, childrenHeight]);

  //update tooltip visibility
  useEffect(() => {
    if (show && !isTooltipVisible && childrenWidth !== undefined && childrenHeight !== undefined) {
      setIsTooltipVisible(true);
    }
  }, [show, isTooltipVisible, childrenWidth, childrenHeight]);

  const showTooltip = () => {
    if (!show) {
      setShow(true);
      setStyles(getStylesList());
    }
  };

  const hideTooltip = () => {
    setShow(false);
  };

  const getStylesList = useCallback(() => {
    if (tooltipWrapperRef.current) {
      const wrapperRect = tooltipWrapperRef.current.getBoundingClientRect(),
        wrapperRef = tooltipWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef),
        style = {
          left: 0,
          top: 0,
        },
        centeredHorizontalPosition = Math.max(space, wrapperRect.left + wrapperRect.width / 2),
        centeredVerticalPosition =
          getElementOffset(tooltipWrapperRef.current).top + wrapperRect.height / 2;

      let pos = position;
      //if position is top and no room for tooltip => change position to bottom
      if (
        position === availableTooltipPositions.top &&
        wrapperRect.top < (childrenHeight || 0) + space
      ) {
        pos = ToolTipPosition.BOTTOM;
      }
      //if position is right and no room for tooltip => change position to left
      else if (
        position === availableTooltipPositions.right &&
        wrapperRect.right + ((childrenWidth || 0) + space * 1.5) > window.innerWidth
      ) {
        pos = ToolTipPosition.LEFT;
      }
      //if position is bottom and no room for tooltip => change position to top
      else if (
        position === availableTooltipPositions.bottom &&
        wrapperRect.bottom + (childrenHeight || 0) + space > window.innerHeight
      ) {
        pos = ToolTipPosition.TOP;
      }
      //if position is left and no room for tooltip => change position to right
      else if (
        position === availableTooltipPositions.left &&
        wrapperRect.left - ((childrenWidth || 0) + space * 1.5) < 0
      ) {
        pos = ToolTipPosition.RIGHT;
      }

      newPosition.current = pos;

      if (pos === availableTooltipPositions.top) {
        style.top = Math.max(
          space,
          getElementOffset(tooltipWrapperRef.current).top -
            (childrenHeight || 0) -
            (isDisplayTooltipIndicator ? space : space / 2)
        );
        style.left = centeredHorizontalPosition;
      } else if (pos === availableTooltipPositions.right) {
        style.top = centeredVerticalPosition;
        style.left = Math.max(space, wrapperRect.right + space / 2);
      } else if (pos === availableTooltipPositions.bottom) {
        style.top =
          getElementOffset(tooltipWrapperRef.current).top +
          wrapperRect.height +
          (isDisplayTooltipIndicator ? space : space / 2);
        style.left = centeredHorizontalPosition;
      } else if (pos === availableTooltipPositions.left) {
        style.top = centeredVerticalPosition;
        style.left = Math.max(space, wrapperRect.left - ((childrenWidth || 0) + space));
      }
      if (!isParentFixed && scrollableParent && wrapperParentUpdated) {
        style.top -= scrollableParent.scrollTop;
      }
      return style;
    }
    return {
      top: 0,
      left: 0,
    };
  }, [
    position,
    isParentFixed,
    childrenWidth,
    childrenHeight,
    wrapperParentUpdated,
    isDisplayTooltipIndicator,
    availableTooltipPositions,
  ]);

  useEffect(() => {
    //required for the first render and on scroll
    if (getStylesList().top !== styles.top || getStylesList().left !== styles.left) {
      setStyles(getStylesList());
    }
  }, [getStylesList, styles.left, styles.top]);

  const updateScrollableParentScroll = (event) => {
    setWrapperParentUpdated({
      top: event.target.scrollTop,
      left: event.target.scrollLeft,
    });
  };

  useEffect(() => {
    if (tooltipWrapperRef.current) {
      const wrapperRef = tooltipWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef);

      window.addEventListener('resize', updateScrollableParentScroll);
      scrollableParent.addEventListener('scroll', updateScrollableParentScroll);

      return () => {
        window.removeEventListener('resize', updateScrollableParentScroll);
        scrollableParent.removeEventListener('scroll', updateScrollableParentScroll);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (show && isClickTrigger) {
        setShow(false);
      }
    };

    if (tooltipWrapperRef.current) {
      const wrapperRef = tooltipWrapperRef.current,
        scrollableParent = getScrollParent(wrapperRef),
        newScrollableParent = scrollableParent === document.body ? window : scrollableParent;

      newScrollableParent.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        newScrollableParent.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [show, isClickTrigger]);

  return (
    <ConditionalWrapper
      condition={isClickTrigger}
      initialWrapper={(children) => <>{children}</>}
      wrapper={(children) => (
        <ClickAwayWrapper onClickAwayCallback={hideTooltip}>{children}</ClickAwayWrapper>
      )}
    >
      <div
        className={`tooltip ${className}`}
        onMouseEnter={
          isHoverTrigger
            ? disabled
              ? undefined
              : isTouchDevice
                ? undefined
                : showTooltip
            : undefined
        }
        onMouseLeave={
          isHoverTrigger
            ? disabled
              ? undefined
              : isTouchDevice
                ? undefined
                : hideTooltip
            : undefined
        }
        onTouchStart={
          isHoverTrigger
            ? disabled
              ? undefined
              : isTouchDevice
                ? showTooltip
                : undefined
            : undefined
        }
        onTouchEnd={
          isHoverTrigger
            ? disabled
              ? undefined
              : isTouchDevice
                ? hideTooltip
                : undefined
            : undefined
        }
        onClick={isClickTrigger ? (disabled ? undefined : showTooltip) : undefined}
        ref={tooltipWrapperRef}
        data-test="tooltip"
      >
        <Portal wrapperElement="span" wrapperElementId="tooltip">
          {show && tooltipContent && (
            <span
              ref={tooltipMessage}
              className={`tooltip-message 
   on-${newPosition.current} ${messageClassName} ${
     isDisplayTooltipIndicator ? 'is-indicator' : ''
   }`}
              dangerouslySetInnerHTML={{ __html: tooltipContent }}
              style={{
                color: color ? color : '#ffffff',
                '--background-color': backgroundColor ? backgroundColor : 'rgba(97, 97, 97, 0.92)',
                ...styles,
                ...(newPosition.current === availableTooltipPositions.left ||
                newPosition.current === availableTooltipPositions.top
                  ? { visibility: isTooltipVisible ? 'visible' : 'hidden' }
                  : {}),
              }}
            />
          )}
        </Portal>
        {children}
      </div>
    </ConditionalWrapper>
  );
};

export default ToolTip;
