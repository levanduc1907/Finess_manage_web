import { useState, useEffect } from 'react';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sources = new Map<string, Set<(params: any) => void>>();

export function dispatchAction<T>(key: string, newState: T) {
  const handlers = sources.get(key);
  if (!handlers) return;
  handlers.forEach(handler => {
    handler(newState);
  });
}

type TUseEventListener<T> = {
  initState: T;
  key: string;
};

export function useEventListeners<T extends Record<string, string | number | boolean | object | undefined>>({ key, initState }: TUseEventListener<T>) {
  const [state, setState] = useState<T>(initState);
  useEffect(() => {
    const handler = (newState: T) => {
      setState(() => newState);
    };

    let handlers = sources.get(key);
    if (!handlers) handlers = new Set<(newState: Partial<T>) => void>();

    handlers.add(handler);
    sources.set(key, handlers);

    return () => {
      const handlers = sources.get(key);
      if (!handlers) return;

      handlers?.delete(handler);
      sources.set(key, handlers);
    };
     
  }, []);

  return state;
}
