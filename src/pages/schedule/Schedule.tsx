import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';

import { ScheduleHead } from './items/ScheduleHead';

import { ScheduleDatatable } from './items/ScheduleDatatable';
import { ScheduleSearchFilter } from './items/ScheduleSearchFilter';

export function Schedule() {
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
          <ScheduleHead />
          <ScheduleSearchFilter />
          <ScheduleDatatable />
        </Stack>
      </FormProvider>
    </>
  );
}
