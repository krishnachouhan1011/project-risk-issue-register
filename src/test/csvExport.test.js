import { describe, it, expect } from 'vitest';
import { escapeCsvValue, generateCsv } from '../utils/csvExport';

describe('CSV Escaping and Formatting', () => {
  it('returns plain string without quotes when no special chars are present', () => {
    expect(escapeCsvValue('Simple Text')).toBe('Simple Text');
    expect(escapeCsvValue(123)).toBe('123');
  });

  it('handles null and undefined values as empty strings', () => {
    expect(escapeCsvValue(null)).toBe('');
    expect(escapeCsvValue(undefined)).toBe('');
  });

  it('escapes fields containing commas with enclosing quotes', () => {
    expect(escapeCsvValue('Jenkins, Sarah')).toBe('"Jenkins, Sarah"');
    expect(escapeCsvValue('Technical, Architecture')).toBe('"Technical, Architecture"');
  });

  it('escapes fields containing double quotes by doubling them and enclosing in quotes', () => {
    expect(escapeCsvValue('Fix the "critical" bug')).toBe('"Fix the ""critical"" bug"');
    expect(escapeCsvValue('"Quoted"')).toBe('"""Quoted"""');
  });

  it('escapes fields containing newlines with quotes', () => {
    expect(escapeCsvValue("Line 1\nLine 2")).toBe("\"Line 1\nLine 2\"");
    expect(escapeCsvValue("Line 1\r\nLine 2")).toBe("\"Line 1\r\nLine 2\"");
  });

  it('generates well-structured CSV output with headers and properly escaped rows', () => {
    const records = [
      {
        id: 'RSK-001',
        title: 'Title with, comma',
        type: 'Risk',
        category: 'Technical',
        status: 'Open',
        probability: 4,
        impact: 3,
        owner: 'Jane "Engineer" Doe',
        reviewDate: '2026-11-01',
        plan: 'Line 1\nLine 2',
        description: 'Simple description',
        createdAt: '2026-10-01',
        updatedAt: '2026-10-02',
      },
    ];

    const csv = generateCsv(records);
    const lines = csv.split('\r\n');

    expect(lines.length).toBe(2);
    expect(lines[0]).toContain('ID,Title,Type,Category,Status');
    expect(lines[1]).toContain('"Title with, comma"');
    expect(lines[1]).toContain('"Jane ""Engineer"" Doe"');
    expect(lines[1]).toContain('"Line 1\nLine 2"');
  });
});

