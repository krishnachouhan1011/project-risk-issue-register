import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import RiskTable from './components/RiskTable';
import RiskCardList from './components/RiskCardList';
import RecordModal from './components/RecordModal';
import DetailModal from './components/DetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import SeverityGuideModal from './components/SeverityGuideModal';
import SeverityMatrixWidget from './components/SeverityMatrixWidget';
import AboutPage from './components/AboutPage';
import { loadRecords, saveRecords, resetToSampleRecords } from './utils/storage';
import { calculateMetrics } from './utils/calculations';
import { filterAndSortRecords } from './utils/filterAndSort';
import { exportToCsv } from './utils/csvExport';
import { RECORD_TYPES } from './types/constants';

export default function App() {
  const [records, setRecords] = useState(() => loadRecords());
  const [currentView, setCurrentView] = useState('register'); // 'register' | 'about'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme_preference');
    return saved !== null ? saved === 'dark' : true;
  });

  // Filter & Sort State
  const [filters, setFilters] = useState({
    searchTerm: '',
    typeFilter: 'All',
    categoryFilter: 'All',
    statusFilter: 'All',
    severityFilter: 'All',
    unresolvedOnly: false,
    quickFilter: 'all',
    matrixCell: null,
    sortBy: 'score',
    sortDirection: 'desc',
  });

  // Modals
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [recordModalMode, setRecordModalMode] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync records to localStorage
  useEffect(() => {
    saveRecords(records);
  }, [records]);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const metrics = useMemo(() => calculateMetrics(records), [records]);

  const filteredRecords = useMemo(
    () => filterAndSortRecords(records, filters),
    [records, filters]
  );

  const generateNextId = (type) => {
    const isRisk = type === RECORD_TYPES.RISK;
    const prefix = isRisk ? 'RSK' : 'ISS';
    const existingNumbers = records
      .filter((r) => r.type === type && r.id?.startsWith(prefix))
      .map((r) => {
        const parts = r.id.split('-');
        return parts[1] ? parseInt(parts[1], 10) : 0;
      })
      .filter((num) => !isNaN(num));

    const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    return `${prefix}-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleUpdateFilters = (updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      typeFilter: 'All',
      categoryFilter: 'All',
      statusFilter: 'All',
      severityFilter: 'All',
      unresolvedOnly: false,
      quickFilter: 'all',
      matrixCell: null,
      sortBy: 'score',
      sortDirection: 'desc',
    });
  };

  const handleSelectQuickFilter = (quickFilterId) => {
    if (filters.quickFilter === quickFilterId) {
      setFilters((prev) => ({
        ...prev,
        quickFilter: 'all',
        unresolvedOnly: false,
        typeFilter: 'All',
      }));
    } else {
      setFilters((prev) => {
        const updated = { ...prev, quickFilter: quickFilterId };
        if (quickFilterId === 'unresolved_issues') {
          updated.typeFilter = RECORD_TYPES.ISSUE;
          updated.unresolvedOnly = true;
        } else if (quickFilterId === 'unresolved_risks') {
          updated.typeFilter = RECORD_TYPES.RISK;
          updated.unresolvedOnly = true;
        } else {
          updated.unresolvedOnly = false;
        }
        return updated;
      });
    }
  };

  const handleSelectMatrixCell = (cell) => {
    setFilters((prev) => ({
      ...prev,
      matrixCell: cell,
    }));
  };

  const handleSort = (columnKey) => {
    setFilters((prev) => {
      if (prev.sortBy === columnKey) {
        return {
          ...prev,
          sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
        };
      }
      return {
        ...prev,
        sortBy: columnKey,
        sortDirection: 'desc',
      };
    });
  };

  const handleOpenNewRecord = () => {
    setSelectedRecord(null);
    setRecordModalMode('create');
    setIsRecordModalOpen(true);
  };

  const handleOpenEditRecord = (rec) => {
    setSelectedRecord(rec);
    setRecordModalMode('edit');
    setIsRecordModalOpen(true);
  };

  const handleSaveRecord = (formData) => {
    const todayStr = new Date().toISOString().split('T')[0];

    if (recordModalMode === 'edit' && selectedRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === selectedRecord.id
            ? {
                ...formData,
                id: selectedRecord.id,
                createdAt: selectedRecord.createdAt || todayStr,
                updatedAt: todayStr,
              }
            : r
        )
      );
      showToast(`Updated ${formData.type} ${selectedRecord.id}`);
    } else {
      const newId = generateNextId(formData.type);
      const newRecord = {
        ...formData,
        id: newId,
        createdAt: todayStr,
        updatedAt: todayStr,
      };
      setRecords((prev) => [newRecord, ...prev]);
      showToast(`Created ${formData.type} ${newId}`);
    }

    setIsRecordModalOpen(false);
    setSelectedRecord(null);
  };

  const handleOpenDetail = (rec) => {
    setDetailRecord(rec);
    setIsDetailModalOpen(true);
  };

  const handleOpenDelete = (rec) => {
    setRecordToDelete(rec);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
    showToast(`Deleted record ${id}`);
  };

  const handleResetSampleData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default sample records? This will replace your current edits.'
      )
    ) {
      const reset = resetToSampleRecords();
      setRecords(reset);
      handleResetFilters();
      showToast('Restored default sample records');
    }
  };

  const handleExportCsv = () => {
    exportToCsv(filteredRecords, 'project-risk-issue-register');
    showToast(`Exported ${filteredRecords.length} records to CSV`);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Toast notification banner */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* Top Navigation */}
      <Header
        onNewRecord={handleOpenNewRecord}
        onExportCsv={handleExportCsv}
        onResetSampleData={handleResetSampleData}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        showHeatmap={showHeatmap}
        onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
        density={density}
        onToggleDensity={() => setDensity(density === 'comfortable' ? 'compact' : 'comfortable')}
        metrics={metrics}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main Content Area */}
      {currentView === 'about' ? (
        <main className="flex-1">
          <AboutPage
            onBackToRegister={() => setCurrentView('register')}
            isDark={isDark}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Metric KPI Summary Cards */}
          <MetricCards
            metrics={metrics}
            activeQuickFilter={filters.quickFilter}
            onSelectQuickFilter={handleSelectQuickFilter}
            isDark={isDark}
          />

          {/* Optional 5x5 Heatmap Matrix Dropdown Widget */}
          {showHeatmap && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
              <SeverityMatrixWidget
                records={records}
                selectedCell={filters.matrixCell}
                onSelectCell={handleSelectMatrixCell}
                isDark={isDark}
              />
            </div>
          )}

          {/* Search & Filter Toolbar */}
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              totalCount={records.length}
              filteredCount={filteredRecords.length}
              isDark={isDark}
            />
          </div>

          {/* View Mode: Table (Desktop) or Card List (Mobile or Toggled) */}
          <div>
            {viewMode === 'table' ? (
              <div className="hidden md:block">
                <RiskTable
                  records={filteredRecords}
                  sortBy={filters.sortBy}
                  sortDirection={filters.sortDirection}
                  onSort={handleSort}
                  onView={handleOpenDetail}
                  onEdit={handleOpenEditRecord}
                  onDelete={handleOpenDelete}
                  onResetFilters={handleResetFilters}
                  density={density}
                  isDark={isDark}
                />
              </div>
            ) : null}

            {/* Cards alternative on mobile screens or when Cards mode is selected */}
            <div className={viewMode === 'table' ? 'md:hidden' : 'block'}>
              <RiskCardList
                records={filteredRecords}
                onView={handleOpenDetail}
                onEdit={handleOpenEditRecord}
                onDelete={handleOpenDelete}
                onResetFilters={handleResetFilters}
                isDark={isDark}
              />
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className={`border-t py-6 text-xs text-center transition-colors ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Project Risk & Active Issue Register • Documented PMBOK / PRINCE2 Severity Scoring Framework
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentView(currentView === 'about' ? 'register' : 'about')}
              className="text-sky-500 hover:text-sky-400 font-bold underline cursor-pointer"
            >
              {currentView === 'about' ? 'Go to Register' : 'About Creator & User Guide'}
            </button>
            <span className="text-slate-600">•</span>
            <p className="text-slate-400">
              Offline-first localStorage architecture
            </p>
          </div>
        </div>
      </footer>

      {/* Dialog Modals */}
      <RecordModal
        isOpen={isRecordModalOpen}
        mode={recordModalMode}
        record={selectedRecord}
        onSave={handleSaveRecord}
        onClose={() => {
          setIsRecordModalOpen(false);
          setSelectedRecord(null);
        }}
        isDark={isDark}
      />

      <DetailModal
        isOpen={isDetailModalOpen}
        record={detailRecord}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDetailRecord(null);
        }}
        onEdit={handleOpenEditRecord}
        onDelete={handleOpenDelete}
        isDark={isDark}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        record={recordToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setRecordToDelete(null);
        }}
        isDark={isDark}
      />

      <SeverityGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}
