import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

type ToastState = Toast[];

const ToastContext = React.createContext<{
  toast: (toast: Omit<Toast, "id">) => void;
}>({
  toast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastState>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg p-4 rounded-lg w-80 relative"
          >
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X size={16} />
            </button>
            {t.title && <div className="font-semibold">{t.title}</div>}
            {t.description && <div className="text-sm mt-1">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  return React.useContext(ToastContext);
}
