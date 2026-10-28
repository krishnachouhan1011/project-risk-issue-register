import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Clock,
} from 'lucide-react';
import {
  calculateScore,
  getSeverity,
  isOverdue,
  getRelativeDateText,
  getOwnerAvatar,
} from '../utils/calculations';
import { RECORD_TYPES } from '../types/constants';

export default function RiskCardList({
  records,
  onView,
  onEdit,
  onDelete,
  onResetFilters,
  isDark = false,
}) {
  if (records.length === 0) {
    return (
      <div className={`rounded-2xl border p-8 text-center transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          No records found
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          No project risks or active issues matched your criteria.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 text-xs font-bold text-sky-500 bg-sky-500/10 rounded-xl border border-sky-500/30"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {records.map((rec) => {
        const score = calculateScore(rec);
        const severity = getSeverity(score);
        const isRisk = rec.type === RECORD_TYPES.RISK;
        const overdue = isOverdue(rec);
        const relativeDate = getRelativeDateText(rec.reviewDate);
        const ownerInfo = getOwnerAvatar(rec.owner);

        return (
          <div
            key={rec.id}
            className={`rounded-2xl border p-5 transition-all flex flex-col justify-between hover:shadow-lg ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div>
              {/* Header row: ID, Type, Severity & Score */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      isRisk
                        ? isDark
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                        : isDark
                        ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {isRisk ? (
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-rose-500" />
                    )}
                    {rec.type}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {rec.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Score: {score}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      severity.key === 'Critical'
                        ? isDark ? 'bg-rose-950/80 text-rose-300 border-rose-800' : 'bg-rose-100 text-rose-800 border-rose-300'
                        : severity.key === 'High'
                        ? isDark ? 'bg-orange-950/80 text-orange-300 border-orange-800' : 'bg-orange-100 text-orange-800 border-orange-300'
                        : severity.key === 'Medium'
                        ? isDark ? 'bg-amber-950/80 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-800 border-amber-300'
                        : isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      severity.key === 'Critical' ? 'bg-rose-500' : severity.key === 'High' ? 'bg-orange-500' : severity.key === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    {severity.key}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                onClick={() => onView(rec)}
                className={`text-sm sm:text-base font-bold line-clamp-2 cursor-pointer transition-colors hover:text-sky-500 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {rec.title}
              </h3>

              {/* Description preview */}
              {rec.description && (
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {rec.description}
                </p>
              )}

              {/* Plan preview */}
              <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-800/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                <span className="font-bold text-slate-400 block mb-0.5">
                  {isRisk ? 'Mitigation Plan:' : 'Resolution Plan:'}
                </span>
                <p className="line-clamp-2">{rec.plan || 'No plan specified'}</p>
              </div>

              {/* Badges: Category, Status, Prob/Impact */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-medium ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  {rec.category}
                </span>

                <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-medium ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  {rec.status}
                </span>

                <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-medium ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  P: {rec.probability || 5}/5 • I: {rec.impact}/5
                </span>
              </div>
            </div>

            {/* Footer with Owner, Review Date & Actions */}
            <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold border ${ownerInfo.avatarClass}`}>
                    {ownerInfo.initials}
                  </span>
                  <span className="font-semibold text-slate-300 truncate max-w-[130px]">
                    {ownerInfo.cleanName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className={overdue ? 'text-rose-500 font-bold' : 'text-slate-400'}>
                    {rec.reviewDate} {relativeDate ? `(${relativeDate})` : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onView(rec)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(rec)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:text-amber-600 hover:bg-slate-100'
                  }`}
                  aria-label="Edit record"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(rec)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-slate-800' : 'text-slate-500 hover:text-rose-600 hover:bg-slate-100'
                  }`}
                  aria-label="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
