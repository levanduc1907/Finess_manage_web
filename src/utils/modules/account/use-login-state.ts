import { useLocation } from 'react-router-dom';
import { isEmpty } from '../helper';
import { TAccountLoginStatus } from './_types';
import { useAppAccount } from './use-app-account';
import { useEffect } from 'react';

export function useStateLogin() {
  const appAccount = useAppAccount();
  const { pathname } = useLocation();

  useEffect(() => {
    appAccount.getLatestLocalAccount();
  }, [pathname]);

  if (isEmpty(appAccount?.account)) {
    appAccount.setValue({ state: TAccountLoginStatus.LOGOUT });
    return false;
  }
  if (appAccount?.account?.state !== TAccountLoginStatus.LOGIN) {
    return false;
  }

  return true;
}
