import { useCallback, useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import {
  AppButton,
  AppRadioGroup,
  AppSelect,
  AppTextField,
  AppUploadArea,
} from '@/components';
import { useAppLanguage } from '@/utils/modules';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useQuerySet } from '../modules/useQuerySet';
import { useFormOptions } from '@/utils/modules/useFormOptions';

const listOfDay = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function ScheduleNewForm() {
  const { Strings } = useAppLanguage();
  const { control, resetField } = useFormContext();
  const { data } = useQuerySet();
  const { formOptions } = useFormOptions();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'days',
  });
  const type = useWatch({ name: 'type', exact: true });
  const setData =
    data?.data?.map(item => ({
      value: item._id,
      label: item.name,
    })) || [];

  const handleTypeChange = useCallback(() => {
    if (type === 'Weekly') {
      replace([]);
    } else if (type === 'Cyclic') {
      listOfDay.forEach(day => resetField(`week.${day}`));
      replace(listOfDay.map(() => ({ set: '' })));
    }
  }, [type, replace, resetField]);

  useEffect(() => {
    handleTypeChange();
  }, [type, handleTypeChange]);

  const renderBody = useCallback(() => {
    if (type === 'Weekly') {
      return (
        <Stack>
          {listOfDay.map(item => (
            <Stack
              key={item}
              flexDirection={'row'}
              style={{
                alignItems: 'center',
                gap: 20,
                paddingRight: 20,
                paddingLeft: 20,
              }}
              marginTop={4}
            >
              <Grid item width={100}>
                <Typography>{item}</Typography>
              </Grid>
              <Grid flex={1}>
                <AppSelect
                  clearable
                  label={Strings.set}
                  name={`week.${item}`}
                  required
                  options={setData}
                />
              </Grid>
            </Stack>
          ))}
        </Stack>
      );
    }
    if (type === 'Cyclic') {
      return (
        <Stack>
          {fields.map((field, index) => (
            <Stack
              key={field.id}
              flexDirection={'row'}
              style={{
                alignItems: 'center',
                gap: 20,
                paddingRight: 20,
                paddingLeft: 20,
              }}
              marginTop={4}
            >
              <Grid item width={100}>
                <Typography>Day {index + 1}</Typography>
              </Grid>
              <Grid flex={1}>
                <AppSelect
                  label={Strings.set}
                  name={`days.${index}.set`}
                  required
                  options={setData}
                />
              </Grid>
              <Grid item>
                <button type="button" onClick={() => remove(index)}>
                  {'remove'}
                </button>
              </Grid>
            </Stack>
          ))}
          <AppButton
            sx={{
              background: theme => theme.palette.neutral[500],
            }}
            variant="contained"
            color="secondary"
            onClick={() => append({ set: '' })}
            style={{ marginTop: 20 }}
          >
            {'add'}
          </AppButton>
        </Stack>
      );
    }
  }, [type, fields, remove, append, setData, Strings]);

  return (
    <Stack paddingTop={4} gap={4}>
      <Grid item xs={4}>
        <AppTextField
          control={control}
          label={Strings.name}
          name="name"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <AppUploadArea
          type="image"
          control={control}
          label={Strings.image}
          name="imageUrl"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <AppRadioGroup
          control={control}
          options={formOptions.scheduelType}
          label={Strings.type}
          name="type"
          required
        />
      </Grid>
      {renderBody()}
    </Stack>
  );
}
