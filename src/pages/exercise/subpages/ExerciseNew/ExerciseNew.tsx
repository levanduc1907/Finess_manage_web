import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';

import { ToastService, useAppLanguage } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

import { ExerciseNewForm } from './items/ExerciseNewForm';
import { ExerciseNewSubmit } from './items/ExerciseNewSubmit';

export function ExerciseNew() {
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
        const result = await FetchApi.getExercise(params.id);
        if (result.data) {
          methods.reset({
            name: result.data?.name,
            description: result.data?.description,
            image: result.data.imageUrl,
            video: result.data.videoUrl,
            muscleGroups: result.data.muscleGroups,
            type: result.data.type,
            caloriesPerUnit: result.data.caloriesPerUnit,
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
          <ExerciseNewForm />
          <ExerciseNewSubmit />
        </Stack>
      </FormProvider>
      {/* <DeleteJobConfirmationDialog /> */}
    </>
  );
}
