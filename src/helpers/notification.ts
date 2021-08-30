import { toast, ToastOptions } from "react-toastify";

const configToast: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
};

export function notifyMessage(isError: boolean, message: string) {
  if (isError) {
    toast.error(message, configToast);
  } else {
    toast.success(message, configToast);
  }
}
