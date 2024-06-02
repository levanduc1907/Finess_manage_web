import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from '@mui/material';

type TAppCheckboxGroupProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> & {
  label?: string;
  required?: boolean;
  options: {
    label: string;
    value: string | number | boolean;
    placement?: 'end' | 'start' | 'top' | 'bottom';
  }[];
};

export function AppCheckboxGroup<T>({
  control,
  name,
  label,
  defaultValue,
  rules,
  options,
  required,
  disabled,
}: TAppCheckboxGroupProps<T>) {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl required={required} disabled={disabled}>
            {label && (
              <FormLabel
                sx={{
                  color: theme => theme.palette.text.primary,
                }}
              >
                {label}
              </FormLabel>
            )}
            <FormGroup row defaultValue={defaultValue}>
              {options.map(({ label, value, placement = 'end' }, idx) => {
                return (
                  <FormControlLabel
                    sx={{
                      color: theme => theme.palette.neutral[500],
                      fontSize: 16,
                    }}
                    key={idx}
                    value={value}
                    name={name}
                    onChange={() => {
                      if (field.value?.includes(value)) {
                        field.onChange(
                          field.value?.filter((v: string) => v !== value),
                        );
                      } else {
                        field.onChange([...(field.value || []), value]);
                      }
                    }}
                    control={
                      <Checkbox
                        checked={field.value?.includes(value)}
                        sx={{
                          color: theme => theme.palette.neutral[400],
                          '&.Mui-checked': {
                            color: theme => theme.palette.primary.main,
                          },
                        }}
                      />
                    }
                    label={label}
                    labelPlacement={placement}
                  />
                );
              })}
            </FormGroup>
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
