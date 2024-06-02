import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useCreateExercise() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.createExercise,
  });

  return {
    create: mutateAsync,
    status,
  };
}
