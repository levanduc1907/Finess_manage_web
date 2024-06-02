import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useUpdateSet() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.editSet,
  });

  return {
    update: mutateAsync,
    status,
  };
}
