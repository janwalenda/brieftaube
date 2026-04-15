"use client";

import { IoClose } from "react-icons/io5";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Toast } from "./ui/toast";
import { useToastStore } from "@/store/useToastStore";

export default function ToastBox() {
  const { toasts, removeToast } = useToastStore();

  return (
    <Toast className="md:toast-bottom toast-end toast-top z-500">
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          variant={toast.variant}
        >
          {toast.message}
          <Button buttonStyle={"ghost"} modifier={"circle"} onClick={() => removeToast(toast.id)}>
            <IoClose />
          </Button>
        </Alert>
      ))}
    </Toast>
  )
}
