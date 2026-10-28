import { describe, it, expect, beforeEach } from 'vitest';
import { loadRecords, saveRecords, resetToSampleRecords } from '../utils/storage';
import { LOCAL_STORAGE_KEY } from '../types/constants';
import { SAMPLE_RECORDS } from '../data/sampleRecords';

describe('Storage Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads sample records when localStorage is empty', () => {
    const loaded = loadRecords();
    expect(loaded.length).toBe(SAMPLE_RECORDS.length);
    expect(loaded[0].id).toBe(SAMPLE_RECORDS[0].id);
  });

  it('saves and reloads custom records from localStorage', () => {
    const custom = [
      {
        id: 'RSK-999',
        title: 'Custom Test Risk',
        type: 'Risk',
        category: 'Technical',
        probability: 3,
        impact: 4,
        status: 'Open',
      },
    ];

    saveRecords(custom);
    const loaded = loadRecords();
    expect(loaded.length).toBe(1);
    expect(loaded[0].id).toBe('RSK-999');
    expect(loaded[0].title).toBe('Custom Test Risk');
  });

  it('falls back safely to sample records if localStorage content is corrupted JSON', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'invalid-json-{[}');
    const loaded = loadRecords();
    expect(loaded.length).toBe(SAMPLE_RECORDS.length);
  });

  it('resets register back to sample records when resetToSampleRecords is called', () => {
    saveRecords([{ id: 'TEMP-1', title: 'Temporary' }]);
    expect(loadRecords().length).toBe(1);

    const reset = resetToSampleRecords();
    expect(reset.length).toBe(SAMPLE_RECORDS.length);
    expect(loadRecords().length).toBe(SAMPLE_RECORDS.length);
  });
});

