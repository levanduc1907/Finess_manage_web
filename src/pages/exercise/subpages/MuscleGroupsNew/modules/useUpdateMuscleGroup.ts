import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useUpdateMuscleGroup() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.editMuscleGroup,
  });

  return {
    update: mutateAsync,
    status,
  };
}
