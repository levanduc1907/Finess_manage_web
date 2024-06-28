import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
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
import { useState } from 'react';

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
        return <ExerciseCards exercises={row.exercises} />;
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
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: 8 }}
        >
          {`Quantity: ${exercise?.quantity}`}
        </Typography>
      );
    }
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ marginTop: 8 }}
      >
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
        height: 100,
        marginTop: 0,
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          image={exercise?.exercise?.imageUrl}
          alt={exercise?.exercise?.name}
        />
      </Box>
      <CardContent
        sx={{
          minWidth: 100,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 1,
        }}
      >
        <Typography variant="subtitle2">{exercise?.exercise?.name}</Typography>
        {renderQuantity()}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;

const ExerciseCards = ({ exercises }: { exercises: TSetItem['exercises'] }) => {
  const [expanded, setExpanded] = useState(false);
  if (!exercises) {
    return null;
  }
  const displayedExercise = expanded ? exercises : exercises.slice(0, 3);

  return (
    <Container>
      <Grid
        style={{ paddingTop: 40 }}
        container
        spacing={3}
        direction={'column'}
      >
        {displayedExercise.map(exercise => (
          <Grid
            key={exercise._id}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="h1">·</Typography>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      {/* <Grid style={{ paddingTop: 40, height: 100 }} container spacing={3}> */}
      {exercises.length > 3 && (
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'See less' : 'See more'}
        </Button>
      )}
      {/* </Grid> */}
    </Container>
  );
};
