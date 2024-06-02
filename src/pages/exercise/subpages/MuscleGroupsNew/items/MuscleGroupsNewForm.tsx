import { Grid, Stack } from '@mui/material';

import { AppTextField, AppUploadArea } from '@/components';

import { useAppLanguage } from '@/utils/modules';
import { useFormContext } from 'react-hook-form';

export function MuscleGroupsNewForm() {
  const { Strings } = useAppLanguage();
  const { control } = useFormContext();
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
          name="image"
          label={Strings.profile_avatar}
          required
        />
      </Grid>
    </Stack>
  );
}
