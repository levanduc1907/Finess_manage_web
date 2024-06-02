import { CheckLogic, EnglishString, VietnameseString } from '@/utils/resources';

export type TLanguageKey = keyof typeof CheckLogic.Language_code;
export type TLanguageCode = (typeof CheckLogic.Language_code)[TLanguageKey];

const TAG = 'language-code';
export const LOCAL_STORAGE_LANGUAGE_KEY = `key-${TAG}`;

export const LanguageMap = {
  [CheckLogic.Language_code.vi]: VietnameseString,
  [CheckLogic.Language_code.en]: EnglishString,
};
