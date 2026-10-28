import React from 'react';
import {
  ShieldAlert,
  Plus,
  Download,
  RotateCcw,
  HelpCircle,
  Table as TableIcon,
  LayoutGrid,
  Sun,
  Moon,
  Grid3X3,
  Sliders,
  BookOpen,
} from 'lucide-react';

export default function Header({
  onNewRecord,
  onExportCsv,
  onResetSampleData,
  onOpenGuide,
  viewMode,
  onToggleViewMode,
  isDark,
  onToggleTheme,
  showHeatmap,
  onToggleHeatmap,
  density,
  onToggleDensity,
  metrics,
  currentView = 'register', // 'register' | 'about'
  onNavigate,
}) {
  const riskExposure = metrics?.totalActiveScore || 0;
  const isElevated = metrics?.highAndCriticalCount > 0;

  return (
    <header className={`border-b transition-colors sticky top-0 z-30 ${
      isDark
        ? 'bg-slate-900/95 border-slate-800 backdrop-blur-md shadow-lg shadow-black/20'
        : 'bg-white/95 border-slate-200 backdrop-blur-md shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Branding, Title & Health Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('register')}
              className="relative text-left flex items-center gap-3 group cursor-pointer focus:outline-hidden"
              title="Click to go to Register Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Project Risk & Issue Register
                  </h1>
                  <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    isDark
                      ? 'bg-slate-800 text-sky-400 border-slate-700'
                      : 'bg-sky-50 text-sky-700 border-sky-200'
                  }`}>
                    PMBOK 5×5
                  </span>
                  {/* Risk Exposure badge */}
                  <span className={`hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                    riskExposure > 30
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                      : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${riskExposure > 30 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    Exposure: {riskExposure} pts
                  </span>
                </div>
                <p className={`text-xs mt-0.5 hidden sm:block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Enterprise Risk Assessment, Active Issues Triage & Resolution Workflow
                </p>
              </div>
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Navigation Tab: Register vs About & Guide */}
            <div className={`inline-flex rounded-xl border p-0.5 ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('register')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentView === 'register'
                    ? isDark ? 'bg-slate-700 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Register</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('about')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentView === 'about'
                    ? isDark ? 'bg-slate-700 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>About & Guide</span>
              </button>
            </div>

            {/* If in register view, show register-specific tools */}
            {currentView === 'register' && (
              <>
                {/* Heatmap Toggle */}
                <button
                  type="button"
                  onClick={onToggleHeatmap}
                  aria-label="Toggle 5x5 Heatmap Matrix"
                  aria-pressed={showHeatmap}
                  className={`p-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    showHeatmap
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-500 font-semibold'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                  title="Toggle interactive 5x5 Heatmap"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>

                {/* Density Toggle */}
                <button
                  type="button"
                  onClick={onToggleDensity}
                  aria-label="Toggle Table Density"
                  className={`p-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                  title={`Switch density: Currently ${density}`}
                >
                  <Sliders className="w-4 h-4" />
                </button>

                {/* View Mode Toggle (Table / Card) */}
                <div className={`inline-flex rounded-lg border p-0.5 ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => onToggleViewMode('table')}
                    aria-label="Switch to Table View"
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      viewMode === 'table'
                        ? isDark ? 'bg-slate-700 text-white shadow-xs font-semibold' : 'bg-white text-slate-900 shadow-xs font-semibold'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleViewMode('cards')}
                    aria-label="Switch to Cards View"
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      viewMode === 'cards'
                        ? isDark ? 'bg-slate-700 text-white shadow-xs font-semibold' : 'bg-white text-slate-900 shadow-xs font-semibold'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cards</span>
                  </button>
                </div>
              </>
            )}

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Color Theme"
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Matrix Guide Button */}
            <button
              type="button"
              onClick={onOpenGuide}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="View 5x5 Matrix & Severity Score Thresholds"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
              <span>Matrix Guide</span>
            </button>

            {/* Reset Samples */}
            <button
              type="button"
              onClick={onResetSampleData}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Restore sample records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>

            {/* Export CSV */}
            <button
              type="button"
              onClick={onExportCsv}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
              }`}
              title="Export filtered records to RFC 4180 CSV"
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span>Export CSV</span>
            </button>

            {/* Create New Item Button */}
            <button
              type="button"
              onClick={onNewRecord}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
