import { FetchApi } from '@/utils/FetchApi';
import { useMutation } from '@tanstack/react-query';

export function useMutationDeleteExercise() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.deleteExercise,
  });

  return {
    deleteExercise: mutateAsync,
    status,
  };
}
