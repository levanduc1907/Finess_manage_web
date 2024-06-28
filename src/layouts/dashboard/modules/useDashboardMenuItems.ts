import { useAppLanguage } from '@/utils/modules';

import { exerciseIcon } from '@/utils/resources/icons/exerciseIcon';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventAvailable from '@mui/icons-material/EventAvailable';
import FastfoodIcon from '@mui/icons-material/Fastfood';
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
    {
      label: Strings.manage_schedule,
      href: '/schedule',
      icon: EventAvailable,
    },
    {
      label: Strings.manage_food,
      href: '/food',
      icon: FastfoodIcon,
    },
  ];
};
