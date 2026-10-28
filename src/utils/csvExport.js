import { calculateScore, getSeverity } from './calculations';

/**
 * Escapes a single CSV cell value according to RFC 4180:
 * - If value contains comma, quotes, or newlines, enclose in double quotes
 * - Double quotes inside are escaped by doubling them (" -> "")
 */
export function escapeCsvValue(val) {
  if (val === null || val === undefined) {
    return '';
  }

  const stringVal = String(val);

  // Check if string contains characters that require escaping
  const requiresQuotes = /[",\r\n]/.test(stringVal);

  if (requiresQuotes) {
    return `"${stringVal.replace(/"/g, '""')}"`;
  }

  return stringVal;
}

/**
 * Converts an array of register records to a CSV string
 */
export function generateCsv(records = []) {
  const headers = [
    'ID',
    'Title',
    'Type',
    'Category',
    'Status',
    'Probability (1-5)',
    'Impact (1-5)',
    'Score (1-25)',
    'Severity',
    'Owner',
    'Review / Target Date',
    'Mitigation / Resolution Plan',
    'Description',
    'Created At',
    'Updated At',
  ];

  const rows = records.map((rec) => {
    const score = calculateScore(rec);
    const severity = getSeverity(score).key;

    return [
      escapeCsvValue(rec.id),
      escapeCsvValue(rec.title),
      escapeCsvValue(rec.type),
      escapeCsvValue(rec.category),
      escapeCsvValue(rec.status),
      escapeCsvValue(rec.probability),
      escapeCsvValue(rec.impact),
      escapeCsvValue(score),
      escapeCsvValue(severity),
      escapeCsvValue(rec.owner),
      escapeCsvValue(rec.reviewDate),
      escapeCsvValue(rec.plan),
      escapeCsvValue(rec.description),
      escapeCsvValue(rec.createdAt),
      escapeCsvValue(rec.updatedAt),
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

/**
 * Triggers a browser download of the records as a CSV file
 */
export function exportToCsv(records = [], filenamePrefix = 'project-risk-issue-register') {
  const csvContent = generateCsv(records);
  // Add UTF-8 BOM so Excel opens it with proper character encoding
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `${filenamePrefix}-${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

