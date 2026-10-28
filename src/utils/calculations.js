import {
  RECORD_TYPES,
  SEVERITY_LEVELS,
  RESOLVED_RISK_STATUSES,
  RESOLVED_ISSUE_STATUSES,
} from '../types/constants';

/**
 * Clamps a number between min and max
 */
export function clamp(value, min = 1, max = 5) {
  const num = Number(value);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculate initial score for a Risk or Issue.
 *
 * For Risks:
 *   Score = Probability (1-5) * Impact (1-5) [Range: 1 - 25]
 *
 * For Issues:
 *   Issues represent materialized events where occurrence has happened (probability = 5 / 100%).
 *   Score = (Probability || 5) * Impact (1-5) [Range: 5 - 25]
 */
export function calculateScore(record) {
  if (!record) return 0;

  const impact = clamp(record.impact, 1, 5);

  if (record.type === RECORD_TYPES.ISSUE) {
    const probability = record.probability ? clamp(record.probability, 1, 5) : 5;
    return probability * impact;
  }

  const probability = clamp(record.probability, 1, 5);
  return probability * impact;
}

/**
 * Returns documented severity level based on score.
 * Thresholds:
 *   1  - 5  : Low
 *   6  - 11 : Medium
 *   12 - 19 : High
 *   20 - 25 : Critical
 */
export function getSeverity(score) {
  const numericScore = Number(score) || 0;

  if (numericScore >= 20) {
    return SEVERITY_LEVELS.CRITICAL;
  }
  if (numericScore >= 12) {
    return SEVERITY_LEVELS.HIGH;
  }
  if (numericScore >= 6) {
    return SEVERITY_LEVELS.MEDIUM;
  }
  return SEVERITY_LEVELS.LOW;
}

/**
 * Checks whether an item is unresolved.
 * For Risks: not in ['Mitigated', 'Closed']
 * For Issues: not in ['Resolved', 'Closed']
 */
export function isUnresolved(record) {
  if (!record || !record.status) return false;
  if (record.type === RECORD_TYPES.ISSUE) {
    return !RESOLVED_ISSUE_STATUSES.includes(record.status);
  }
  return !RESOLVED_RISK_STATUSES.includes(record.status);
}

/**
 * Check if review date is overdue (earlier than today) and still unresolved
 */
export function isOverdue(record, referenceDate = new Date()) {
  if (!record || !record.reviewDate || !isUnresolved(record)) return false;
  const review = new Date(record.reviewDate);
  if (isNaN(review.getTime())) return false;

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  return review < today;
}

/**
 * Formats relative date (e.g., "Overdue by 3 days", "Due tomorrow", "In 12 days")
 */
export function getRelativeDateText(dateStr, referenceDate = new Date()) {
  if (!dateStr) return '';
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return dateStr;

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays === -1) return 'Overdue by 1 day';
  if (diffDays < -1) return `Overdue by ${Math.abs(diffDays)} days`;
  if (diffDays <= 7) return `Due in ${diffDays} days`;
  return dateStr;
}

/**
 * Generates initials and a consistent avatar background color for an owner name
 */
export function getOwnerAvatar(name = '') {
  const cleanName = name.replace(/\(.*?\)/g, '').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : (cleanName.slice(0, 2) || '??').toUpperCase();

  const colors = [
    'bg-indigo-100 text-indigo-700 border-indigo-200',
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-sky-100 text-sky-700 border-sky-200',
    'bg-teal-100 text-teal-700 border-teal-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-rose-100 text-rose-700 border-rose-200',
  ];

  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;

  return {
    initials,
    cleanName,
    avatarClass: colors[colorIndex],
  };
}

/**
 * Calculates summary metrics for the register
 */
export function calculateMetrics(records = []) {
  const total = records.length;
  let riskCount = 0;
  let issueCount = 0;
  let unresolvedRisks = 0;
  let unresolvedIssues = 0;
  let highAndCriticalCount = 0;
  let totalRiskScore = 0;
  let overdueCount = 0;

  records.forEach((rec) => {
    const isRisk = rec.type === RECORD_TYPES.RISK;
    const unresolved = isUnresolved(rec);
    const score = calculateScore(rec);
    const severity = getSeverity(score);

    if (isRisk) {
      riskCount += 1;
      totalRiskScore += score;
      if (unresolved) unresolvedRisks += 1;
    } else {
      issueCount += 1;
      if (unresolved) unresolvedIssues += 1;
    }

    if (severity.key === 'High' || severity.key === 'Critical') {
      highAndCriticalCount += 1;
    }

    if (isOverdue(rec)) {
      overdueCount += 1;
    }
  });

  const avgRiskScore = riskCount > 0 ? (totalRiskScore / riskCount).toFixed(1) : '0.0';

  // Total Risk Exposure Index (Score of all active/unresolved risks and issues)
  const totalActiveScore = records.reduce((acc, rec) => {
    return isUnresolved(rec) ? acc + calculateScore(rec) : acc;
  }, 0);

  return {
    total,
    riskCount,
    issueCount,
    unresolvedRisks,
    unresolvedIssues,
    totalUnresolved: unresolvedRisks + unresolvedIssues,
    highAndCriticalCount,
    avgRiskScore,
    overdueCount,
    totalActiveScore,
  };
}
