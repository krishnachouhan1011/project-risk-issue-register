import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  RECORD_TYPES,
  CATEGORIES,
  RISK_STATUSES,
  ISSUE_STATUSES,
  PROBABILITY_LEVELS,
  IMPACT_LEVELS,
} from '../types/constants';
import { calculateScore, getSeverity } from '../utils/calculations';

export default function RecordModal({
  isOpen,
  mode = 'create',
  record = null,
  onSave,
  onClose,
  isDark = false,
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: RECORD_TYPES.RISK,
    category: CATEGORIES[0],
    probability: 3,
    impact: 3,
    owner: '',
    plan: '',
    reviewDate: new Date().toISOString().split('T')[0],
    status: RISK_STATUSES[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({
        id: record.id,
        title: record.title || '',
        description: record.description || '',
        type: record.type || RECORD_TYPES.RISK,
        category: record.category || CATEGORIES[0],
        probability: record.probability !== undefined ? Number(record.probability) : 3,
        impact: record.impact !== undefined ? Number(record.impact) : 3,
        owner: record.owner || '',
        plan: record.plan || '',
        reviewDate: record.reviewDate || new Date().toISOString().split('T')[0],
        status: record.status || (record.type === RECORD_TYPES.ISSUE ? ISSUE_STATUSES[0] : RISK_STATUSES[0]),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: RECORD_TYPES.RISK,
        category: CATEGORIES[0],
        probability: 3,
        impact: 3,
        owner: '',
        plan: '',
        reviewDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: RISK_STATUSES[0],
      });
    }
    setErrors({});
  }, [record, isOpen]);

  if (!isOpen) return null;

  const isRisk = formData.type === RECORD_TYPES.RISK;
  const currentScore = calculateScore(formData);
  const currentSeverity = getSeverity(currentScore);

  const handleTypeChange = (newType) => {
    const isNowRisk = newType === RECORD_TYPES.RISK;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      probability: isNowRisk ? 3 : 5,
      status: isNowRisk ? RISK_STATUSES[0] : ISSUE_STATUSES[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.owner.trim()) newErrors.owner = 'Owner is required';
    if (!formData.reviewDate) newErrors.reviewDate = 'Review / Target Date is required';
    if (!formData.plan.trim()) {
      newErrors.plan = isRisk ? 'Mitigation plan is required' : 'Resolution plan is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      probability: Number(formData.probability),
      impact: Number(formData.impact),
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className={`rounded-2xl max-w-2xl w-full border overflow-hidden shadow-2xl transform transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <h2 id="record-modal-title" className="text-lg font-bold">
              {mode === 'edit' ? `Edit ${formData.type}` : 'New Register Entry'}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === 'edit'
                ? `Updating entry ID: ${formData.id}`
                : 'Document a potential project risk or active operational issue'}
            </p>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Type Selector (Risk vs Issue) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Record Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTypeChange(RECORD_TYPES.RISK)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    isRisk
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-500 ring-2 ring-amber-500/20'
                      : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Project Risk (Potential)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange(RECORD_TYPES.ISSUE)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    !isRisk
                      ? 'bg-rose-500/15 border-rose-500/50 text-rose-500 ring-2 ring-rose-500/20'
                      : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Active Issue (Occurred)</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title-input" className="block text-xs font-bold text-slate-300 mb-1">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title-input"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={isRisk ? 'e.g., Database connection pool saturation during peak sale' : 'e.g., Critical third-party auth service downtime'}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                  errors.title
                    ? 'border-rose-500 ring-1 ring-rose-500'
                    : isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category-select" className="block text-xs font-bold text-slate-300 mb-1">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="category-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status-select" className="block text-xs font-bold text-slate-300 mb-1">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  id="status-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {(isRisk ? RISK_STATUSES : ISSUE_STATUSES).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Score Preview Card */}
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="text-xs font-semibold text-slate-400">Calculated Severity Score</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-3xl font-black text-sky-400">{currentScore}</span>
                  <span className="text-xs text-slate-400 font-semibold">/ 25</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${currentSeverity.badgeBg}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {currentSeverity.key}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-[240px] text-right hidden sm:block">
                {currentSeverity.description}
              </p>
            </div>

            {/* Probability & Impact Interactive Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prob-select" className="block text-xs font-bold text-slate-300 mb-1">
                  {isRisk ? 'Probability (1–5)' : 'Occurrence State (Fixed / 100%)'}
                </label>
                {isRisk ? (
                  <>
                    <div className="grid grid-cols-5 gap-1.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormData({ ...formData, probability: lvl })}
                          className={`py-1.5 text-xs font-extrabold rounded-lg border transition-all cursor-pointer ${
                            formData.probability === lvl
                              ? 'bg-sky-500 text-white border-sky-400 shadow-glow-sky'
                              : isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                    {/* Native select for accessibility and automated tests */}
                    <select
                      id="prob-select"
                      value={formData.probability}
                      onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                      className={`w-full px-3 py-1.5 text-xs rounded-lg border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {PROBABILITY_LEVELS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <div className={`px-3 py-2 text-xs rounded-xl border font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    5 - Materialized Event (100% Certainty)
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="impact-select" className="block text-xs font-bold text-slate-300 mb-1">
                  Impact (1–5) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5 mb-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, impact: lvl })}
                      className={`py-1.5 text-xs font-extrabold rounded-lg border transition-all cursor-pointer ${
                        formData.impact === lvl
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <select
                  id="impact-select"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: Number(e.target.value) })}
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {IMPACT_LEVELS.map((imp) => (
                    <option key={imp.value} value={imp.value}>
                      {imp.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Owner & Target Review Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="owner-input" className="block text-xs font-bold text-slate-300 mb-1">
                  Owner <span className="text-rose-500">*</span>
                </label>
                <input
                  id="owner-input"
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="e.g., Sarah Jenkins (PM)"
                  className={`w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                    errors.owner
                      ? 'border-rose-500'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                {errors.owner && <p className="text-xs text-rose-500 mt-1">{errors.owner}</p>}
              </div>

              <div>
                <label htmlFor="review-date-input" className="block text-xs font-bold text-slate-300 mb-1">
                  {isRisk ? 'Next Review Date' : 'Target Resolution Date'} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="review-date-input"
                  type="date"
                  value={formData.reviewDate}
                  onChange={(e) => setFormData({ ...formData, reviewDate: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                    errors.reviewDate
                      ? 'border-rose-500'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                {errors.reviewDate && <p className="text-xs text-rose-500 mt-1">{errors.reviewDate}</p>}
              </div>
            </div>

            {/* Mitigation / Resolution Plan */}
            <div>
              <label htmlFor="plan-input" className="block text-xs font-bold text-slate-300 mb-1">
                {isRisk ? 'Mitigation Plan' : 'Resolution Plan'} <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="plan-input"
                rows={3}
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                placeholder={
                  isRisk
                    ? 'Specific controls to reduce probability or impact (preventive & contingency actions)...'
                    : 'Immediate containment plan and permanent root-cause remediation steps...'
                }
                className={`w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                  errors.plan
                    ? 'border-rose-500'
                    : isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              {errors.plan && <p className="text-xs text-rose-500 mt-1">{errors.plan}</p>}
            </div>

            {/* Full Description */}
            <div>
              <label htmlFor="description-input" className="block text-xs font-bold text-slate-300 mb-1">
                Full Description (Optional)
              </label>
              <textarea
                id="description-input"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Background details, triggers, affected systems, or financial impact..."
                className={`w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
