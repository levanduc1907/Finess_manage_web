import { toast } from 'react-toastify';

export const ToastService = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  }
};