import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';

import { ExercisesHead } from './items/ExercisesHead';

import { ExerciseDatatable } from './items/ExerciseDatatable';
import { ExerciseSearchFilter } from './items/ExerciseSearchFilter';

export function Exercises() {
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
          {Strings.app_name} · {Strings.manage_exercise}
        </title>
      </Helmet>
      <FormProvider {...methods}>
        <Stack direction="column">
          <ExercisesHead />
          <ExerciseSearchFilter />
          <ExerciseDatatable />
        </Stack>
      </FormProvider>
    </>
  );
}
