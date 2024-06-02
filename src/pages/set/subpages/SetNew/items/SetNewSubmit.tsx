import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext, useWatch } from 'react-hook-form';
import { Stack } from '@mui/material';

import { QueryKeys, ToastService, useAppLanguage } from '@/utils/modules';
import { AppButton } from '@/components';

import { useQueryClient } from '@tanstack/react-query';
import {
  TCreateMuscleGroup,
  TFetchBaseOutput,
  TSetItem,
} from '@/utils/FetchApi';

import { useCreateSet } from '../modules/useCreateSet';
import { useUpdateSet } from '../modules/useUpdateSet';

export function SetNewSubmit() {
  const { Strings } = useAppLanguage();

  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSubmit, reset, getValues, control } =
    useFormContext<TCreateMuscleGroup>();
  const dataRef = useRef(getValues());

  const data = useWatch({ control });
  const isNotUpdated = JSON.stringify(dataRef.current) === JSON.stringify(data);
  const { create, status: createStatus } = useCreateSet();
  const { update, status: updateStatus } = useUpdateSet();
  const isEditScreen = !!params?.id;
  const onSubmit = handleSubmit(async (value: any) => {
    try {
      let promiseRes: Promise<TFetchBaseOutput<TSetItem>>;
      if (isEditScreen) {
        const body = {
          id: params.id,
          name: value?.name,
          description: value?.description,
          type: value?.type,
          imageUrl: value?.imageUrl,
          exercises: value.exercises.map(item => ({
            exercise: item.exercise,
            quantity: Number(item.quantity),
            time: Number(item.time),
          })),
          totalTimes: Number(value.totalTimes),
          totalCalories: Number(value.totalCalories),
        };
        console.log('date', body);
        promiseRes = update(body);
      } else {
        const body = {
          name: value?.name,
          description: value?.description,
          type: value?.type,
          imageUrl: value?.imageUrl,
          exercises: value.exercises.map(item => ({
            exercise: item.exercise,
            quantity: Number(item.quantity),
            time: Number(item.time),
          })),
          totalTimes: Number(value.totalTimes),
          totalCalories: Number(value.totalCalories),
        };
        promiseRes = create(body);
      }
      const res = await promiseRes;
      if (res.code !== '1000') {
        ToastService.error(res.message);
        return;
      }
      ToastService.success(
        isEditScreen ? Strings.update_success : Strings.create_success,
      );
      queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_MUSLEGROUP],
      });
      navigate('/sets');
    } catch (e) {
      ToastService.error(e);
    }
  });

  return (
    <Stack direction="row" justifyContent="flex-end" mb={2}>
      <Stack direction="row" gap={2} marginRight={2}>
        <AppButton
          sx={{
            background: theme => theme.palette.neutral[500],
          }}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate('/sets');
            reset();
          }}
        >
          {Strings.cancel}
        </AppButton>
        <AppButton
          type="submit"
          variant="contained"
          onClick={onSubmit}
          disabled={isEditScreen && isNotUpdated}
          loading={updateStatus === 'pending' || createStatus === 'pending'}
        >
          {isEditScreen ? Strings.update : Strings.create_new}
        </AppButton>
      </Stack>
    </Stack>
  );
}
