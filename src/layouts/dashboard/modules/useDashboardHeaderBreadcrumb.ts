import { useAppLanguage } from '@/utils/modules';

export const useDashboardHeaderBreadcrumb = () => {
  const { Strings } = useAppLanguage();

  const getBreadcrumb = (pathname: string) => {
    if (pathname === '/dashboard' || pathname === '/') return Strings.dashboard;
    if (pathname.includes('/exercise')) return Strings.manage_exercise;
    if (pathname.includes('/set')) return Strings.manage_set;
    return '';
  };

  return {
    getBreadcrumb,
  };
};
