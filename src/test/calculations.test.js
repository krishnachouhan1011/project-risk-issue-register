import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  getSeverity,
  isUnresolved,
  isOverdue,
  calculateMetrics,
} from '../utils/calculations';
import { RECORD_TYPES, SEVERITY_LEVELS } from '../types/constants';

describe('calculateScore', () => {
  it('calculates risk score as probability * impact on a 1-5 scale', () => {
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 1, impact: 1 })).toBe(1);
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 3, impact: 4 })).toBe(12);
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 5, impact: 5 })).toBe(25);
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 2, impact: 5 })).toBe(10);
  });

  it('clamps probability and impact to 1-5 range', () => {
    // Underflow clamped to 1
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 0, impact: -2 })).toBe(1);
    // Overflow clamped to 5
    expect(calculateScore({ type: RECORD_TYPES.RISK, probability: 10, impact: 99 })).toBe(25);
  });

  it('calculates issue score correctly where probability defaults to 5 (active materialized event)', () => {
    expect(calculateScore({ type: RECORD_TYPES.ISSUE, impact: 1 })).toBe(5);
    expect(calculateScore({ type: RECORD_TYPES.ISSUE, impact: 3 })).toBe(15);
    expect(calculateScore({ type: RECORD_TYPES.ISSUE, impact: 5 })).toBe(25);
  });

  it('handles null or empty records gracefully', () => {
    expect(calculateScore(null)).toBe(0);
    expect(calculateScore({})).toBe(1); // clamps 1 * 1
  });
});

describe('getSeverity Thresholds', () => {
  it('assigns Low severity for scores 1 to 5', () => {
    expect(getSeverity(1).key).toBe(SEVERITY_LEVELS.LOW.key);
    expect(getSeverity(3).key).toBe(SEVERITY_LEVELS.LOW.key);
    expect(getSeverity(5).key).toBe(SEVERITY_LEVELS.LOW.key);
  });

  it('assigns Medium severity for scores 6 to 11', () => {
    expect(getSeverity(6).key).toBe(SEVERITY_LEVELS.MEDIUM.key);
    expect(getSeverity(8).key).toBe(SEVERITY_LEVELS.MEDIUM.key);
    expect(getSeverity(10).key).toBe(SEVERITY_LEVELS.MEDIUM.key);
    expect(getSeverity(11).key).toBe(SEVERITY_LEVELS.MEDIUM.key);
  });

  it('assigns High severity for scores 12 to 19', () => {
    expect(getSeverity(12).key).toBe(SEVERITY_LEVELS.HIGH.key);
    expect(getSeverity(15).key).toBe(SEVERITY_LEVELS.HIGH.key);
    expect(getSeverity(16).key).toBe(SEVERITY_LEVELS.HIGH.key);
    expect(getSeverity(19).key).toBe(SEVERITY_LEVELS.HIGH.key);
  });

  it('assigns Critical severity for scores 20 to 25', () => {
    expect(getSeverity(20).key).toBe(SEVERITY_LEVELS.CRITICAL.key);
    expect(getSeverity(24).key).toBe(SEVERITY_LEVELS.CRITICAL.key);
    expect(getSeverity(25).key).toBe(SEVERITY_LEVELS.CRITICAL.key);
  });

  it('properly validates boundary edge cases', () => {
    expect(getSeverity(5).key).toBe('Low');
    expect(getSeverity(6).key).toBe('Medium');
    expect(getSeverity(11).key).toBe('Medium');
    expect(getSeverity(12).key).toBe('High');
    expect(getSeverity(19).key).toBe('High');
    expect(getSeverity(20).key).toBe('Critical');
  });
});

describe('isUnresolved', () => {
  it('identifies unresolved risks correctly', () => {
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'Open' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'Identified' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'In Progress' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'Accepted' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'Mitigated' })).toBe(false);
    expect(isUnresolved({ type: RECORD_TYPES.RISK, status: 'Closed' })).toBe(false);
  });

  it('identifies unresolved issues correctly', () => {
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'Reported' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'Investigating' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'In Progress' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'Escalated' })).toBe(true);
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'Resolved' })).toBe(false);
    expect(isUnresolved({ type: RECORD_TYPES.ISSUE, status: 'Closed' })).toBe(false);
  });
});

describe('calculateMetrics', () => {
  const testRecords = [
    { type: 'Risk', probability: 4, impact: 5, status: 'Open', reviewDate: '2026-10-01' }, // score 20, critical, unresolved
    { type: 'Risk', probability: 2, impact: 2, status: 'Mitigated', reviewDate: '2026-12-01' }, // score 4, low, resolved
    { type: 'Issue', impact: 4, status: 'Investigating', reviewDate: '2026-10-01' }, // score 20, critical, unresolved
    { type: 'Issue', impact: 2, status: 'Resolved', reviewDate: '2026-10-01' }, // score 10, medium, resolved
  ];

  it('aggregates summary statistics accurately', () => {
    const metrics = calculateMetrics(testRecords);
    expect(metrics.total).toBe(4);
    expect(metrics.riskCount).toBe(2);
    expect(metrics.issueCount).toBe(2);
    expect(metrics.unresolvedRisks).toBe(1);
    expect(metrics.unresolvedIssues).toBe(1);
    expect(metrics.totalUnresolved).toBe(2);
    expect(metrics.highAndCriticalCount).toBe(2);
    expect(metrics.avgRiskScore).toBe('12.0'); // (20 + 4) / 2
  });
});

