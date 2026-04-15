import { create } from "zustand"

export interface ToastMessage {
  id: string
  message: string
  variant?: "info" | "success" | "warning" | "error"
  duration?: number
}

interface ToastState {
  toasts: ToastMessage[]
  addToast: (message: string, variant?: ToastMessage["variant"], duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, variant = "info", duration = 4000) => {
    const id = crypto.randomUUID()
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, duration }],
    }))
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, duration)
    }
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}));

export const useToast = () => useToastStore((state) => state);
