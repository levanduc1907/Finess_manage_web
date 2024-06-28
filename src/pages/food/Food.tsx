import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { useAppLanguage } from '@/utils/modules';

import { FoodDatatable } from './items/FoodDatatable';
import { foodSearchFilter } from './items/foodSearchFilter';
import { FoodHead } from './items/FoofHead';

export function Food() {
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
          <FoodHead />
          {/* <foodSearchFilter />
           */}
          <FoodDatatable />
        </Stack>
      </FormProvider>
    </>
  );
}
