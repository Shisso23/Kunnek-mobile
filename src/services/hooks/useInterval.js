import { useEffect, useRef } from 'react';

export default (callBack, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callBack;
  }, [callBack]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callBack, delay]);
};
