import axios from 'axios';
import { TApiMethod, TApiRequest, TApiResponse } from './_types';
import { LocalAccountService } from '../account/account-service';
import { TAccountLoginStatus } from '../account/_types';
import { SERVICE_NAMES } from './http-endpoint';

export class Http {
  name?: string;
  endpoint?: string;

  constructor(name?: string, endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint;
    }
    if (name) {
      this.name = name;
    }
  }

  private async fetch<T>(
    url: string,
    { method, body, params }: TApiMethod,
  ): Promise<TApiResponse<T>> {
    const reqUrl = this.endpoint + url;
    const { token } = LocalAccountService.get();
    const headers: HeadersInit = {
      authorization: `Bearer ${token || ''}`,
    };

    try {
      const response = await axios({
        url: reqUrl,
        method,
        params,
        headers,
        data: body,
      });

      return response.data as TApiResponse<T>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: object | any) {
      const result = err.response?.data;
      const isAccessTokenExpired = result?.message?.includes('jwt expired');

      const isUnauthorize = result?.error?.includes('Unauthorized');

      // in case the token is not valid, logout and redirect to login
      if (isUnauthorize) {
        LocalAccountService.set({ state: TAccountLoginStatus.LOGOUT });
        window.location.href = '/login';
      }

      if (!isAccessTokenExpired) {
        throw result as TApiResponse<T>;
      }

      // in case access token is expired, refresh new access token and refresh token
      const isValidToken = await this.handleRefreshToken();

      if (!isValidToken) {
        throw new Error('Token is invalid, please login again.');
      }

      const { token: newToken } = LocalAccountService.get();

      // if token is valid, set new access token to headers
      headers.authorization = `Bearer ${newToken || ''}`;

      // re-call api with new access token
      const response = await axios(url, {
        method,
        params,
        headers,
        data: body,
      });

      return response.data as TApiResponse<T>;
    }
  }

  // RefreshToken
  private async handleRefreshToken() {
    try {
      const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT;

      // Set refresh_token to be POST
      const { refreshToken } = LocalAccountService.get();

      const { data } = await axios(apiUrl + SERVICE_NAMES.AUTH + '/refresh', {
        method: 'post',
        data: { token: refreshToken },
      });

      const { token: newToken, refreshToken: newRefreshToken } = data.data;

      // set new access token and refresh token to cookie
      if (newToken && newRefreshToken) {
        LocalAccountService.set({
          ...LocalAccountService.get(),
          token: newToken,
          refreshToken: newRefreshToken,
        });
        return true;
      }

      LocalAccountService.set({ state: TAccountLoginStatus.LOGIN });
      return false;
    } catch {
      LocalAccountService.set({ state: TAccountLoginStatus.LOGOUT });
      return false;
    }
  }

  public get<T>({
    url,
    params,
  }: TApiRequest<object, object>): Promise<TApiResponse<T>> {
    return this.fetch(url, { method: 'get', params });
  }

  public post<T>({
    url,
    body,
    params,
  }: TApiRequest<object, object>): Promise<TApiResponse<T>> {
    return this.fetch(url, { method: 'post', body, params });
  }

  public put<T>({
    url,
    body,
    params,
  }: TApiRequest<object, object>): Promise<TApiResponse<T>> {
    return this.fetch(url, { method: 'put', body, params });
  }

  public delete<T>({
    url,
    body,
    params,
  }: TApiRequest<object, object>): Promise<TApiResponse<T>> {
    return this.fetch(url, { method: 'delete', body, params });
  }

  public patch<T>({
    url,
    body,
    params,
  }: TApiRequest<object, object>): Promise<TApiResponse<T>> {
    return this.fetch(url, { method: 'patch', body, params });
  }
}
