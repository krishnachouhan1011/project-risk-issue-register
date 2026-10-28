import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  record,
  onConfirm,
  onCancel,
  isDark = false,
}) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelBtnRef.current?.focus();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onCancel();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen || !record) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className={`rounded-2xl max-w-md w-full border overflow-hidden shadow-2xl p-6 transform transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/30">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 id="delete-dialog-title" className="text-base font-bold">
              Delete {record.type}
            </h2>
            <p className="text-xs font-mono text-slate-400">
              {record.id}
            </p>
          </div>
        </div>

        <p id="delete-dialog-desc" className="mt-4 text-sm text-slate-400 leading-relaxed">
          Are you sure you want to permanently delete <strong className={isDark ? 'text-white' : 'text-slate-900'}>"{record.title}"</strong>? This action cannot be reversed.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(record.id)}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-500/25 transition-all cursor-pointer active:scale-95"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
