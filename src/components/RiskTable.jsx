import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Clock,
  ExternalLink,
} from 'lucide-react';
import {
  calculateScore,
  getSeverity,
  isOverdue,
  getRelativeDateText,
  getOwnerAvatar,
} from '../utils/calculations';
import { RECORD_TYPES } from '../types/constants';

export default function RiskTable({
  records,
  sortBy,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onDelete,
  onResetFilters,
  density = 'comfortable',
  isDark = false,
}) {
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-sky-500 inline ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-sky-500 inline ml-1" />
    );
  };

  const getAriaSort = (columnKey) => {
    if (sortBy !== columnKey) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  const cellPadding = density === 'compact' ? 'py-2 px-3' : 'py-3.5 px-4';

  if (records.length === 0) {
    return (
      <div className={`rounded-2xl border p-12 text-center transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-300'
          : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="w-14 h-14 rounded-2xl bg-slate-500/10 text-slate-400 mx-auto flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          No matching records found
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
          No project risks or active issues matched your active filters. Try searching with different terms or resetting filters.
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-bold text-sky-500 hover:text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 rounded-xl border border-sky-500/30 transition-all cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-colors ${
      isDark
        ? 'bg-slate-900/90 border-slate-800 shadow-xl'
        : 'bg-white border-slate-200/90 shadow-2xs'
    }`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table
          className="min-w-full divide-y text-left text-xs sm:text-sm"
          aria-label="Project Risk and Issue Register Table"
        >
          <thead className={isDark ? 'bg-slate-950/60 text-slate-400' : 'bg-slate-50 text-slate-500'}>
            <tr className="text-[11px] font-bold uppercase tracking-wider">
              <th scope="col" className={`${cellPadding} w-24`}>
                <button
                  type="button"
                  onClick={() => onSort('id')}
                  aria-sort={getAriaSort('id')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  ID {getSortIcon('id')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} min-w-[280px]`}>
                <button
                  type="button"
                  onClick={() => onSort('title')}
                  aria-sort={getAriaSort('title')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  Title & Plan {getSortIcon('title')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-28`}>
                <button
                  type="button"
                  onClick={() => onSort('type')}
                  aria-sort={getAriaSort('type')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  Type {getSortIcon('type')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-36`}>
                <button
                  type="button"
                  onClick={() => onSort('category')}
                  aria-sort={getAriaSort('category')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  Category {getSortIcon('category')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-24 text-center`}>
                <button
                  type="button"
                  onClick={() => onSort('probability')}
                  aria-sort={getAriaSort('probability')}
                  className="inline-flex items-center hover:text-sky-500 transition-colors"
                  title="Probability (1 to 5)"
                >
                  Prob {getSortIcon('probability')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-24 text-center`}>
                <button
                  type="button"
                  onClick={() => onSort('impact')}
                  aria-sort={getAriaSort('impact')}
                  className="inline-flex items-center hover:text-sky-500 transition-colors"
                  title="Impact (1 to 5)"
                >
                  Impact {getSortIcon('impact')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-36 text-center`}>
                <button
                  type="button"
                  onClick={() => onSort('score')}
                  aria-sort={getAriaSort('score')}
                  className="inline-flex items-center hover:text-sky-500 font-extrabold transition-colors"
                  title="Score = Probability × Impact (1-25)"
                >
                  Score & Severity {getSortIcon('score')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-32`}>
                <button
                  type="button"
                  onClick={() => onSort('status')}
                  aria-sort={getAriaSort('status')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  Status {getSortIcon('status')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-36`}>
                <button
                  type="button"
                  onClick={() => onSort('reviewDate')}
                  aria-sort={getAriaSort('reviewDate')}
                  className="flex items-center hover:text-sky-500 transition-colors"
                >
                  Review Date {getSortIcon('reviewDate')}
                </button>
              </th>

              <th scope="col" className={`${cellPadding} w-24 text-right`}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className={`divide-y ${
            isDark ? 'divide-slate-800 text-slate-200' : 'divide-slate-100 text-slate-800'
          }`}>
            {records.map((rec) => {
              const score = calculateScore(rec);
              const severity = getSeverity(score);
              const isRisk = rec.type === RECORD_TYPES.RISK;
              const overdue = isOverdue(rec);
              const relativeDate = getRelativeDateText(rec.reviewDate);
              const ownerInfo = getOwnerAvatar(rec.owner);

              return (
                <tr
                  key={rec.id}
                  className={`transition-colors group ${
                    isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* ID */}
                  <td className={`${cellPadding} font-mono text-xs font-semibold whitespace-nowrap text-slate-400`}>
                    {rec.id}
                  </td>

                  {/* Title, Plan & Owner Info */}
                  <td className={`${cellPadding} max-w-md`}>
                    <button
                      type="button"
                      onClick={() => onView(rec)}
                      className={`text-left font-bold block line-clamp-1 transition-colors hover:text-sky-500 cursor-pointer ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      title={rec.title}
                    >
                      {rec.title}
                    </button>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      <span className="font-semibold text-slate-400">
                        {isRisk ? 'Mitigation:' : 'Resolution:'}
                      </span>{' '}
                      {rec.plan || 'No plan specified'}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold border ${ownerInfo.avatarClass}`}>
                        {ownerInfo.initials}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {ownerInfo.cleanName}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className={`${cellPadding} whitespace-nowrap`}>
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
                  </td>

                  {/* Category */}
                  <td className={`${cellPadding} whitespace-nowrap text-xs`}>
                    <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-medium ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {rec.category}
                    </span>
                  </td>

                  {/* Probability */}
                  <td className={`${cellPadding} whitespace-nowrap text-center`}>
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-xs">
                        {rec.probability || 5}/5
                      </span>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              idx <= (rec.probability || 5)
                                ? 'bg-sky-500'
                                : isDark ? 'bg-slate-800' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Impact */}
                  <td className={`${cellPadding} whitespace-nowrap text-center`}>
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-xs">
                        {rec.impact}/5
                      </span>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              idx <= rec.impact
                                ? 'bg-indigo-500'
                                : isDark ? 'bg-slate-800' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Score & Severity */}
                  <td className={`${cellPadding} whitespace-nowrap text-center`}>
                    <div className="inline-flex items-center gap-2">
                      <span className="font-black text-sm w-5 text-right">
                        {score}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          severity.key === 'Critical'
                            ? isDark
                              ? 'bg-rose-950/80 text-rose-300 border-rose-800 shadow-glow-rose'
                              : 'bg-rose-100 text-rose-800 border-rose-300'
                            : severity.key === 'High'
                            ? isDark
                              ? 'bg-orange-950/80 text-orange-300 border-orange-800'
                              : 'bg-orange-100 text-orange-800 border-orange-300'
                            : severity.key === 'Medium'
                            ? isDark
                              ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                            : isDark
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          severity.key === 'Critical'
                            ? 'bg-rose-500 animate-pulse'
                            : severity.key === 'High'
                            ? 'bg-orange-500'
                            : severity.key === 'Medium'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`} />
                        {severity.key}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className={`${cellPadding} whitespace-nowrap text-xs`}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium border ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {rec.status}
                    </span>
                  </td>

                  {/* Review Date */}
                  <td className={`${cellPadding} whitespace-nowrap text-xs`}>
                    <div className="flex items-center gap-1.5">
                      {overdue ? (
                        <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0 animate-pulse" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className={overdue ? 'text-rose-500 font-bold' : 'text-slate-400'}>
                        {rec.reviewDate}
                      </span>
                    </div>
                    {relativeDate && (
                      <span className={`text-[10px] block mt-0.5 ${
                        overdue ? 'text-rose-400 font-semibold' : 'text-slate-500'
                      }`}>
                        {relativeDate}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className={`${cellPadding} whitespace-nowrap text-right`}>
                    <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => onView(rec)}
                        aria-label={`View details of ${rec.id}`}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'
                            : 'text-slate-400 hover:text-sky-600 hover:bg-slate-100'
                        }`}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(rec)}
                        aria-label={`Edit ${rec.id}`}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                            : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
                        }`}
                        title="Edit record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(rec)}
                        aria-label={`Delete ${rec.id}`}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                            : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                        }`}
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
