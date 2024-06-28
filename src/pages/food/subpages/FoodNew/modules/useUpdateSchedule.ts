import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useUpdatefood() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.editfood,
  });

  return {
    update: mutateAsync,
    status,
  };
}
