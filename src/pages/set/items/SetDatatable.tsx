import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AppDatatable, TBaseColumn } from '@/components';
import { QueryKeys, ToastService, useAppLanguage } from '@/utils/modules';

import { theme } from '@/utils/modules/theme';
import { useMutationDeleteExercise } from '../modules/useMutationDeleteExercise';
import { useQueryClient } from '@tanstack/react-query';
import { TExercise, TSetItem } from '@/utils/FetchApi';
import { useQuerySet } from '../modules/useQuerySet';
import { useFormOptions } from '@/utils/modules/useFormOptions';
import { Convert } from '@/utils/modules/Convert';

export function SetDatatable() {
  const { Strings, code } = useAppLanguage();
  const navigate = useNavigate();
  const form = useFormContext();
  const { data, isLoading, isFetching } = useQuerySet();
  console.log('data', data);
  const queryClient = useQueryClient();
  const { deleteExercise, status } = useMutationDeleteExercise();
  const handleChangePagination = (page: number, limit: number) => {
    form.setValue('limit', limit);
    form.setValue('page', page);
  };
  const { formOptions } = useFormOptions();

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
      render: (row: TSetItem) => {
        return formOptions.motivation.find(item => item.value === row.type)
          ?.label;
      },
    },
    {
      id: 'type',
      label: `${Strings.Calories} /${Strings.time}`,
      align: 'center',
      minWidth: 200,
      render: (row: TSetItem) => {
        return `${row.totalCalories}kcal / ${Convert.secondToTime(row.totalTimes)}`;
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
      id: 'exercise',
      label: Strings.exercise,
      align: 'left',
      minWidth: 200,
      render: (row: TSetItem) => {
        return (
          <Container>
            <Grid
              style={{ paddingTop: 40 }}
              container
              spacing={3}
              direction={'column'}
            >
              {row.exercises.map(exercise => (
                <Grid
                  key={exercise._id}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant="h1">·</Typography>
                  <ExerciseCard exercise={exercise} />
                </Grid>
              ))}
            </Grid>
          </Container>
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
              <EditIcon onClick={() => navigate(`/sets/${row?._id}/edit`)} />
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

const ExerciseCard = ({
  exercise,
}: {
  exercise: TSetItem['exercises'][number];
}) => {
  console.log(exercise);
  const renderQuantity = () => {
    if (exercise?.exercise?.type === 'rep') {
      return (
        <Typography variant="body2" color="text.secondary">
          {`Quantity: ${exercise?.quantity}`}
        </Typography>
      );
    }
    return (
      <Typography variant="body2" color="text.secondary">
        {`Time: ${Convert.secondToTime(exercise?.quantity)}`}
      </Typography>
    );
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        display: 'flex',
        minWidth: 300,
        height: 75,
        marginTop: 0,
      }}

      // style={{ backgroundColor: 'red', height: 100, width: 100 }}
    >
      <CardMedia
        component="img"
        height="140"
        style={{ width: 150, height: 75 }}
        image={exercise?.exercise?.imageUrl}
        alt={exercise?.exercise?.name}
      />
      <CardContent
        style={{
          minWidth: 100,
          height: 100,
          justifyContent: 'space-around',
          paddingTop: 10,
        }}
      >
        <Typography variant="h5">{exercise?.exercise?.name}</Typography>
        {renderQuantity()}
      </CardContent>
    </Card>
  );
};
