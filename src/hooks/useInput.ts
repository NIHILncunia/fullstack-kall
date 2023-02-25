import { useCallback, useState } from 'react';

export const useInput = (ref: React.MutableRefObject<HTMLInputElement>, id: string) => {
  const [ value, setValue, ] = useState('');

  const onChange = useCallback(() => {
    setValue(ref.current.value);
  }, [ ref, ]);

  return {
    data: {
      value, onChange, id,
    },
    setValue,
  };
};
