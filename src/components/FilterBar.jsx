import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import {
  CATEGORIES,
  RECORD_TYPES,
  RISK_STATUSES,
  ISSUE_STATUSES,
  SEVERITY_LEVELS,
} from '../types/constants';

export default function FilterBar({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalCount,
  filteredCount,
  isDark = false,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    filters.searchTerm !== '' ||
    filters.typeFilter !== 'All' ||
    filters.categoryFilter !== 'All' ||
    filters.statusFilter !== 'All' ||
    filters.severityFilter !== 'All' ||
    filters.unresolvedOnly ||
    filters.quickFilter !== 'all' ||
    filters.matrixCell !== null;

  return (
    <div className={`rounded-2xl border p-4 transition-colors ${
      isDark
        ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
        : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
    }`}>
      {/* Primary Toolbar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onUpdateFilters({ searchTerm: e.target.value })}
            placeholder="Search risks, issues, owners, IDs, or plans..."
            className={`w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          {filters.searchTerm && (
            <button
              type="button"
              onClick={() => onUpdateFilters({ searchTerm: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
              aria-label="Clear search text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type pills: All | Risks | Issues */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 ${
          isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          {['All', RECORD_TYPES.RISK, RECORD_TYPES.ISSUE].map((type) => {
            const isSelected = filters.typeFilter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onUpdateFilters({ typeFilter: type })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'All' ? 'All Types' : `${type}s`}
              </button>
            );
          })}
        </div>

        {/* Quick Unresolved Only Toggle */}
        <button
          type="button"
          onClick={() => onUpdateFilters({ unresolvedOnly: !filters.unresolvedOnly })}
          className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
            filters.unresolvedOnly
              ? 'bg-sky-500/15 text-sky-500 border-sky-500/40 ring-2 ring-sky-500/30'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${
            filters.unresolvedOnly ? 'bg-sky-500 animate-pulse' : 'bg-slate-400'
          }`} />
          <span>Unresolved Only</span>
        </button>

        {/* Advanced Filters Button */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            showAdvanced || hasActiveFilters
              ? 'bg-sky-500/15 border-sky-500/40 text-sky-500'
              : isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          )}
        </button>
      </div>

      {/* Advanced Filters Drawer */}
      {showAdvanced && (
        <div className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs animate-in fade-in duration-100 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          {/* Category Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Category</label>
            <select
              value={filters.categoryFilter}
              onChange={(e) => onUpdateFilters({ categoryFilter: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Status</label>
            <select
              value={filters.statusFilter}
              onChange={(e) => onUpdateFilters({ statusFilter: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Statuses</option>
              {Array.from(new Set([...RISK_STATUSES, ...ISSUE_STATUSES])).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Severity</label>
            <select
              value={filters.severityFilter}
              onChange={(e) => onUpdateFilters({ severityFilter: e.target.value })}
              className={`w-full px-3 py-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Severities</option>
              {Object.values(SEVERITY_LEVELS).map((lvl) => (
                <option key={lvl.key} value={lvl.key}>
                  {lvl.key} ({lvl.minScore}–{lvl.maxScore})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Sort By</label>
            <div className="flex items-center gap-1.5">
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="score">Score (Severity)</option>
                <option value="reviewDate">Review Date</option>
                <option value="impact">Impact</option>
                <option value="probability">Probability</option>
                <option value="title">Title (A-Z)</option>
                <option value="status">Status</option>
                <option value="id">ID</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    sortDirection: filters.sortDirection === 'desc' ? 'asc' : 'desc',
                  })
                }
                title={`Sort ${filters.sortDirection === 'desc' ? 'Ascending' : 'Descending'}`}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Status Bar & Active Badges */}
      <div className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between text-xs gap-2 ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className={isDark ? 'text-white' : 'text-slate-900'}>{filteredCount}</strong> of{' '}
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>{totalCount}</strong> records
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-sky-500 hover:text-sky-400 font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Active badges list */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.typeFilter !== 'All' && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
              isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              Type: {filters.typeFilter}
              <button
                type="button"
                onClick={() => onUpdateFilters({ typeFilter: 'All' })}
                aria-label="Remove Type Filter"
              >
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filters.unresolvedOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-500/15 text-sky-500 border border-sky-500/30">
              Unresolved Only
              <button
                type="button"
                onClick={() => onUpdateFilters({ unresolvedOnly: false })}
                aria-label="Remove Unresolved Only Filter"
              >
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filters.quickFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-500/15 text-sky-500 border border-sky-500/30">
              Quick Filter: {filters.quickFilter.replace('_', ' ')}
              <button
                type="button"
                onClick={() => onUpdateFilters({ quickFilter: 'all' })}
                aria-label="Remove Quick Filter"
              >
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filters.matrixCell && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Matrix Cell: P{filters.matrixCell.probability} × I{filters.matrixCell.impact}
              <button
                type="button"
                onClick={() => onUpdateFilters({ matrixCell: null })}
                aria-label="Remove Matrix Cell Filter"
              >
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filters.severityFilter !== 'All' && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
              isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              Severity: {filters.severityFilter}
              <button
                type="button"
                onClick={() => onUpdateFilters({ severityFilter: 'All' })}
                aria-label="Remove Severity Filter"
              >
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
