import { useCallback, useState } from 'react';

function useArray(arr) {
  const [value, setValue] = useState(arr);

  return {
    value,
    setValue,
    add: useCallback((a) => {
      setValue((prev) => [...prev, a]);
    }, []),
    clear: useCallback(() => {
      setValue([]);
    }, []),
    removeById: useCallback((id) => {
      setValue((prev) => prev.filter((el) => el.id !== id));
    }, []),
    removeByIndex: useCallback((index) => {
      setValue((prev) => {
        const clonedArray = [...prev];

        clonedArray.splice(index, 1);

        return clonedArray;
      });
    }, []),
  };
}

export default useArray;
