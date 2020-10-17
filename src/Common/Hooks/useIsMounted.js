import React from 'react';

export const useIsMounted = () => {
  const ref = React.useRef(false);
  React.useEffect(() => {
    ref.current = true;
    return () => (ref.current = false);
  }, []);
  return ref;
};
