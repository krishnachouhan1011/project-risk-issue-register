import { describe, it, expect } from 'vitest';
import { filterAndSortRecords } from '../utils/filterAndSort';
import { RECORD_TYPES } from '../types/constants';

describe('Filter and Sort Records', () => {
  const records = [
    {
      id: 'RSK-001',
      title: 'Database connection pool leakage',
      description: 'High traffic crashes backend',
      type: 'Risk',
      category: 'Technical',
      probability: 4,
      impact: 5, // Score = 20 (Critical)
      status: 'Open',
      reviewDate: '2026-11-10',
      owner: 'Alice Dev',
    },
    {
      id: 'RSK-002',
      title: 'Minor vendor delay',
      description: 'Vendor may ship 2 days late',
      type: 'Risk',
      category: 'External & Vendor',
      probability: 2,
      impact: 2, // Score = 4 (Low)
      status: 'Mitigated',
      reviewDate: '2026-12-01',
      owner: 'Bob PM',
    },
    {
      id: 'ISS-001',
      title: 'Production Auth Outage',
      description: 'OAuth tokens expired',
      type: 'Issue',
      category: 'Technical',
      probability: 5,
      impact: 4, // Score = 20 (Critical)
      status: 'Investigating',
      reviewDate: '2026-10-25',
      owner: 'Charlie Ops',
    },
    {
      id: 'ISS-002',
      title: 'Typo on billing invoice footer',
      description: 'Misspelled support email',
      type: 'Issue',
      category: 'Operational',
      probability: 5,
      impact: 1, // Score = 5 (Low)
      status: 'Resolved',
      reviewDate: '2026-10-20',
      owner: 'Diana Billing',
    },
  ];

  it('filters by search term in title, description, or owner', () => {
    const res = filterAndSortRecords(records, { searchTerm: 'OAuth' });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('ISS-001');

    const byOwner = filterAndSortRecords(records, { searchTerm: 'Alice' });
    expect(byOwner.length).toBe(1);
    expect(byOwner[0].id).toBe('RSK-001');
  });

  it('filters strictly by Record Type (Risk vs Issue)', () => {
    const risks = filterAndSortRecords(records, { typeFilter: RECORD_TYPES.RISK });
    expect(risks.every((r) => r.type === RECORD_TYPES.RISK)).toBe(true);
    expect(risks.length).toBe(2);

    const issues = filterAndSortRecords(records, { typeFilter: RECORD_TYPES.ISSUE });
    expect(issues.every((r) => r.type === RECORD_TYPES.ISSUE)).toBe(true);
    expect(issues.length).toBe(2);
  });

  it('filters unresolved issues correctly', () => {
    const unresolvedIssues = filterAndSortRecords(records, {
      typeFilter: RECORD_TYPES.ISSUE,
      unresolvedOnly: true,
    });
    expect(unresolvedIssues.length).toBe(1);
    expect(unresolvedIssues[0].id).toBe('ISS-001');
    expect(unresolvedIssues[0].status).toBe('Investigating');
  });

  it('filters using the quickFilter presets', () => {
    // Quick filter for unresolved issues only
    const res = filterAndSortRecords(records, { quickFilter: 'unresolved_issues' });
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('ISS-001');

    // Quick filter for high and critical items
    const highCrit = filterAndSortRecords(records, { quickFilter: 'high_critical' });
    expect(highCrit.length).toBe(2); // RSK-001 (20) & ISS-001 (20)
  });

  it('sorts unresolved issues and records by score descending', () => {
    const sorted = filterAndSortRecords(records, { sortBy: 'score', sortDirection: 'desc' });
    expect(sorted[0].impact).toBeGreaterThanOrEqual(sorted[sorted.length - 1].impact);
    expect([20, 20]).toContain(sorted[0].probability * sorted[0].impact);
  });

  it('sorts by reviewDate ascending', () => {
    const sorted = filterAndSortRecords(records, { sortBy: 'reviewDate', sortDirection: 'asc' });
    expect(sorted[0].reviewDate).toBe('2026-10-20');
    expect(sorted[sorted.length - 1].reviewDate).toBe('2026-12-01');
  });
});

