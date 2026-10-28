export const RECORD_TYPES = {
  RISK: 'Risk',
  ISSUE: 'Issue',
};

export const CATEGORIES = [
  'Technical',
  'Schedule & Timeline',
  'Budget & Financial',
  'Resource & Staffing',
  'Operational',
  'Compliance & Legal',
  'Scope & Requirements',
  'External & Vendor',
];

export const RISK_STATUSES = [
  'Identified',
  'Open',
  'In Progress',
  'Mitigated',
  'Accepted',
  'Closed',
];

export const ISSUE_STATUSES = [
  'Reported',
  'Investigating',
  'In Progress',
  'Escalated',
  'Resolved',
  'Closed',
];

// Resolved / inactive statuses
export const RESOLVED_RISK_STATUSES = ['Mitigated', 'Closed'];
export const RESOLVED_ISSUE_STATUSES = ['Resolved', 'Closed'];

export const PROBABILITY_LEVELS = [
  { value: 1, label: '1 - Very Low (1-20%)', description: 'Rare occurrence, unlikely to happen' },
  { value: 2, label: '2 - Low (21-40%)', description: 'Unlikely, but possible during project lifecycle' },
  { value: 3, label: '3 - Moderate (41-60%)', description: 'Reasonable chance of occurrence' },
  { value: 4, label: '4 - High (61-80%)', description: 'Likely to occur without preventive measures' },
  { value: 5, label: '5 - Very High (81-100%)', description: 'Almost certain to occur' },
];

export const IMPACT_LEVELS = [
  { value: 1, label: '1 - Negligible', description: 'Minimal disruption, negligible budget/schedule impact' },
  { value: 2, label: '2 - Minor', description: 'Minor delay or cost variance (<5%), easily absorbed' },
  { value: 3, label: '3 - Moderate', description: 'Noticeable delay (<10%) or cost increase, requires adjustment' },
  { value: 4, label: '4 - Major', description: 'Significant delay (>15%) or budget impact, scope reduction' },
  { value: 5, label: '5 - Critical', description: 'Severe project derailment, major contractual or safety breach' },
];

/**
 * Severity Thresholds (Score: 1 - 25)
 * Score = Probability (1-5) * Impact (1-5)
 *
 * Low: 1 - 5
 * Medium: 6 - 11
 * High: 12 - 19
 * Critical: 20 - 25
 */
export const SEVERITY_LEVELS = {
  LOW: {
    key: 'Low',
    minScore: 1,
    maxScore: 5,
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    color: '#059669',
    description: 'Minor threat; routine monitoring and review.',
  },
  MEDIUM: {
    key: 'Medium',
    minScore: 6,
    maxScore: 11,
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    color: '#d97706',
    description: 'Moderate threat; proactive mitigation action required.',
  },
  HIGH: {
    key: 'High',
    minScore: 12,
    maxScore: 19,
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    color: '#ea580c',
    description: 'Significant threat; priority mitigation and management escalation.',
  },
  CRITICAL: {
    key: 'Critical',
    minScore: 20,
    maxScore: 25,
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    color: '#e11d48',
    description: 'Immediate threat; executive intervention and immediate containment plan.',
  },
};

export const LOCAL_STORAGE_KEY = 'project_risk_issue_register_data_v1';

