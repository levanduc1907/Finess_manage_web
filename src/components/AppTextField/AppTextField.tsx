import { useState } from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';

type TAppTextFieldProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  TextFieldProps & {
    secureTextEntry?: boolean;
    clearable?: boolean;
    unit?: string;
  };

export function AppTextField<T>({
  control,
  name,
  label,
  defaultValue,
  placeholder,
  rules,
  secureTextEntry,
  clearable,
  unit,
  ...props
}: TAppTextFieldProps<T>) {
  const [secure, setSecure] = useState(false);

  const renderSecure = () => {
    if (!secureTextEntry) {
      return null;
    }

    const toggleSecure = () => {
      setSecure(!secure);
    };
    return (
      <InputAdornment position="end" disablePointerEvents={props.disabled}>
        <IconButton size="small" onClick={toggleSecure} edge="end">
          {(secure && <VisibilityOff />) || <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  const type = () => {
    return (!secureTextEntry && 'text') || (secure && 'text') || 'password';
  };

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          error={!!error}
          fullWidth
          {...field}
          {...props}
          value={field.value || ''}
          helperText={error?.message}
          placeholder={placeholder}
          InputProps={{
            endAdornment: [
              clearable && field.value ? (
                <IconButton
                  size="small"
                  sx={{
                    fontSize: 10,
                    color: 'grey.500',
                    '& svg': { fontSize: 20 },
                  }}
                  onClick={() => field.onChange('')}
                >
                  <ClearIcon />
                </IconButton>
              ) : null,
              renderSecure(),
              unit && <InputAdornment position="end">{unit}</InputAdornment>,
            ],
            ...props.InputProps,
            inputProps: {
              inputMode: 'numeric',
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          type={type()}
        />
      )}
    />
  );
}
