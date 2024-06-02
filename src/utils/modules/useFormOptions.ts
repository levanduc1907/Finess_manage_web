import { useAppLanguage } from './language';

export const useFormOptions = () => {
  const { Strings } = useAppLanguage();
  const formOptions = {
    motivation: [
      {
        label: Strings.Motivation_screen_option_1_title,
        value: 'improve_shape',
      },
      {
        label: Strings.Motivation_screen_option_2_title,
        value: 'gain_weight',
      },
      {
        label: Strings.Motivation_screen_option_3_title,
        value: 'lose_fat',
      },
    ],
  };
  return { formOptions };
};
