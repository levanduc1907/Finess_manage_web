import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppLanguage } from '@/utils/modules';

type TAppDatePickerProps<D, T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  DatePickerProps<D> & {
    required?: boolean;
    clearable?: boolean;
  };

export function AppDatePicker<D, T>({
  name,
  control,
  rules,
  defaultValue,
  disabled,
  required,
  ...props
}: TAppDatePickerProps<D, T>) {
  const { Strings } = useAppLanguage();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{
        cancelButtonLabel: Strings.cancel,
        clearButtonLabel: Strings.clear,
        okButtonLabel: Strings.confirm,
      }}
    >
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        disabled={disabled}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            format="YYYY/MM/DD"
            slotProps={{
              actionBar: {
                actions: ['clear', 'cancel', 'accept'],
              },
              textField: {
                required: required,
                error: !!error,
                helperText: error?.message,
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
                value: field.value || undefined,
                placeholder: Strings.date_placeholder,
              },
            }}
            {...field}
            {...props}
            inputRef={field.ref}
          />
        )}
      />
    </LocalizationProvider>
  );
}
