import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type TUseRouteHighlightBlock = {
  blockHashName?: string;
};

export function useRouteHighlightBlock({
  blockHashName,
}: TUseRouteHighlightBlock) {
  const { hash } = useLocation();
  const [isBlockActive, setIsBlockActive] = useState(false);

  const className = useMemo(() => {
    return isBlockActive ? 'pulse-effect' : '';
  }, [isBlockActive]);

  useEffect(() => {
    if (hash === `#${blockHashName}`) {
      setIsBlockActive(true);
    }
  }, [blockHashName, hash]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsBlockActive(false);
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [isBlockActive]);

  return {
    className,
  } as const;
}
