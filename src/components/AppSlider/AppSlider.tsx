import { useState } from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import Slider from '@mui/material/Slider';

type TAppSliderProps<T> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> & {
  label: string;
  required?: boolean;
  name: string[];
  minDistance?: number;
};

export function AppSlider<T>({
  control,
  name,
  label,
  defaultValue,
  rules,
  required,
  minDistance = 1,
  ...props
}: TAppSliderProps<T>) {
  const [rangeValue, setRangeValue] = useState<number[]>([18, 50]);

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const onChange = (
          _: Event,
          newValue: number | number[],
          activeThumb: number,
        ) => {
          if (!Array.isArray(newValue)) {
            return;
          }

          if (activeThumb === 0) {
            const changeValue = [
              Math.min(newValue[0], rangeValue[1] - minDistance),
              rangeValue[1],
            ];
            setRangeValue(changeValue);
            field.onChange(changeValue);
          } else {
            const changeValue = [
              rangeValue[0],
              Math.max(newValue[1], rangeValue[0] + minDistance),
            ];
            setRangeValue(changeValue);
            field.onChange(changeValue);
          }
        };
        return (
          <>
            <FormControl
              variant="outlined"
              fullWidth
              sx={{
                boxSizing: 'border-box',
                height: 41,
                border: theme =>
                  `1px solid ${!error ? theme.palette.neutral[400] : theme.palette.error.main}`,
                px: 2,
                py: 1,
                position: 'relative',
                borderRadius: 1,
              }}
              error={!!error}
            >
              <FormLabel
                required={required}
                sx={{
                  fontSize: 12,
                  position: 'absolute',
                  top: '-10px',
                  left: 10,
                  bgcolor: 'white',
                  px: 1,
                }}
              >
                {label}
              </FormLabel>
              <Slider
                {...props}
                value={rangeValue}
                onChange={onChange}
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={100}
              />
            </FormControl>
            {!!error && (
              <FormHelperText error sx={{ pl: 2, pt: 0.5 }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}
