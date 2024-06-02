import { useState, useEffect } from 'react';
import EventEmitter from 'events';

import { TAccountEventName, TAccount } from './_types';
import { LocalAccountService } from './account-service';

const eventEmitter = new EventEmitter();

export function useAppAccount() {
  const [value, setValue] = useState<TAccount>(LocalAccountService.get());

  const handleSet = (newValue: TAccount) => {
    setValue(newValue);
    LocalAccountService.set(newValue);
    eventEmitter.emit(TAccountEventName.CHANGE_ACCOUNT, newValue);
  };

  const getLatestLocalAccount = () => {
    return handleSet(LocalAccountService.get());
  };

  useEffect(() => {
    const handleAccountChange = (newValue: TAccount) => {
      setValue(newValue);
    };
    eventEmitter.on(TAccountEventName.CHANGE_ACCOUNT, handleAccountChange);
    return () => {
      eventEmitter.off(TAccountEventName.CHANGE_ACCOUNT, handleAccountChange);
    };
  }, []);

  return {
    account: value,
    setValue: handleSet,
    getLatestLocalAccount,
  } as const;
}
