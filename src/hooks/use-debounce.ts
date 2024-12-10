import { useCallback, useState } from 'react';

export function useDebounceFnc(delay?: number) {
  const [timeoutId, setTimeoutId] = useState<
    string | number | NodeJS.Timeout
  >();

  const debounce = useCallback(
    (callback: () => any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(callback, delay || 1000);
      setTimeoutId(id);
    },
    [delay, timeoutId],
  );

  return debounce;
}
