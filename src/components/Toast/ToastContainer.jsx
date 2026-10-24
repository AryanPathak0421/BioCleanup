import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let IconComponent = CheckCircle2;
        let borderColor = '#143D2B';
        let iconColor = 'text-emerald-700';

        if (toast.type === 'error') {
          IconComponent = AlertCircle;
          borderColor = '#D35E35';
          iconColor = 'text-rose-600';
        } else if (toast.type === 'info') {
          IconComponent = Info;
          borderColor = '#4E7D59';
          iconColor = 'text-emerald-800';
        }

        return (
          <div
            key={toast.id}
            className="toast-item"
            style={{ borderLeftColor: borderColor }}
          >
            <div className={`shrink-0 ${iconColor}`}>
              <IconComponent size={20} />
            </div>

            <div className="flex-1">
              <h5 className="text-xs font-bold text-[#143D2B]">{toast.title}</h5>
              {toast.message && (
                <p className="text-[11px] text-[#5C6E64] mt-0.5 leading-tight">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#7A8E84] hover:text-[#143D2B] p-1 transition"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
