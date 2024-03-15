import { toast } from 'react-toastify';

const defaultConfig = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  style: { fontSize: '14px' }
};

export const showToast = (type, message, customProps) => {
  const toastType = type ?? 'error';

  const toastConfig = {
    ...defaultConfig,
    ...customProps,
    type: toastType,
  };

  toast(message, toastConfig);
};

export default showToast;
