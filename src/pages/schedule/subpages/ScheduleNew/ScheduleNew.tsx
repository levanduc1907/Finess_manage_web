import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';

import { ToastService, useAppLanguage } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

import { ScheduleNewForm } from './items/ScheduleNewForm';
import { ScheduleNewSubmit } from './items/ScheduleNewSubmit';

export function ScheduleNew() {
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
        const result = await FetchApi.getSchedule(params.id);

        if (result.data) {
          methods.reset({
            name: result.data?.name,
            type: result.data.type,
            imageUrl: result.data.imageUrl,
            week: {
              Monday: result.data?.week?.Monday?.[0]?._id,
              Tuesday: result.data?.week?.Tuesday?.[0]?._id,
              Wednesday: result.data?.week?.Wednesday?.[0]?._id,
              Thursday: result.data?.week?.Thursday?.[0]?._id,
              Friday: result.data?.week?.Friday?.[0]?._id,
              Saturday: result.data?.week?.Saturday?.[0]?._id,
              Sunday: result.data?.week?.Sunday?.[0]?._id,
            },
            days: result.data?.days.map(item => {
              console.log({
                set: item.sets?.[0]?._id,
              });
              return {
                set: item.sets?.[0]?._id,
              };
            }),
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
          {Strings.app_name} · {Strings.manage_schedule}
        </title>
      </Helmet>
      <FormProvider {...methods}>
        <Stack direction="column" gap={5}>
          <Typography variant="h5">{'Tạo mới lịch tập'}</Typography>
          <ScheduleNewForm />
          <ScheduleNewSubmit />
        </Stack>
      </FormProvider>
      {/* <DeleteJobConfirmationDialog /> */}
    </>
  );
}
