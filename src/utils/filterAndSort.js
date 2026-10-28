import { calculateScore, getSeverity, isUnresolved, isOverdue } from './calculations';
import { RECORD_TYPES } from '../types/constants';

/**
 * Filter and sort records according to current criteria
 */
export function filterAndSortRecords(records = [], options = {}) {
  const {
    searchTerm = '',
    typeFilter = 'All',
    categoryFilter = 'All',
    statusFilter = 'All',
    severityFilter = 'All',
    unresolvedOnly = false,
    quickFilter = 'all', // 'all', 'unresolved', 'unresolved_issues', 'unresolved_risks', 'high_critical', 'overdue'
    matrixCell = null,   // { probability, impact }
    sortBy = 'score',
    sortDirection = 'desc',
  } = options;

  const normalizedSearch = searchTerm.trim().toLowerCase();

  // 1. Filter
  const filtered = records.filter((rec) => {
    // Search term check
    if (normalizedSearch) {
      const matchSearch =
        (rec.title && rec.title.toLowerCase().includes(normalizedSearch)) ||
        (rec.description && rec.description.toLowerCase().includes(normalizedSearch)) ||
        (rec.owner && rec.owner.toLowerCase().includes(normalizedSearch)) ||
        (rec.plan && rec.plan.toLowerCase().includes(normalizedSearch)) ||
        (rec.category && rec.category.toLowerCase().includes(normalizedSearch)) ||
        (rec.id && rec.id.toLowerCase().includes(normalizedSearch));

      if (!matchSearch) return false;
    }

    // Type filter
    if (typeFilter !== 'All' && rec.type !== typeFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'All' && rec.category !== categoryFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'All' && rec.status !== statusFilter) {
      return false;
    }

    const score = calculateScore(rec);
    const severity = getSeverity(score).key;

    // Severity filter
    if (severityFilter !== 'All' && severity !== severityFilter) {
      return false;
    }

    // Unresolved only toggle
    if (unresolvedOnly && !isUnresolved(rec)) {
      return false;
    }

    // Matrix cell heatmap filter
    if (matrixCell) {
      const recProb = rec.type === RECORD_TYPES.ISSUE ? 5 : (Number(rec.probability) || 5);
      const recImp = Number(rec.impact) || 1;
      if (recProb !== matrixCell.probability || recImp !== matrixCell.impact) {
        return false;
      }
    }

    // Quick filter presets
    if (quickFilter === 'unresolved' && !isUnresolved(rec)) {
      return false;
    }
    if (quickFilter === 'unresolved_issues') {
      if (rec.type !== RECORD_TYPES.ISSUE || !isUnresolved(rec)) {
        return false;
      }
    }
    if (quickFilter === 'unresolved_risks') {
      if (rec.type !== RECORD_TYPES.RISK || !isUnresolved(rec)) {
        return false;
      }
    }
    if (quickFilter === 'high_critical') {
      if (severity !== 'High' && severity !== 'Critical') {
        return false;
      }
    }
    if (quickFilter === 'overdue' && !isOverdue(rec)) {
      return false;
    }

    return true;
  });

  // 2. Sort
  return [...filtered].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'score': {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);
        comparison = scoreA - scoreB;
        break;
      }
      case 'probability': {
        const probA = a.type === RECORD_TYPES.ISSUE ? 5 : (Number(a.probability) || 0);
        const probB = b.type === RECORD_TYPES.ISSUE ? 5 : (Number(b.probability) || 0);
        comparison = probA - probB;
        break;
      }
      case 'impact': {
        const impA = Number(a.impact) || 0;
        const impB = Number(b.impact) || 0;
        comparison = impA - impB;
        break;
      }
      case 'reviewDate': {
        const dateA = a.reviewDate ? new Date(a.reviewDate).getTime() : 0;
        const dateB = b.reviewDate ? new Date(b.reviewDate).getTime() : 0;
        comparison = dateA - dateB;
        break;
      }
      case 'title': {
        comparison = (a.title || '').localeCompare(b.title || '');
        break;
      }
      case 'status': {
        comparison = (a.status || '').localeCompare(b.status || '');
        break;
      }
      case 'category': {
        comparison = (a.category || '').localeCompare(b.category || '');
        break;
      }
      case 'type': {
        comparison = (a.type || '').localeCompare(b.type || '');
        break;
      }
      case 'id':
      default: {
        comparison = (a.id || '').localeCompare(b.id || '');
        break;
      }
    }

    return sortDirection === 'desc' ? -comparison : comparison;
  });
}
