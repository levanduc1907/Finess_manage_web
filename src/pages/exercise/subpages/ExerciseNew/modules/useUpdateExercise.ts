import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useUpdateExercise() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.editExercise,
  });

  return {
    update: mutateAsync,
    status,
  };
}
