import React from 'react';

import { RouteObject } from 'react-router-dom';

const Exercises = React.lazy(() =>
  import('@/pages/exercise/Exercises').then(mod => ({
    default: mod.Exercises,
  })),
);
const NewExercise = React.lazy(() =>
  import('@/pages/exercise/subpages/ExerciseNew/ExerciseNew').then(mod => ({
    default: mod.ExerciseNew,
  })),
);
const AllMuscleGroups = React.lazy(() =>
  import('@/pages/exercise/subpages/MuscleGroups/MuscleGroups').then(mod => ({
    default: mod.MuscleGroups,
  })),
);
const NewMuscleGroup = React.lazy(() =>
  import('@/pages/exercise/subpages/MuscleGroupsNew/MuscleGroupsNew').then(
    mod => ({
      default: mod.MuscleGroupsNew,
    }),
  ),
);

export const exerciseRoutes: RouteObject[] = [
  {
    path: '/exercises',
    Component: Exercises,
  },
  {
    path: '/exercises/new',
    Component: NewExercise,
  },
  {
    path: '/exercises/:id/edit',
    Component: NewExercise,
  },
  {
    path: '/exercises/muscle-groups',
    Component: AllMuscleGroups,
  },
  {
    path: '/exercises/muscle-groups/new',
    Component: NewMuscleGroup,
  },
  {
    path: '/exercises/muscle-groups/:id/edit',
    Component: NewMuscleGroup,
  },
];
