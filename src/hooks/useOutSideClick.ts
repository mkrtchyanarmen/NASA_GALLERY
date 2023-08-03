import { useEffect } from 'react';

interface ComponenteRef<T> {
  readonly current: T | null;
}

const useOutSideClick = (ref: ComponenteRef<HTMLDivElement | HTMLElement>, close: () => void) => {
  useEffect(() => {
    const windowListener: EventListenerOrEventListenerObject = (event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      close();
    };

    window.addEventListener('mousedown', windowListener);
    window.addEventListener('touchstart', windowListener, { passive: true });

    return () => {
      window.removeEventListener('mousedown', windowListener);
      window.removeEventListener('touchstart', windowListener);
    };
    // eslint-disable-next-line
  }, [ref]);
};

export default useOutSideClick;
