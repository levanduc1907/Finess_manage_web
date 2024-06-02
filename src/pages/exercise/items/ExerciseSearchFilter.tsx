import { useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { AppButton, AppSelect, AppTextField } from '@/components';
import { useAppLanguage } from '@/utils/modules';
import { useQueryMuscleGroups } from '../modules/useQueryMuscleGroups';
import { useNavigate } from 'react-router-dom';

export function ExerciseSearchFilter() {
  const { Strings } = useAppLanguage();
  const { control } = useFormContext();
  const { data } = useQueryMuscleGroups();
  const navigate = useNavigate();
  const handleToMusleGroup = () => {
    navigate('/exercises/muscle-groups');
  };
  return (
    <Grid container wrap="nowrap" spacing={2} my={2}>
      <Grid item xs={3}>
        <AppTextField
          control={control}
          name="searchTerm"
          label={Strings.search}
        />
      </Grid>
      <Grid item xs={3}>
        <AppSelect
          name="muscleGroup"
          label={Strings.muscle_group}
          options={data?.map(item => ({
            value: item._id,
            label: item.name,
          }))}
        />
      </Grid>
      <Grid item xs={3}>
        <AppButton
          variant="contained"
          onClick={handleToMusleGroup}
          style={{ marginRight: 20 }}
        >
          {Strings.manager_muscle_group}
        </AppButton>
      </Grid>
    </Grid>
  );
}
