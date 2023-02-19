import { ChangeEvent, useCallback, useState } from 'react';

export const useCheckbox = () => {
  const [ items, setItems, ] = useState<string[]>([]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value, } = e.target;

    if (checked) {
      setItems((prev) => [ ...prev, value, ]);
    } else {
      setItems(items.filter((item) => item !== value));
    }
  }, [ items, ]);

  return {
    items,
    onChange,
  };
};
