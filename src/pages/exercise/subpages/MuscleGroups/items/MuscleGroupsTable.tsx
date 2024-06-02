import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import { Box, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { dispatchAction } from '@/hooks';
import { AppDatatable, TBaseColumn } from '@/components';
import {
  QueryKeys,
  ToastService,
  queryClient,
  useAppLanguage,
} from '@/utils/modules';
import { useQueryMuscleGroups } from '@/pages/exercise/modules/useQueryMuscleGroups';
import { theme } from '@/utils/modules/theme';
import { useMutationDeleteMuscleGroup } from '../modules/useMutationDeleteMuscleGroup';
import { useQueryClient } from '@tanstack/react-query';

export function MuscleGroupsTable() {
  const { Strings } = useAppLanguage();

  const navigate = useNavigate();
  const form = useFormContext();
  const { data, isLoading, isFetching } = useQueryMuscleGroups();
  const { deleteMuscleGroup } = useMutationDeleteMuscleGroup();
  const queryClient = useQueryClient();
  const handleChangePagination = (page: number, limit: number) => {
    form.setValue('limit', limit);
    form.setValue('page', page);
  };
  const handleOpenConfirmDeleteJob = async (muscleGroupId: string) => {
    try {
      const res = await deleteMuscleGroup({ id: muscleGroupId });
      if (res.code !== '1000') {
        ToastService.error(res.message);
        return;
      }
      ToastService.success(Strings.update_success);
      queryClient.refetchQueries({ queryKey: [QueryKeys.GET_MUSLEGROUP] });
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
      id: 'imageUrl',
      label: Strings.image,
      align: 'center',
      minWidth: 200,
      render: row => {
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
      id: 'action',
      label: Strings.action,
      align: 'center',
      minWidth: 100,
      render: row => {
        return (
          <Stack direction="row" gap={0.5} justifyContent={'center'}>
            <IconButton>
              <EditIcon onClick={() => navigate(`${row?._id}/edit`)} />
            </IconButton>
            <IconButton onClick={() => handleOpenConfirmDeleteJob(row?._id)}>
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
        data={data ?? []}
        isLoading={isLoading || isFetching}
        maxHeight="calc(100vh - 75px)"
        onChangePagination={handleChangePagination}
      />
    </Box>
  );
}
