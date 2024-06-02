import { useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { AppTextField } from '@/components';
import { useAppLanguage } from '@/utils/modules';

export function SetSearchFilter() {
  const { Strings } = useAppLanguage();
  const { control } = useFormContext();

  return (
    <Grid container wrap="nowrap" spacing={2} my={2}>
      <Grid item xs={3}>
        <AppTextField
          control={control}
          name="searchTerm"
          label={Strings.search}
        />
      </Grid>
    </Grid>
  );
}
