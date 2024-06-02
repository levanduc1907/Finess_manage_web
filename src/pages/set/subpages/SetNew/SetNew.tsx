import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';

import { ToastService, useAppLanguage } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';
import { SetNewForm } from './items/SetNewForm';
import { SetNewSubmit } from './items/SetNewSubmit';

export function SetNew() {
  const { Strings } = useAppLanguage();
  const params = useParams();
  const methods = useForm({
    mode: 'all',
    defaultValues: {},
  });

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        if (!params?.id) {
          return;
        }
        const result = await FetchApi.getSet(params.id);
        if (result.data) {
          methods.reset({
            name: result.data?.name,
            description: result.data?.description,
            imageUrl: result.data?.imageUrl,
            totalTimes: result.data?.totalTimes.toString(),
            totalCalories: result.data?.totalCalories.toString(),
            exercises: result.data.exercises.map(item => ({
              quantity: item.quantity.toString(),
              time: item.time.toString(),
              exercise: item.exercise._id,
            })),
            type: result.data.type,
          });
        }
      } catch (e) {
        ToastService.error(e);
      }
    };
    fetchAndSetData();
  }, [params]);

  return (
    <>
      <Helmet>
        <title>
          {Strings.app_name} · {Strings.muscle_group}
        </title>
      </Helmet>
      <FormProvider {...methods}>
        <Stack direction="column" gap={5}>
          <SetNewForm />
          <SetNewSubmit />
        </Stack>
      </FormProvider>
      {/* <DeleteJobConfirmationDialog /> */}
    </>
  );
}
