import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AppDatatable, TBaseColumn } from '@/components';
import { useAppLanguage } from '@/utils/modules';

import { theme } from '@/utils/modules/theme';
// import { useMutationDeletefood } from '../modules/useMutationDeletefood';
import { useQueryClient } from '@tanstack/react-query';
import { TFood } from '@/utils/FetchApi';
import { useQueryFood } from '../modules/useQueryFood';
import { useState } from 'react';

export function FoodDatatable() {
  const { Strings } = useAppLanguage();
  const navigate = useNavigate();
  const form = useFormContext();
  const { data, isLoading, isFetching } = useQueryFood();
  console.log('daata', data);
  const queryClient = useQueryClient();
  // const { deletefood, status } = useMutationDeletefood();
  const handleChangePagination = (page: number, limit: number) => {
    form.setValue('limit', limit);
    form.setValue('page', page);
  };

  // const handlePressDeletefood = async (Id: string) => {
  //   try {
  //     const res = await deletefood({ id: Id });
  //     if (res.code !== '1000') {
  //       ToastService.error(res.message);
  //       return;
  //     }
  //     ToastService.success(Strings.update_success);
  //     queryClient.refetchQueries({ queryKey: [QueryKeys.GET_Food] });
  //   } catch (e) {
  //     ToastService.error(e);
  //   }
  // };

  const columns: TBaseColumn[] = [
    {
      id: 'name',
      label: Strings.name,
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'imageUrl',
      label: Strings.image,
      align: 'center',
      minWidth: 200,
      render: (row: TFood) => {
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
      id: 'category',
      label: Strings.type,
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'measureUnit',
      label: 'Đơn vị đo',
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'caloriesPerUnit',
      label: 'Calories',
      align: 'center',
      minWidth: 200,
    },
    {
      id: 'nutritions',
      label: 'Nutritions',
      align: 'center',
      minWidth: 200,
      render: (row: TFood) => {
        return <FoodCard row={row} />;
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
              <EditIcon onClick={() => navigate(`/foods/${row?._id}/edit`)} />
            </IconButton>
            <IconButton
              onClick={
                () => {}
                //  handlePressDeletefood(row?._id)
              }
            >
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

const FoodCard = ({ row }: { row: TFood }) => {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? row.nutritions : row.nutritions.slice(0, 5);
  return (
    <Stack style={{ alignItems: 'flex-start' }}>
      {displayed.map(item => {
        if (item.quantity > 0.001)
          return (
            <Typography>
              {item.nutrition.name +
                ' - ' +
                (item.quantity * 1000).toFixed(0) +
                'g/' +
                row.measureUnit}
            </Typography>
          );
        return (
          <Typography>
            {item.nutrition.name +
              ' - ' +
              Math.floor(item.quantity * 1000000000) / 1000 +
              'mg/' +
              row.measureUnit}
          </Typography>
        );
      })}
      {row.nutritions.length > 5 && (
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'See less' : 'See more'}
        </Button>
      )}
    </Stack>
  );
};
