import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

type TAppButtonProps = LoadingButtonProps;

export function AppButton({ children, ...props }: TAppButtonProps) {
  return (
    <LoadingButton {...props} loadingPosition="center">
      {children}
    </LoadingButton>
  );
}
