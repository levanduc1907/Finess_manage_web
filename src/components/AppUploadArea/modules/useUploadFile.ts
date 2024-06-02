import { useMutation } from '@tanstack/react-query';

import { FetchApi } from '@/utils/FetchApi';

export function useUploadFile() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.uploadFile,
  });

  return {
    upload: mutateAsync,
    status,
  };
}
