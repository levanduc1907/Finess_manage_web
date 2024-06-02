import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import { Box, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AppDatatable, TBaseColumn } from '@/components';
import { QueryKeys, ToastService, useAppLanguage } from '@/utils/modules';

import { useQueryExercise } from '../modules/useQueryExercise';
import { theme } from '@/utils/modules/theme';
import { useMutationDeleteExercise } from '../modules/useMutationDeleteExercise';
import { useQueryClient } from '@tanstack/react-query';
import { TExercise } from '@/utils/FetchApi';

export function ExerciseDatatable() {
  const { Strings, code } = useAppLanguage();
  const navigate = useNavigate();
  const form = useFormContext();
  const { data, isLoading, isFetching } = useQueryExercise();
  const queryClient = useQueryClient();
  const { deleteExercise, status } = useMutationDeleteExercise();
  const handleChangePagination = (page: number, limit: number) => {
    form.setValue('limit', limit);
    form.setValue('page', page);
  };

  const handlePressDeleteExercise = async (Id: string) => {
    try {
      const res = await deleteExercise({ id: Id });
      if (res.code !== '1000') {
        ToastService.error(res.message);
        return;
      }
      ToastService.success(Strings.update_success);
      queryClient.refetchQueries({ queryKey: [QueryKeys.GET_EXERCISE] });
    } catch (e) {
      ToastService.error(e);
    }
  };

  const columns: TBaseColumn[] = [
    {
      id: 'name',
      label: Strings.name,
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'description',
      label: Strings.description,
      align: 'center',
      minWidth: 200,
    },

    {
      id: 'type',
      label: Strings.type,
      align: 'center',
      minWidth: 200,
    },

    {
      id: 'caloriesPerUnit',
      label: Strings.Calories,
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'muscleGroups',
      label: Strings.muscle_group,
      align: 'center',
      minWidth: 200,
      render: (row: TExercise) => {
        return row.muscleGroups.map(item => item.name).join(', ');
      },
    },
    {
      id: 'imageUrl',
      label: Strings.image,
      align: 'center',
      minWidth: 200,
      render: (row: TExercise) => {
        return (
          <img
            src={row.imageUrl}
            style={{
              width: 200,
              display: 'inline-block',
            }}
          />
        );
      },
    },
    {
      id: 'videoUrl',
      label: Strings.video,
      align: 'center',
      minWidth: 200,
      render: (row: TExercise) => {
        return (
          <video
            src={row.videoUrl}
            style={{
              width: 200,
              display: 'inline-block',
            }}
            controls
          />
        );
      },
    },
    {
      id: 'action',
      label: Strings.action,
      align: 'center',
      minWidth: 100,
      render: row => {
        return (
          <Stack direction="row" gap={0.5} justifyContent={'center'}>
            <IconButton>
              <EditIcon
                onClick={() => navigate(`/exercises/${row?._id}/edit`)}
              />
            </IconButton>
            <IconButton onClick={() => handlePressDeleteExercise(row?._id)}>
              <DeleteIcon style={{ color: theme.palette.error.main }} />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ flex: 1 }}>
      <AppDatatable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading || isFetching}
        maxHeight="calc(100vh - 75px)"
        onChangePagination={handleChangePagination}
      />
    </Box>
  );
}
