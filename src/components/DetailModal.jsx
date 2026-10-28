import React, { useEffect } from 'react';
import {
  X,
  Edit2,
  Trash2,
  Calendar,
  User,
  Tag,
  Clock,
  AlertTriangle,
  AlertCircle,
  FileText,
  Target,
} from 'lucide-react';
import {
  calculateScore,
  getSeverity,
  isOverdue,
  getRelativeDateText,
  getOwnerAvatar,
} from '../utils/calculations';
import { RECORD_TYPES } from '../types/constants';

export default function DetailModal({
  isOpen,
  record,
  onClose,
  onEdit,
  onDelete,
  isDark = false,
}) {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !record) return null;

  const score = calculateScore(record);
  const severity = getSeverity(score);
  const isRisk = record.type === RECORD_TYPES.RISK;
  const overdue = isOverdue(record);
  const relativeDate = getRelativeDateText(record.reviewDate);
  const ownerInfo = getOwnerAvatar(record.owner);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className={`rounded-2xl max-w-2xl w-full border overflow-hidden shadow-2xl transform transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-start justify-between ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isRisk
                    ? isDark ? 'bg-amber-950/60 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-200'
                    : isDark ? 'bg-rose-950/60 text-rose-300 border-rose-800' : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {isRisk ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                {record.type}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">
                {record.id}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {record.status}
              </span>
            </div>
            <h2 id="detail-modal-title" className="text-lg font-bold leading-snug">
              {record.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Severity & Score Banner */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Score
              </span>
              <div className="text-3xl font-black text-sky-400 mt-0.5">
                {score}
                <span className="text-xs font-normal text-slate-400 ml-1">/ 25</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Severity
              </span>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${severity.badgeBg}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {severity.key}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Probability
              </span>
              <div className="text-base font-bold text-slate-200 mt-1">
                {record.probability || 5} / 5
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Impact
              </span>
              <div className="text-base font-bold text-slate-200 mt-1">
                {record.impact} / 5
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-500" />
              Description
            </h3>
            <p className={`text-sm p-4 rounded-xl border whitespace-pre-wrap leading-relaxed ${
              isDark ? 'bg-slate-800/50 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {record.description || 'No detailed background description provided.'}
            </p>
          </div>

          {/* Mitigation / Resolution Plan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-sky-500" />
              {isRisk ? 'Mitigation Plan' : 'Resolution Plan'}
            </h3>
            <p className={`text-sm p-4 rounded-xl border whitespace-pre-wrap leading-relaxed ${
              isDark ? 'bg-slate-800/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              {record.plan || 'No plan documented yet.'}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] border shrink-0 ${ownerInfo.avatarClass}`}>
                {ownerInfo.initials}
              </div>
              <div>
                <span className="text-slate-400 block">Owner</span>
                <span className="font-bold">{record.owner}</span>
              </div>
            </div>

            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Tag className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <span className="text-slate-400 block">Category</span>
                <span className="font-bold">{record.category}</span>
              </div>
            </div>

            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <span className="text-slate-400 block">Review / Target Date</span>
                <span className={`font-bold ${overdue ? 'text-rose-500' : ''}`}>
                  {record.reviewDate} {relativeDate ? `(${relativeDate})` : ''}
                </span>
              </div>
            </div>

            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <span className="text-slate-400 block">Last Updated</span>
                <span className="font-bold">
                  {record.updatedAt || record.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(record);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/30 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(record);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
