import { useEffect, useState } from 'react';
import EventEmitter from 'events';

import { LanguageService } from './language-service';
import { LanguageMap, TLanguageCode } from './_type';

const eventEmitter = new EventEmitter();

export function useAppLanguage() {
  const initialLanguageCode = LanguageService.getCode();
  const [languageCode, setLanguageCode] =
    useState<TLanguageCode>(initialLanguageCode);

  let language = LanguageMap[languageCode];

  const handleSetLanguage = (newCode: TLanguageCode) => {
    setLanguageCode(newCode);
    LanguageService.setCode(newCode);
    eventEmitter.emit('languageChange', newCode);
    language = LanguageMap[languageCode];
  };

  useEffect(() => {
    const handleLanguageChange = (newCode: TLanguageCode) => {
      setLanguageCode(newCode);
    };
    eventEmitter.on('languageChange', handleLanguageChange);
    return () => {
      eventEmitter.off('languageChange', handleLanguageChange);
    };
  }, []);

  return {
    Strings: language,
    setLanguageCode: handleSetLanguage,
    code: languageCode,
  };
}
