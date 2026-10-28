import React from 'react';
import { calculateScore, getSeverity } from '../utils/calculations';
import { RECORD_TYPES } from '../types/constants';

export default function SeverityMatrixWidget({ records = [], onSelectCell, selectedCell, isDark = false }) {
  // 5x5 grid distribution: prob 1-5 (rows 5 to 1), impact 1-5 (cols 1 to 5)
  const cellCounts = {};

  records.forEach((rec) => {
    const p = rec.type === RECORD_TYPES.ISSUE ? 5 : (Number(rec.probability) || 5);
    const i = Number(rec.impact) || 1;
    const key = `${p}-${i}`;
    cellCounts[key] = (cellCounts[key] || 0) + 1;
  });

  const getCellBg = (prob, imp) => {
    const score = prob * imp;
    const isSelected = selectedCell && selectedCell.probability === prob && selectedCell.impact === imp;

    let base = '';
    if (score >= 20) {
      base = isDark
        ? 'bg-rose-950/70 border-rose-800 text-rose-300 hover:bg-rose-900'
        : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100';
    } else if (score >= 12) {
      base = isDark
        ? 'bg-orange-950/70 border-orange-800 text-orange-300 hover:bg-orange-900'
        : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100';
    } else if (score >= 6) {
      base = isDark
        ? 'bg-amber-950/70 border-amber-800 text-amber-300 hover:bg-amber-900'
        : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100';
    } else {
      base = isDark
        ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300 hover:bg-emerald-900'
        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100';
    }

    if (isSelected) {
      base += ' ring-2 ring-sky-500 font-bold scale-105 z-10 shadow-md';
    }

    return base;
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            5×5 Probability × Impact Heatmap
          </h3>
          <p className="text-[11px] text-slate-500">
            Click any cell to filter the register by severity coordinates
          </p>
        </div>
        {selectedCell && (
          <button
            type="button"
            onClick={() => onSelectCell(null)}
            className="text-xs text-sky-500 hover:underline font-medium"
          >
            Clear matrix filter
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[280px]">
          {/* Header row: Impact 1 to 5 */}
          <div className="grid grid-cols-6 gap-1 text-[10px] font-semibold text-slate-400 text-center mb-1">
            <span className="text-left pl-1">P \ I</span>
            <span>1 Neg</span>
            <span>2 Min</span>
            <span>3 Mod</span>
            <span>4 Maj</span>
            <span>5 Crit</span>
          </div>

          {/* Matrix rows: Prob 5 down to 1 */}
          {[5, 4, 3, 2, 1].map((prob) => (
            <div key={prob} className="grid grid-cols-6 gap-1 mb-1 items-center">
              <span className="text-[10px] font-semibold text-slate-400 text-left pl-1">
                {prob}
              </span>
              {[1, 2, 3, 4, 5].map((imp) => {
                const count = cellCounts[`${prob}-${imp}`] || 0;
                const score = prob * imp;

                return (
                  <button
                    key={imp}
                    type="button"
                    onClick={() =>
                      onSelectCell(
                        selectedCell?.probability === prob && selectedCell?.impact === imp
                          ? null
                          : { probability: prob, impact: imp }
                      )
                    }
                    title={`P:${prob} × I:${imp} = Score ${score} (${count} items)`}
                    className={`h-8 rounded-lg border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${getCellBg(
                      prob,
                      imp
                    )}`}
                  >
                    <span className="text-[11px] font-bold leading-none">
                      {count > 0 ? count : '·'}
                    </span>
                    <span className="text-[8px] opacity-70 leading-none mt-0.5">
                      {score}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

