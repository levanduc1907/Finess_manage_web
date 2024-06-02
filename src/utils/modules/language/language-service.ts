import { CheckLogic } from '../../resources';
import {
  LOCAL_STORAGE_LANGUAGE_KEY,
  LanguageMap,
  TLanguageCode,
} from './_type';

export const LanguageService = {
  setCode: (code: TLanguageCode) =>
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, code),
  getCode: () => {
    return (
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ||
      CheckLogic.Language_code.vi
    );
  },
  get: () => {
    const code: TLanguageCode =
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ??
      CheckLogic.Language_code.vi;
    return LanguageMap[code];
  },
};
