import { FetchApi } from '@/utils/FetchApi';
import { useMutation } from '@tanstack/react-query';

export function useMutationDeleteMuscleGroup() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.deleteMuscleGroup,
  });

  return {
    deleteMuscleGroup: mutateAsync,
    status,
  };
}
