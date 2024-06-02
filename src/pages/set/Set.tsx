import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';

import { SetHead } from './items/SetHead';
import { SetDatatable } from './items/SetDatatable';
import { SetSearchFilter } from './items/SetSearchFilter';

export function Set() {
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
          {Strings.app_name} · {Strings.manage_set}
        </title>
      </Helmet>
      <FormProvider {...methods}>
        <Stack direction="column">
          <SetHead />
          <SetSearchFilter />
          <SetDatatable />
        </Stack>
      </FormProvider>
    </>
  );
}
