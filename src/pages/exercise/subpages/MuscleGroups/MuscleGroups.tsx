import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';
import { MuscleGroupsHead } from './items/MuscleGroupsHead';
import { MuscleGroupsTable } from './items/MuscleGroupsTable';

export function MuscleGroups() {
  const { Strings } = useAppLanguage();
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      page: 1,
      limit: 10,
    },
  });

  return (
    <>
      <Helmet>
        <title>
          {Strings.app_name} · {Strings.muscle_group}
        </title>
      </Helmet>
      <FormProvider {...methods}>
        <Stack direction="column" gap={5}>
          <MuscleGroupsHead />
          <MuscleGroupsTable />
        </Stack>
      </FormProvider>
      {/* <DeleteJobConfirmationDialog /> */}
    </>
  );
}
