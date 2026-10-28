import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Flame,
  Clock,
  Gauge,
  TrendingUp,
} from 'lucide-react';

export default function MetricCards({ metrics, activeQuickFilter, onSelectQuickFilter, isDark }) {
  const cards = [
    {
      id: 'all',
      title: 'Total Register Items',
      value: metrics.total,
      subtitle: `${metrics.riskCount} Risks • ${metrics.issueCount} Issues`,
      icon: Gauge,
      accentColor: 'text-sky-500',
      badge: 'All Items',
      badgeClass: isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700',
      activeRing: 'ring-2 ring-sky-500 shadow-glow-sky',
      progress: 100,
      progressColor: 'bg-sky-500',
    },
    {
      id: 'unresolved_issues',
      title: 'Active Issues (Unresolved)',
      value: metrics.unresolvedIssues,
      subtitle: `${metrics.issueCount - metrics.unresolvedIssues} resolved / closed`,
      icon: AlertCircle,
      accentColor: 'text-rose-500',
      badge: metrics.unresolvedIssues > 0 ? 'Needs Action' : 'All Clear',
      badgeClass: metrics.unresolvedIssues > 0
        ? (isDark ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-rose-100 text-rose-800 border border-rose-200')
        : (isDark ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'),
      activeRing: 'ring-2 ring-rose-500 shadow-glow-rose',
      progress: metrics.issueCount > 0 ? Math.round((metrics.unresolvedIssues / metrics.issueCount) * 100) : 0,
      progressColor: 'bg-rose-500',
    },
    {
      id: 'unresolved_risks',
      title: 'Active Risks (Unresolved)',
      value: metrics.unresolvedRisks,
      subtitle: `${metrics.riskCount - metrics.unresolvedRisks} mitigated / closed`,
      icon: AlertTriangle,
      accentColor: 'text-amber-500',
      badge: `${metrics.unresolvedRisks} Active`,
      badgeClass: isDark ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-800 border border-amber-200',
      activeRing: 'ring-2 ring-amber-500 shadow-glow-amber',
      progress: metrics.riskCount > 0 ? Math.round((metrics.unresolvedRisks / metrics.riskCount) * 100) : 0,
      progressColor: 'bg-amber-500',
    },
    {
      id: 'high_critical',
      title: 'High & Critical Severity',
      value: metrics.highAndCriticalCount,
      subtitle: 'Score ≥ 12 threshold',
      icon: Flame,
      accentColor: 'text-orange-500',
      badge: `${metrics.highAndCriticalCount} Flagged`,
      badgeClass: isDark ? 'bg-orange-950/80 text-orange-300 border border-orange-800' : 'bg-orange-100 text-orange-800 border border-orange-200',
      activeRing: 'ring-2 ring-orange-500',
      progress: metrics.total > 0 ? Math.round((metrics.highAndCriticalCount / metrics.total) * 100) : 0,
      progressColor: 'bg-orange-500',
    },
    {
      id: 'overdue',
      title: 'Overdue Reviews',
      value: metrics.overdueCount,
      subtitle: metrics.overdueCount > 0 ? 'Immediate review overdue' : 'All reviews up to date',
      icon: Clock,
      accentColor: metrics.overdueCount > 0 ? 'text-red-500' : 'text-emerald-500',
      badge: metrics.overdueCount > 0 ? 'Overdue' : 'On Track',
      badgeClass: metrics.overdueCount > 0
        ? (isDark ? 'bg-red-950/80 text-red-300 border border-red-800' : 'bg-red-100 text-red-800 border border-red-200')
        : (isDark ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'),
      activeRing: 'ring-2 ring-red-500',
      progress: metrics.total > 0 ? Math.round((metrics.overdueCount / metrics.total) * 100) : 0,
      progressColor: metrics.overdueCount > 0 ? 'bg-red-500' : 'bg-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 my-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeQuickFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectQuickFilter(card.id)}
            aria-pressed={isActive}
            className={`text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer group flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
            } ${isActive ? card.activeRing : ''}`}
          >
            <div>
              {/* Card top */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`text-[11px] font-semibold tracking-wide uppercase line-clamp-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {card.title}
                </span>
                <div className={`p-1.5 rounded-lg shrink-0 transition-transform group-hover:scale-110 ${
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                } ${card.accentColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Number and Badge */}
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {card.value}
                </span>
                {card.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeClass}`}>
                    {card.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Subtitle and Mini Progress Bar */}
            <div className="mt-3 pt-2 border-t border-slate-100/10">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className={`truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {card.subtitle}
                </span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${card.progressColor}`}
                  style={{ width: `${Math.min(card.progress, 100)}%` }}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
