import { useEffect } from 'react';
import {
  Box,
  Container,
  FormLabel,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useFieldArray,
  useFormContext,
  useWatch,
  Control,
} from 'react-hook-form';

import {
  AppButton,
  AppRadioGroup,
  AppSelect,
  AppTextField,
  AppTextFieldMasked,
  AppUploadArea,
} from '@/components';

import { useAppLanguage } from '@/utils/modules';
import { useQueryAllExercise } from '../modules/useQueryAllExercise';
import { theme } from '@/utils/modules/theme';
import { TCreateSetBody, TExercise, TSetItem } from '@/utils/FetchApi';
import { useFormOptions } from '@/utils/modules/useFormOptions';

const ExtraExerciseDataForm = ({
  control,
  index,
  data = [],
}: {
  control: Control<TCreateSetBody>;
  index: number;
  data: TExercise[];
}) => {
  const { Strings } = useAppLanguage();
  const exerciseId = useWatch({
    name: `exercises.${index}.exercise`,
    control,
  });
  const type = data.find(item => item._id === exerciseId)?.type;
  return (
    <>
      <Grid item xs={3}>
        <AppTextFieldMasked
          control={control}
          label={Strings.time}
          rules={{
            required: {
              value: true,
              message: 'not null',
            },
          }}
          mask={{
            mask: '#000',
            definitions: {
              '#': /[1-9]/,
            },
          }}
          name={`exercises.${index}.time`}
          placeholder={Strings.time}
          required
          unit={'s'}
        />
      </Grid>

      {type === 'rep' && (
        <Grid item xs={3}>
          <AppTextFieldMasked
            control={control}
            label={Strings.type_rep}
            rules={{
              required: {
                value: true,
                message: 'not null',
              },
            }}
            name={`exercises.${index}.quantity`}
            mask={{
              mask: '#000',
              definitions: {
                '#': /[1-9]/,
              },
            }}
            placeholder={Strings.type_rep}
            required
          />
        </Grid>
      )}
    </>
  );
};

export function SetNewForm() {
  const { Strings } = useAppLanguage();
  const { control, trigger } = useFormContext<TCreateSetBody>();
  const { data } = useQueryAllExercise();
  const { formOptions } = useFormOptions();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const exerciseData = data.map(item => ({
    label: item.name,
    value: item._id,
  }));

  const handleRemoveRow = (index: number) => {
    remove(index);
  };

  const handleAddRow = async () => {
    const isValidate = await trigger('exercises');
    if (isValidate) {
      append({
        exercise: '',
        quantity: '',
        time: '',
      });
    }
  };

  const renderListApplicants = () => {
    return fields.map((field, index) => {
      return (
        <Grid
          container
          // spacing={2}
          key={field.id}
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
                label={Strings.time}
                name={`exercises.${index}.exercise`}
                required
                options={exerciseData}
              />
            </Grid>
            <ExtraExerciseDataForm
              control={control}
              index={index}
              data={data}
            />
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
        </Grid>
      );
    });
  };

  return (
    <Stack paddingTop={4} gap={4} paddingRight={4}>
      <Grid item xs={4}>
        <AppTextField
          control={control}
          label={Strings.name}
          name="name"
          required
        />
      </Grid>

      <Grid item xs={4}>
        <AppTextField
          control={control}
          label={Strings.description}
          name="description"
          required
        />
      </Grid>

      <Grid item xs={3}>
        <AppUploadArea
          type="image"
          control={control}
          name="imageUrl"
          label={Strings.profile_avatar}
          required
        />
      </Grid>

      <Grid>
        <FormLabel
          sx={{
            color: theme => theme.palette.text.primary,
          }}
        >
          {Strings.exercise}
        </FormLabel>
      </Grid>

      {renderListApplicants()}
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
      <Grid item xs={4}>
        <AppRadioGroup
          control={control}
          options={formOptions.motivation}
          label={Strings.type}
          name="type"
          required
        />
      </Grid>
      <RenderExtraFormData control={control} data={data} />
    </Stack>
  );
}

function RenderExtraFormData({
  control,
  data,
}: {
  control: Control<TCreateSetBody>;
  data: TExercise[];
}) {
  const { setValue } = useFormContext();
  const { Strings } = useAppLanguage();
  const exerciseList = useWatch({
    name: 'exercises',
    control,
    defaultValue: [],
  });

  useEffect(() => {
    const totalTimes = exerciseList?.reduce(function (acc, obj) {
      return acc + Number(obj.time);
    }, 0);
    if (totalTimes) {
      setValue('totalTimes', totalTimes.toString());
    } else setValue('totalTimes', null);

    const totalCalories = exerciseList?.reduce(function (acc, obj) {
      const item = data.find(t => t._id === obj.exercise);
      if (!item) {
        return acc;
      }

      if (item?.type === 'rep') {
        return acc + item?.caloriesPerUnit * Number(obj.quantity);
      } else {
        return acc + item?.caloriesPerUnit * Number(obj.time);
      }
    }, 0);
    if (totalCalories) {
      setValue('totalCalories', totalCalories.toString());
    } else setValue('totalCalories', null);
  }, [exerciseList]);
  return (
    <>
      <Grid item xs={3}>
        <AppTextField
          control={control}
          label={Strings.totalTime}
          rules={{
            required: {
              value: true,
              message: 'not null',
            },
          }}
          name={'totalTimes'}
          placeholder={Strings.time}
          required
          autoFocus={false}
          unit={'s'}
        />
      </Grid>
      <Grid item xs={3}>
        <AppTextFieldMasked
          control={control}
          label={Strings.totalCalories}
          rules={{
            required: {
              value: true,
              message: 'not null',
            },
          }}
          mask={{
            mask: '#000',
            definitions: {
              '#': /[1-9]/,
            },
          }}
          name={'totalCalories'}
          placeholder={Strings.time}
          required
          unit={'s'}
        />
      </Grid>
    </>
  );
}
