import React, { useRef, useState, useLayoutEffect } from 'react';

declare let ResizeObserver;

export function useHeight({ on = true /* no value means on */ } = {} as any) {
  const ref = useRef<any>();
  const [height, set] = useState(0);
  const heightRef = useRef(height);
  const [ro] = useState(
    () =>
      new ResizeObserver((packet) => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight;
          set(ref.current.offsetHeight);
        }
      }),
  );
  useLayoutEffect(() => {
    if (on && ref.current) {
      set(ref.current.offsetHeight);
      ro.observe(ref.current, {});
    }
    return () => ro.disconnect();
  }, [on, ref.current]);

  return [ref, height as any];
}
