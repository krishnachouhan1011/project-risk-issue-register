import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

export default function SeverityGuideModal({ isOpen, onClose, isDark = false }) {
  if (!isOpen) return null;

  const matrix = [
    // Probability 5 down to 1
    [5, 10, 15, 20, 25],
    [4, 8, 12, 16, 20],
    [3, 6, 9, 12, 15],
    [2, 4, 6, 8, 10],
    [1, 2, 3, 4, 5],
  ];

  const getCellColor = (score) => {
    if (score >= 20) return isDark ? 'bg-rose-950 text-rose-300 font-extrabold border-rose-800' : 'bg-rose-500 text-white font-bold';
    if (score >= 12) return isDark ? 'bg-orange-950 text-orange-300 font-bold border-orange-800' : 'bg-orange-400 text-slate-900 font-semibold';
    if (score >= 6) return isDark ? 'bg-amber-950 text-amber-300 font-semibold border-amber-800' : 'bg-amber-300 text-slate-900 font-medium';
    return isDark ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-emerald-200 text-slate-900';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className={`rounded-2xl max-w-3xl w-full border overflow-hidden shadow-2xl transform transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 id="guide-modal-title" className="text-base sm:text-lg font-bold">
              Risk & Issue Scoring Framework (5×5 Matrix)
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
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Methodology Banner */}
          <div className={`border rounded-2xl p-4 text-xs sm:text-sm ${
            isDark ? 'bg-sky-950/40 border-sky-800/80 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}>
            <h3 className="font-bold mb-1.5 text-sky-400">Scoring Methodology:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li>
                <strong>Risk Score:</strong> <code className="bg-sky-500/20 px-1.5 py-0.5 rounded font-mono font-bold">Probability (1–5) × Impact (1–5)</code> (Score range: 1 to 25).
              </li>
              <li>
                <strong>Active Issues:</strong> Since issues represent materialized events (100% certainty), probability defaults to <code className="bg-sky-500/20 px-1.5 py-0.5 rounded font-mono font-bold">5</code>. The severity score is <code className="bg-sky-500/20 px-1.5 py-0.5 rounded font-mono font-bold">5 × Impact</code>.
              </li>
            </ul>
          </div>

          {/* Documented Severity Thresholds */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Documented Severity Thresholds
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-emerald-950/40 border-emerald-800/70 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Low</span>
                  <span className="text-xs font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    1 – 5
                  </span>
                </div>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">
                  Minor impact or rare occurrence; routine monitoring and review.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-amber-950/40 border-amber-800/70 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Medium</span>
                  <span className="text-xs font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded-full">
                    6 – 11
                  </span>
                </div>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">
                  Noticeable delay or cost variance; requires proactive mitigation plan.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-orange-950/40 border-orange-800/70 text-orange-200' : 'bg-orange-50 border-orange-200 text-orange-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">High</span>
                  <span className="text-xs font-mono font-bold bg-orange-500/20 px-2 py-0.5 rounded-full">
                    12 – 19
                  </span>
                </div>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">
                  Significant threat to deliverables; active management escalation needed.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-rose-950/40 border-rose-800/70 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Critical</span>
                  <span className="text-xs font-mono font-bold bg-rose-500/20 px-2 py-0.5 rounded-full">
                    20 – 25
                  </span>
                </div>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">
                  Severe threat to viability; immediate executive intervention and containment.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Heatmap Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              5 × 5 Probability & Impact Heatmap
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-700/60">
              <table className="min-w-full text-center border-collapse text-xs">
                <thead>
                  <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                    <th className="p-2.5 font-bold text-left border-r border-slate-700/40">
                      Probability \ Impact
                    </th>
                    <th className="p-2.5 font-semibold">1 - Negligible</th>
                    <th className="p-2.5 font-semibold">2 - Minor</th>
                    <th className="p-2.5 font-semibold">3 - Moderate</th>
                    <th className="p-2.5 font-semibold">4 - Major</th>
                    <th className="p-2.5 font-semibold">5 - Critical</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/40">
                  {[5, 4, 3, 2, 1].map((prob, rowIdx) => (
                    <tr key={prob}>
                      <td className={`p-2.5 font-bold text-left border-r border-slate-700/40 ${
                        isDark ? 'bg-slate-850 text-slate-300' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {prob} - {prob === 5 ? 'Very High' : prob === 4 ? 'High' : prob === 3 ? 'Moderate' : prob === 2 ? 'Low' : 'Very Low'}
                      </td>
                      {matrix[rowIdx].map((val, colIdx) => (
                        <td
                          key={colIdx}
                          className={`p-3 border-r border-slate-700/30 font-bold transition-transform hover:scale-105 cursor-default ${getCellColor(val)}`}
                        >
                          <div className="text-sm">{val}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex justify-end ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
