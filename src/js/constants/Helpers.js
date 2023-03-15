export const range = (fromPageNum, toPageNum, step = 1) => {
  let i = fromPageNum;
  const range = [];

  while (i <= toPageNum) {
    range.push(i);
    i += step;
  }

  return range;
};
