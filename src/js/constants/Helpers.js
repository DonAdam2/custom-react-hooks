export const getPaginationRange = (fromPageNum, toPageNum, step = 1) => {
  let i = fromPageNum;
  const range = [];

  while (i <= toPageNum) {
    range.push(i);
    i += step;
  }

  return range;
};

const regex = /(auto|scroll)/;

const style = (node, prop) => getComputedStyle(node, null).getPropertyValue(prop);

const scroll = (node) =>
  regex.test(style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x'));

export const getScrollParent = (node) =>
  !node || node === document.body
    ? document.body
    : scroll(node)
      ? node
      : getScrollParent(node.parentNode);

// get {top, left} of the required element
export function getElementOffset(el) {
  let _x = 0,
    _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

export function createWrapperAndAppendToBody(wrapper, wrapperElementId) {
  const wrapperElement = document.createElement(wrapper);
  wrapperElement.setAttribute('id', wrapperElementId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
