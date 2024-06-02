export type TApiRequest<B, P> = {
  url: string;
  body?: B;
  params?: P;
};

export type TApiResponse<T> = {
  readonly status?: number;
  readonly statusCode?: number;
  readonly message?: string;
  readonly data?: T;
  readonly success?: boolean;
  readonly error?: boolean;
  readonly total?: boolean;
};

export type TApiResponseList<T> = {
  readonly data?: T[];
  readonly limit?: number;
  readonly totalCount?: number;
  readonly totalPages?: number;
};


export type TApiMethod = {
  readonly method: string;
  readonly body?: object;
  readonly params?: object;
};
