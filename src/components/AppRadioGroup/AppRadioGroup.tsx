import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';

type TAppRadioGroupProps<T, U extends string = string> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> & {
  label: string;
  options: {
    label: string;
    value: string | number | boolean | U;
    placement?: 'end' | 'start' | 'top' | 'bottom';
  }[];
  required?: boolean;
  outline?: boolean;
};

export function AppRadioGroup<T>({
  control,
  name,
  label,
  defaultValue,
  rules,
  options,
  required,
  outline = true,
}: TAppRadioGroupProps<T>) {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              sx={{
                // mt: -1,
                width: '100%',
                position: 'relative',
                border: theme =>
                  error
                    ? `1px solid ${theme.palette.error.main}`
                    : `1px solid #C4C4C4`,
                borderRadius: theme => theme.shape.borderRadius / 2,
                px: 1,
                boxSizing: 'border-box',
                height: outline ? '46px' : 'auto',
                '&:hover': {
                  borderColor: '#000',
                },
              }}
            >
              <FormLabel
                required={required}
                sx={{
                  // color: theme => theme.palette.text.primary,
                  mb: 1,
                  position: 'absolute',
                  fontSize: 12,
                  background: theme => theme.palette.common.white,
                  padding: '0 6px',
                  top: -10,
                  left: 8,
                  color: theme =>
                    error
                      ? theme.palette.error.main
                      : theme.palette.neutral[500],
                  fontWeight: 500,
                }}
              >
                {label}
              </FormLabel>
              <RadioGroup
                row
                defaultValue={defaultValue}
                {...field}
                value={field.value}
                name={field.name}
              >
                {options.map(({ label, value, placement = 'end' }, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      value={value}
                      control={
                        <Radio
                          checked={value === field.value}
                          sx={{
                            color: theme => theme.palette.neutral[400],
                            '&.Mui-checked': {
                              color: theme => theme.palette.primary,
                            },
                          }}
                        />
                      }
                      label={label}
                      labelPlacement={placement}
                      sx={{
                        color: theme => theme.palette.neutral[500],
                        '& span': {
                          fontSize: '16px !important',
                        },
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {!!error && (
              <FormHelperText sx={{ ml: 2 }} error>
                {error?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}
