import { Divider, DividerProps } from '@mui/material';

type TDividerProps = DividerProps & {
  spacing?: number;
  size?: number;
};
export function AppDivider({
  sx,
  spacing = 2,
  size = 1,
  ...props
}: TDividerProps) {
  return (
    <Divider
      {...props}
      component="div"
      sx={{
        ...sx,
        my: spacing,
        borderBottomWidth: size,
        borderColor: theme => theme.palette.neutral[300],
      }}
    />
  );
}
