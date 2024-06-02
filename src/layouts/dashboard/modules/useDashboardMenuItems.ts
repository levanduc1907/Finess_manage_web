import { useAppLanguage } from '@/utils/modules';

import { exerciseIcon } from '@/utils/resources/icons/exerciseIcon';
import ListAltIcon from '@mui/icons-material/ListAlt';
export const useDashboardMenuItems = () => {
  const { Strings } = useAppLanguage();
  return [
    {
      label: Strings.manage_exercise,
      href: '/exercises',
      icon: exerciseIcon,
    },

    {
      label: Strings.manage_set,
      href: '/sets',
      icon: ListAltIcon,
    },
  ];
};
