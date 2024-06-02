import { useFormContext } from 'react-hook-form';

import { Stack } from '@mui/system';
import { useAppLanguage } from '@/utils/modules';

import { TLogin } from '../Login';
import { AppTextField } from '@/components';

export function LoginInputForm(): JSX.Element {
  const { Strings } = useAppLanguage();
  const { control } = useFormContext<TLogin>();

  return (
    <Stack spacing={3}>
      <AppTextField
        control={control}
        name="email"
        label={Strings.email_or_username}
        rules={{
          required: {
            value: true,
            message: Strings.email_or_username_not_empty,
          },
        }}
      />

      <AppTextField
        control={control}
        name="password"
        label={Strings.password}
        secureTextEntry
        rules={{
          required: {
            value: true,
            message: Strings.password_not_empty,
          },
        }}
      />
    </Stack>
  );
}
