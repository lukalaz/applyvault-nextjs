"use client";

import { useSnackbar, OptionsObject } from "notistack";

type ToastOptions = Omit<OptionsObject, "variant">;

export function useToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    toastSuccess: (message: string, options?: ToastOptions) =>
      enqueueSnackbar(message, { ...options, variant: "success" }),

    toastError: (message: string, options?: ToastOptions) =>
      enqueueSnackbar(message, { ...options, variant: "error" }),

    toastWarning: (message: string, options?: ToastOptions) =>
      enqueueSnackbar(message, { ...options, variant: "warning" }),

    toastInfo: (message: string, options?: ToastOptions) =>
      enqueueSnackbar(message, { ...options, variant: "info" }),

    closeToast: closeSnackbar,
  };
}
