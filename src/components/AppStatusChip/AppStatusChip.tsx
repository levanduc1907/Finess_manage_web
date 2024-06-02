import { Chip, ChipProps } from '@mui/material';

type TAppStatusChipProps = ChipProps & {
  label: string;
};

export function AppStatusChip({ label, ...props }: TAppStatusChipProps) {
  return <Chip label={label} variant="outlined" {...props} />;
}
