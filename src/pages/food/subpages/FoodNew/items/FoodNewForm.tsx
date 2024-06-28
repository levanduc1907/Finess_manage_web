import { useCallback, useEffect } from 'react';
import {
  Box,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  AppButton,
  AppRadioGroup,
  AppSelect,
  AppTextField,
  AppTextFieldMasked,
  AppUploadArea,
} from '@/components';
import { useAppLanguage } from '@/utils/modules';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useQuerySet } from '../modules/useQuerySet';
import { useFormOptions } from '@/utils/modules/useFormOptions';
import { useQueryNutrition } from '../modules/useQueryNutrition';
import { measureUnits } from '@/utils/FetchApi';
import { theme } from '@/utils/modules/theme';
import DeleteIcon from '@mui/icons-material/Delete';
const listOfDay = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function FoodNewForm() {
  const { Strings } = useAppLanguage();
  const { control, resetField, trigger } = useFormContext();
  const { data } = useQueryNutrition();
  console.log('cccccc', data);
  const { formOptions } = useFormOptions();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'nutritions',
  });
  console.log('daaaa', fields);
  const handleRemoveRow = (index: number) => {
    remove(index);
  };
  const handleAddRow = async () => {
    const isValidate = await trigger('nutritions');
    if (isValidate) {
      append({
        nutrition: '',
        quantity: '',
      });
    }
  };

  const renderListNutrition = () => {
    return fields.map((field, index) => {
      return (
        <Stack
          container
          // spacing={2}
          key={field.id}
          flexDirection={'row'}
          sx={{
            p: 2,
            borderRadius: 2,
            border: theme => `2px solid  ${theme.palette.neutral[200]}`,
            backgroundColor: theme.palette.neutral[100],
          }}
        >
          <Grid container item xs={11} spacing={2}>
            <Grid item xs={5}>
              <AppSelect
                rules={{
                  required: {
                    value: true,
                    message: 'not null',
                  },
                }}
                control={control}
                label={Strings.exercise}
                name={`nutritions.${index}.nutrition`}
                required
                options={
                  data?.map(item => ({
                    value: item._id,
                    label: item.name,
                  })) || []
                }
              />
            </Grid>
            <Grid item xs={3}>
              <AppTextFieldMasked
                control={control}
                label={'Hàm lượng'}
                rules={{
                  required: {
                    value: true,
                    message: 'not null',
                  },
                }}
                name={`nutritions.${index}.quantity`}
                mask={{
                  mask: '#000',
                  definitions: {
                    '#': /[1-9]/,
                  },
                }}
                placeholder={'gram'}
                required
              />
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Stack
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={() => handleRemoveRow(index)}
                disabled={fields.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Stack>
      );
    });
  };

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
          options={measureUnits.map(item => ({ label: item, value: item }))}
          label={Strings.type}
          name="type"
          required
        />
      </Grid>

      <Grid>
        <FormLabel
          sx={{
            color: theme => theme.palette.text.primary,
          }}
        >
          {'Dinh dưỡng'}
        </FormLabel>
      </Grid>
      {renderListNutrition()}
      <AppButton
        onClick={handleAddRow}
        sx={{
          p: 2,
          borderRadius: 1,
          border: theme => `2px dashed  ${theme.palette.neutral[300]}`,
          cursor: 'pointer',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box> {Strings.add_new}</Box>
      </AppButton>
    </Stack>
  );
}
