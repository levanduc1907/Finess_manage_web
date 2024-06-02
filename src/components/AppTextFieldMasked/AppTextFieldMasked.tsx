import { ReactNode, forwardRef } from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { IMaskInput, IMaskInputProps } from 'react-imask';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

type TAppTextFieldMaskedProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  TextFieldProps & {
    prefix?: ReactNode;
    postfix?: ReactNode;
    unit?: string;
  } & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mask: IMaskInputProps<any>;
  };

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export function AppTextFieldMasked<T>({
  control,
  name,
  label,
  defaultValue,
  placeholder,
  rules,
  prefix,
  postfix,
  mask,
  unit,
  ...props
}: TAppTextFieldMaskedProps<T>) {
  const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          {...mask}
          inputRef={ref}
          onAccept={value => {
            onChange({ target: { name: props.name, value } });
          }}
          overwrite
        />
      );
    },
  );

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            {...props}
            error={!!error}
            fullWidth
            helperText={error?.message}
            placeholder={placeholder}
            InputProps={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: TextMaskCustom as unknown as any,
              startAdornment: prefix,
              endAdornment: (
                <>
                  {postfix}
                  {unit && (
                    <InputAdornment position="end">{unit}</InputAdornment>
                  )}
                </>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            label={label}
          />
        );
      }}
    />
  );
}
