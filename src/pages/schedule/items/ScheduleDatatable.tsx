import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AppDatatable, TBaseColumn } from '@/components';
import { QueryKeys, ToastService, useAppLanguage } from '@/utils/modules';

import { useQuerySchedule } from '../modules/useQuerySchedule';
import { theme } from '@/utils/modules/theme';
// import { useMutationDeleteSchedule } from '../modules/useMutationDeleteSchedule';
import { useQueryClient } from '@tanstack/react-query';
import { TSchedule } from '@/utils/FetchApi';

import DayCards from './DayCards';
import WeekCards from './WeekCards';
import { useMutationDeleteSchedule } from '../modules/useMutationDeleteSchedule';

export function ScheduleDatatable() {
  const { Strings, code } = useAppLanguage();
  const navigate = useNavigate();
  const form = useFormContext();
  const { data, isLoading, isFetching } = useQuerySchedule();
  console.log('daata', data);
  const queryClient = useQueryClient();
  const { deleteSchedule, status } = useMutationDeleteSchedule();
  const handleChangePagination = (page: number, limit: number) => {
    form.setValue('limit', limit);
    form.setValue('page', page);
  };

  const handlePressDeleteSchedule = async (Id: string) => {
    try {
      const res = await deleteSchedule({ id: Id });
      if (res.code !== '1000') {
        ToastService.error(res.message);
        return;
      }
      ToastService.success(Strings.update_success);
      queryClient.refetchQueries({ queryKey: [QueryKeys.GET_SCHEDULE] });
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
      id: 'type',
      label: Strings.type,
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'imageUrl',
      label: Strings.image,
      align: 'center',
      minWidth: 200,
      render: (row: TSchedule) => {
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
      id: 'details',
      label: 'Details',
      align: 'center',
      minWidth: 300,
      render: (row: TSchedule) => {
        return row.type === 'Weekly' ? (
          <WeekCards week={row.week} />
        ) : (
          <DayCards days={row.days} />
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
                onClick={() => navigate(`/schedules/${row?._id}/edit`)}
              />
            </IconButton>
            <IconButton onClick={() => handlePressDeleteSchedule(row?._id)}>
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
