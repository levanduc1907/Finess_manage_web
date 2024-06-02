export enum TAccountLoginStatus {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export enum TAccountKey {
  LOCAL_STORAGE_KEY = 'account',
}

export enum TAccountEventName {
  CHANGE_ACCOUNT = 'onAccountChange',
}

export type TAccount = {
  id?: string;
  username?: string | null;
  token?: string;
  refreshToken?: string;
  state?: TAccountLoginStatus;
};
