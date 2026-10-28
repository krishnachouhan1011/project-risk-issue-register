import { LOCAL_STORAGE_KEY } from '../types/constants';
import { SAMPLE_RECORDS } from '../data/sampleRecords';

/**
 * Loads records from localStorage, falling back to SAMPLE_RECORDS
 */
export function loadRecords() {
  try {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!rawData) {
      // Initialize with sample records
      saveRecords(SAMPLE_RECORDS);
      return SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SAMPLE_RECORDS;
  } catch (err) {
    console.error('Failed to load records from localStorage:', err);
    return SAMPLE_RECORDS;
  }
}

/**
 * Saves records array to localStorage
 */
export function saveRecords(records) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (err) {
    console.error('Failed to save records to localStorage:', err);
    return false;
  }
}

/**
 * Resets the register to original sample data
 */
export function resetToSampleRecords() {
  saveRecords(SAMPLE_RECORDS);
  return SAMPLE_RECORDS;
}

