import { TAccountKey, TAccount } from './_types';

export const LocalAccountService = {
  get: () => {
    const accountValue = window.localStorage.getItem(
      TAccountKey.LOCAL_STORAGE_KEY,
    );
    if (accountValue) {
      try {
        return JSON.parse(accountValue) as TAccount;
      } catch (error) {
        return {} as TAccount;
      }
    }
    return {} as TAccount;
  },
  set: (value: TAccount = {}) => {
    if (localStorage) {
      localStorage.setItem(
        TAccountKey.LOCAL_STORAGE_KEY,
        JSON.stringify(value),
      );
    }
  },
};
