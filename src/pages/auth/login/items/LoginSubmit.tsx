import { AppButton } from '@/components';

import { useAppLanguage } from '@/utils/modules';

type TLoginSubmitProps = {
  loading?: boolean;
};

export function LoginSubmit({ loading }: TLoginSubmitProps) {
  const { Strings } = useAppLanguage();

  return (
    <AppButton
      fullWidth
      size="large"
      sx={{ mt: 3 }}
      type="submit"
      variant="contained"
      loading={loading}
      loadingPosition="start"
    >
      {Strings.login}
    </AppButton>
  );
}
