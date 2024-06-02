import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Stack } from '@mui/material';

import { QueryKeys, ToastService, useAppLanguage } from '@/utils/modules';

import { MuscleGroupsNewForm } from './items/MuscleGroupsNewForm';
import { MuscleGroupsNewSubmit } from './items/MuscleGroupsNewSubmit';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function MuscleGroupsNew() {
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
        const result = await FetchApi.getMuscleGroup(params.id);
        if (result.data) {
          methods.reset({
            name: result.data?.name,
            description: result.data?.description,
            image: result.data.imageUrl,
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
          <MuscleGroupsNewForm />
          <MuscleGroupsNewSubmit />
        </Stack>
      </FormProvider>
      {/* <DeleteJobConfirmationDialog /> */}
    </>
  );
}
