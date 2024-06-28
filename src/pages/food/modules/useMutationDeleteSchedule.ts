import { FetchApi } from '@/utils/FetchApi';
import { useMutation } from '@tanstack/react-query';

export function useMutationDeletefood() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.deletefood,
  });

  return {
    deletefood: mutateAsync,
    status,
  };
}
