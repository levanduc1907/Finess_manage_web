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
  TMuscleGroup,
  TFood,
} from '@/utils/FetchApi';

// import { useCreatefood } from '../modules/useCreatefood';
// import { useUpdatefood } from '../modules/useUpdatefood';

export function FoodNewSubmit() {
  const { Strings } = useAppLanguage();

  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSubmit, reset, getValues, control } =
    useFormContext<TCreateMuscleGroup>();
  const dataRef = useRef(getValues());

  const data = useWatch({ control });
  const isNotUpdated = JSON.stringify(dataRef.current) === JSON.stringify(data);
  const isEditScreen = !!params?.id;
  // const { create, status: createStatus } = useCreatefood();
  // const { update, status: updateStatus } = useUpdatefood();
  // const onSubmit = handleSubmit(async (value: any) => {
  //   try {
  //     let promiseRes: Promise<TFetchBaseOutput<Tfood>>;
  //     if (isEditScreen) {
  //       const body = {
  //         id: params.id,
  //         name: value?.name,
  //         type: value?.type,
  //         imageUrl: value?.imageUrl,
  //         week: {
  //           Monday: value?.week?.Monday ? [value?.week?.Monday] : [],
  //           Tuesday: value?.week?.Tuesday ? [value?.week?.Tuesday] : [],
  //           Wednesday: value?.week?.Wednesday ? [value?.week?.Wednesday] : [],
  //           Thursday: value?.week?.Thursday ? [value?.week?.Thursday] : [],
  //           Friday: value?.week?.Friday ? [value?.week?.Friday] : [],
  //           Saturday: value?.week?.Saturday ? [value?.week?.Saturday] : [],
  //           Sunday: value?.week?.Sunday ? [value?.week?.Sunday] : [],
  //         },
  //         days:
  //           value?.days?.map((item, index) => ({
  //             dayNumber: index,
  //             sets: item.set ? [item.set] : [],
  //           })) || [],
  //         repeatAfterDays: value?.days?.lenght,
  //       };
  //       console.log('date', body);
  //       promiseRes = update(body);
  //     } else {
  //       const body = {
  //         name: value?.name,
  //         type: value?.type,
  //         imageUrl: value?.imageUrl,
  //         week: {
  //           Monday: value?.week?.Monday ? [value?.week?.Monday] : [],
  //           Tuesday: value?.week?.Tuesday ? [value?.week?.Tuesday] : [],
  //           Wednesday: value?.week?.Wednesday ? [value?.week?.Wednesday] : [],
  //           Thursday: value?.week?.Thursday ? [value?.week?.Thursday] : [],
  //           Friday: value?.week?.Friday ? [value?.week?.Friday] : [],
  //           Saturday: value?.week?.Saturday ? [value?.week?.Saturday] : [],
  //           Sunday: value?.week?.Sunday ? [value?.week?.Sunday] : [],
  //         },
  //         days:
  //           value?.days?.map((item, index) => ({
  //             dayNumber: index,
  //             sets: item.set ? [item.set] : [],
  //           })) || [],
  //         repeatAfterDays: value?.days?.lenght,
  //       };
  //       console.log('date', body);

  //       promiseRes = create(body);
  //     }
  //     const res = await promiseRes;
  //     if (res.code !== '1000') {
  //       ToastService.error(res.message);
  //       console.log(res.message);
  //       return;
  //     }
  //     ToastService.success(
  //       isEditScreen ? Strings.update_success : Strings.create_success,
  //     );
  //     queryClient.refetchQueries({
  //       queryKey: [QueryKeys.GET_food],
  //     });
  //     navigate('/food');
  //   } catch (e) {
  //     ToastService.error(e);
  //   }
  // });

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
            navigate('/food');
            reset();
          }}
        >
          {Strings.cancel}
        </AppButton>
        <AppButton
          type="submit"
          variant="contained"
          //   onClick={onSubmit}
          //   disabled={isEditScreen && isNotUpdated}
          //   loading={updateStatus === 'pending' || createStatus === 'pending'}
        >
          {isEditScreen ? Strings.update : Strings.create_new}
        </AppButton>
      </Stack>
    </Stack>
  );
}
