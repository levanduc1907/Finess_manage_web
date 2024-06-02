import 'react-phone-input-2/lib/material.css';

import { useAppLanguage } from '@/utils/modules';
import { styled, useTheme, FormHelperText } from '@mui/material';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

type TAppPhoneInputProps<T> = PhoneInputProps &
  UseControllerProps<T extends FieldValues ? T : FieldValues> & {
    label: string;
    width?: number | string;
    height?: number | string;
    required?: boolean;
  };

const PhoneInputStyled = styled(PhoneInput)<{ required: boolean }>(
  ({ theme, required }) => ({
    '& .country-list': {
      overflowX: 'hidden',
    },
    '& .country-list .search': {
      padding: '12px',
    },
    '& .search-box': {
      width: '100%',
      height: '37px',
      boxSizing: 'border-box',
      marginLeft: '0px !important',
      '&::placeholder': {
        fontWeight: 500,
        opacity: 0.3,
        color: '#111927',
      },
    },
    '& .special-label': {
      top: '-10px',
      fontWeight: 500,
      color: required ? theme.palette.error.main : theme.palette.neutral[500],
      fontSize: 12,
    },
    '& .form-control:hover': {
      borderColor: required ? theme.palette.error.main : undefined,
    },
    '& .form-control:focus': {
      borderColor: required ? theme.palette.error.main : 'currentColor',
      boxShadow: `0 0 0 1px ${required ? theme.palette.error.main : 'currentColor'}`,
    },
    '& .form-control': {
      borderColor: required ? theme.palette.error.main : undefined,
      '&::placeholder': {
        fontWeight: 500,
        opacity: 0.3,
        color: '#111927',
      },
    },
  }),
);

export function AppPhoneInput<T>({
  control,
  name,
  label,
  defaultValue,
  placeholder,
  rules,
  width = 'auto',
  height = 40,
  required,
  ...props
}: TAppPhoneInputProps<T>) {
  const { Strings, code } = useAppLanguage();
  const theme = useTheme();
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <PhoneInputStyled
            {...field}
            {...props}
            onChange={phone => {
              field.onChange(phone);
            }}
            country={code === 'vi' ? 'vn' : 'en'}
            // defaultMask=""
            enableSearch
            searchNotFound={Strings.not_found}
            searchPlaceholder={Strings.search}
            // localization={{
            //   countrySelectorLabel: ' ',
            //   countrySelectorTitle: 'Chọn quốc gia',
            // }}
            defaultErrorMessage={error?.message}
            placeholder={placeholder}
            specialLabel={label}
            inputProps={{
              required: required,
              style: {
                height: height ?? 'auto',
                width: width ?? 'auto',
                boxSizing: 'border-box',
                fontSize: 14,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
              },
            }}
            required={!!(error && required)}
          />
          {!!error && (
            <FormHelperText sx={{ margin: '4px 14px 0px' }} error>
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
