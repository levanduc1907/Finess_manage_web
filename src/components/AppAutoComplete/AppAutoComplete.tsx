import {
  TApiResponse,
  TApiResponseList,
  invalidateQueries,
  useAppLanguage,
} from '@/utils/modules';
import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Autocomplete, {
  createFilterOptions,
  AutocompleteProps,
} from '@mui/material/Autocomplete';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

type TAppAutoCompleteProps<T, R, D> = UseControllerProps<
  T extends FieldValues ? T : T & FieldValues
> &
  TextFieldProps & {
    secureTextEntry?: boolean;
    loading?: boolean;
    open?: boolean;
    setOpen?: () => void;
    setClose?: () => void;
    options?: { id: string; label: string }[];
    autoCompleteProps?: Partial<
      AutocompleteProps<
        { id: string; label: string },
        boolean | undefined,
        boolean | undefined,
        boolean | undefined
      >
    >;
    textFieldProps?: TextFieldProps;
    label: string;
    required?: boolean;
    queryKey: string | string[];
    getRemote?: () => Promise<TApiResponse<TApiResponseList<D>>>;
    postRemote?: (name: R) => Promise<TApiResponse<R>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderOptions: (data: any[]) => { id: string; label: string }[];
  };

export function AppAutoComplete<T, R, D>({
  label,
  control,
  name,
  defaultValue,
  rules,
  loading,
  open,
  options,
  autoCompleteProps,
  textFieldProps,
  setOpen,
  setClose,
  queryKey,
  getRemote,
  postRemote,
  renderOptions,
  required,
}: TAppAutoCompleteProps<T, R, D>) {
  const filter = createFilterOptions<{
    id: string;
    label: string;
    newLabel?: string;
  }>();
  const { Strings } = useAppLanguage();
  const { data: rawOptions, isLoading } = useQuery({
    queryKey: [...queryKey],
    queryFn: () => {
      return getRemote?.();
    },
    select: data => data?.data?.data as D[],
  });

  const { mutateAsync } = useMutation({
    mutationFn: (name: R) => {
      return postRemote?.(name) as Promise<
        TApiResponse<{ id: string; label: string }>
      >;
    },
    onSuccess: async () => {
      await invalidateQueries([...queryKey]);
    },
  });

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            sx={{
              '& .MuiAutocomplete-tag': {
                margin: '2px',
              },
              '& .MuiChip-filled': {
                height: '26px',
              },
            }}
            fullWidth
            open={open}
            onOpen={setOpen}
            onClose={setClose}
            options={options || renderOptions(rawOptions ?? []) || []}
            loading={loading || isLoading}
            noOptionsText={Strings.no_data}
            loadingText={Strings.loading}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            disableClearable
            value={field.value}
            onChange={async (_, value) => {
              if (autoCompleteProps?.multiple) {
                const _value = value as {
                  id: string;
                  label: string;
                  newLabel?: string;
                }[];
                field.onChange(
                  _value.map(({ id, label, newLabel }) => ({
                    id: id,
                    label: newLabel ?? label,
                  })),
                );
              } else {
                const { id, label, newLabel } = value as {
                  id: string;
                  label: string;
                  newLabel?: string;
                };
                if (newLabel) mutateAsync(newLabel as R);
                field.onChange({
                  id: id,
                  label: newLabel ?? label,
                });
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some(
                option => inputValue === option.label,
              );
              if (inputValue !== '' && !isExisting && postRemote) {
                filtered.push({
                  id: inputValue,
                  newLabel: inputValue,
                  label: `${Strings.add_new}: ${inputValue}`,
                });
              }
              return (filtered || []) as { id: string; label: string }[];
            }}
            {...autoCompleteProps}
            renderInput={params => {
              return (
                <TextField
                  label={label}
                  {...params}
                  required={required}
                  error={!!error}
                  helperText={error?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </InputAdornment>
                    ),
                  }}
                  {...textFieldProps}
                />
              );
            }}
          />
        );
      }}
    />
  );
}
