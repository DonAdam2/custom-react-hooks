export const convertQueryStringIntoObject = (query) => {
  const criteria = query.split('&');
  return criteria.reduce((acc, el, i) => {
    const [key, val] = el.split('=');
    let criteriaKey = key;
    //remove question mark
    if (i === 0) {
      criteriaKey = key.substr(1);
    }

    return { ...acc, [criteriaKey]: val };
  }, {});
};

export const convertObjectToQueryString = (paramsObj) => {
  const list = Object.entries(paramsObj);

  return list.reduce((acc, el, i) => {
    const [key, val] = el;
    return (acc += `${key}=${val}${i === list.length - 1 ? '' : '&'}`);
  }, '');
};

export const setTimeoutRAF = (fn, delay, registerCancel) => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn();
      registerCancel(() => {});
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
};
