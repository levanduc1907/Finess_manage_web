export const CheckLogic = {
  No_internet: 'Network request failed',
  Unexpected_json: 'Unexpected end of JSON input',
  Parse_error: 'JSON Parse error: Unexpected end of input',
  Unexpected_end: 'Unexpected end of input',
  Account_state: {
    login: 'login',
    logout: 'logout',
  },
  User_status: {
    navigating: 'navigating',
    normal: 'normal',
  },
  Language_code: {
    en: 'en',
    vi: 'vi',
  },
  Theme: {
    base_device: 'base_device',
    light: 'light',
    dark: 'dark',
  },
  Click_notification_action: {
    detail_page: 'DETAIL_PAGE',
    url: 'URL',
    browser: 'URL_BROWSER',
  },
  Noti_type: {
    All_new: 'ALL',
    Only_metion: 'MENTION',
    None: 'NONE',
  },
  Storage_key: {
    app_intro: 'app-intro',
  },

  error: {
    username_or_passowrd_incorrect: 'The Username or Password is Incorrect',
  },
};
// FIXME
export function getI18nPath<T>(key: string, code: string) {
  // if (code === 'en') code = 'vi';
  return `${key?.toString()}_${code}` as keyof T;
}
