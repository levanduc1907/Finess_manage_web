import { Grid, Stack } from '@mui/material';

import {
  AppRadioGroup,
  AppSelect,
  AppTextField,
  AppUploadArea,
} from '@/components';

import { useAppLanguage } from '@/utils/modules';
import { useFormContext } from 'react-hook-form';
import { useQueryMuscleGroups } from '@/pages/exercise/modules/useQueryMuscleGroups';

export function ExerciseNewForm() {
  const { Strings } = useAppLanguage();
  const { control } = useFormContext();
  const { data } = useQueryMuscleGroups();
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
        <AppRadioGroup
          control={control}
          options={[
            { value: 'rep', label: Strings.type_rep },
            { value: 'time', label: Strings.time },
          ]}
          label={Strings.type}
          name="type"
          required
        />
      </Grid>
      <AppTextField
        control={control}
        label={Strings.Calories}
        rules={{
          required: {
            value: true,
            message: 'not null',
          },
        }}
        name={'caloriesPerUnit'}
        placeholder={Strings.time}
        required
        autoFocus={false}
        unit={'kCal'}
      />
      <Grid item xs={4}>
        <AppTextField
          control={control}
          label={Strings.description}
          name="description"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <AppSelect
          control={control}
          multiple={true}
          options={data.map(item => ({
            value: item._id,
            label: item.name,
          }))}
          label={Strings.muscle_group}
          name="muscleGroups"
          required
        />
      </Grid>
      <Grid item xs={3}>
        <AppUploadArea
          type="image"
          control={control}
          name="image"
          label={Strings.profile_avatar}
          required
        />
      </Grid>
      <Grid item xs={3}>
        <AppUploadArea
          type="video"
          control={control}
          name="video"
          label={Strings.video}
          required
        />
      </Grid>
    </Stack>
  );
}
