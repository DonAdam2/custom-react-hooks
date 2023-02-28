import { useCallback, useState } from 'react';

/*type useBooleanOutput = [
  boolean,
  {
    toggle: () => void,
    on: () => void,
    off: () => void,
    setValue: Dispatch<SetStateAction<boolean>>,
  }
];*/

// function useBoolean(initialValue: boolean): useBooleanOutput {
function useBoolean(initialValue) {
  const [value, setValue] = useState(initialValue);

  const updateValue = {
    toggle: useCallback(() => {
      setValue((prev) => !prev);
    }, []),
    on: useCallback(() => {
      setValue(true);
    }, []),
    off: useCallback(() => {
      setValue(false);
    }, []),
    setValue,
  };

  return [value, updateValue];
}

export default useBoolean;
