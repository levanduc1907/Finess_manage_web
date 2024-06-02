export const createDebounceHandler = function (ms: number) {
  let timer: NodeJS.Timeout;
  return function debounce<T>(handler: (_params: T) => void, params: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      _params => {
        handler(_params);
      },
      ms,
      params,
    );
  };
};
