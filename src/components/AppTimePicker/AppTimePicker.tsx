import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type TAppTimePickerProps<D, T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  TimePickerProps<D> & {
    placeholder?: string;
    required?: boolean;
  };

export function AppTimePicker<D, T>({
  name,
  control,
  rules,
  defaultValue,
  disabled,
  placeholder,
  format,
  required,
  ...props
}: TAppTimePickerProps<D, T>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        disabled={disabled}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            ampm={false}
            format={format}
            slotProps={{
              textField: {
                required: required,
                error: !!error,
                helperText: error?.message,
                fullWidth: true,
                placeholder: placeholder,
                InputLabelProps: {
                  shrink: true,
                },
              },
            }}
            {...field}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );
}
