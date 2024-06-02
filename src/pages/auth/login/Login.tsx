import { FormProvider, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';

import {
  LocalAccountService,
  TAccountLoginStatus,
  TError,
  ToastService,
  formatErrorMessage,
  useAppLanguage,
} from '@/utils/modules';

import { LoginSubmit } from './items/LoginSubmit';
import { LoginInputForm } from './items/LoginInputForm';
import { LoginTitle } from './items/LoginTitle';
import { FetchApi, TFetchBaseOutput } from '@/utils/FetchApi';

export type TLogin = {
  email: string;
  password: string;
};

export function Login() {
  const { Strings } = useAppLanguage();
  const navigate = useNavigate();

  const methods = useForm<TLogin>({
    mode: 'all',
  });

  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.login,
  });

  const handleLogin = async ({ email, password }: TLogin) => {
    try {
      console.log('aaaaa');
      const res = await mutateAsync({
        name: email,
        password,
      });
      const data = (await res.json()) as TFetchBaseOutput<{ token: string }>;
      console.log(data);
      if (data.code === '508') {
        ToastService.error(Strings.username_or_password_incorrect);
        return;
      }
      if (data.code !== '1000') {
        ToastService.error(Strings.unknown_error);
        return;
      }
      ToastService.success(Strings.login_success);
      LocalAccountService.set({
        ...data.data,
        state: TAccountLoginStatus.LOGIN,
      });
      navigate('/exercises', { replace: true });
    } catch (err) {
      ToastService.error(formatErrorMessage(err as TError));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleLogin)}>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '40px',
              width: '100%',
            }}
          >
            <LoginTitle />
            <LoginInputForm />
            <LoginSubmit loading={status === 'pending'} />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
