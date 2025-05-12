import * as React from "react";
import { ToastProvider, useToast as useToastPrimitive } from "./toast";

export function useToast() {
  const { toast } = useToastPrimitive();
  return {
    toast,
  };
}

export { ToastProvider };
