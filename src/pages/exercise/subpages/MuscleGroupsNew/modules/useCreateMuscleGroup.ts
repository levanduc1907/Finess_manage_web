import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useCreateMuscleGroup() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.createMuscleGroup,
  });

  return {
    create: mutateAsync,
    status,
  };
}
