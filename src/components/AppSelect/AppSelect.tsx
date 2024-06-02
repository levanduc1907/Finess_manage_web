import { ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppLanguage } from '@/utils/modules';

export type TSelectOption = {
  label: string | ReactNode;
  value: string | number;
};

export type TAppSelectProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  TextFieldProps & {
    options?: TSelectOption[];
    maxHeightChildren?: number;
    multiple?: boolean;
    postOnChange?: (value: string | number | boolean) => void;
    clearable?: boolean;
    renderItems?: () => ReactNode;
    onCustomChange?: (
      value: string | number | boolean,
      formSetValue: (value: string | number | boolean) => void,
    ) => void;
  };

export function AppSelect<T>({
  control,
  name,
  label,
  defaultValue,
  placeholder,
  rules,
  options,
  maxHeightChildren = 300,
  multiple,
  clearable,
  postOnChange,
  renderItems,
  onCustomChange,
  ...props
}: TAppSelectProps<T>) {
  const { Strings } = useAppLanguage();
  const renderSelectOptions = () => {
    if (renderItems) {
      return renderItems();
    }
    if (!options || options.length === 0) {
      return <MenuItem disabled>{Strings.no_data}</MenuItem>;
    }
    return options?.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
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
          select
          value={field.value}
          {...field}
          {...props}
          onChange={e => {
            if (onCustomChange) {
              onCustomChange?.(e.target.value, field.onChange);
            } else {
              field.onChange(e.target.value);
            }
            postOnChange?.(e.target.value);
          }}
          helperText={error?.message}
          placeholder={placeholder}
          SelectProps={{
            multiple: !!multiple,
            value: field.value || [],
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: maxHeightChildren,
                },
              },
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
              transformOrigin: { vertical: 'top', horizontal: 'center' },
              // getContentAnchorEl: null,
            },
          }}
          InputProps={{
            endAdornment:
              clearable && field.value ? (
                <IconButton
                  size="small"
                  sx={{
                    mr: 1.5,
                    fontSize: 10,
                    color: 'grey.500',
                    '& svg': { fontSize: 20 },
                  }}
                  onClick={() => field.onChange('')}
                >
                  <ClearIcon />
                </IconButton>
              ) : null,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          type="select"
        >
          {renderSelectOptions()}
        </TextField>
      )}
    />
  );
}
