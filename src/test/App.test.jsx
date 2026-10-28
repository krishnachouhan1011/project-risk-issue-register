import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { SAMPLE_RECORDS } from '../data/sampleRecords';

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application header and initial sample metrics', () => {
    render(<App />);

    expect(screen.getByText('Project Risk & Issue Register')).toBeInTheDocument();
    expect(screen.getByText('Total Register Items')).toBeInTheDocument();
    expect(screen.getByText('Active Issues (Unresolved)')).toBeInTheDocument();
    expect(screen.getByText('Active Risks (Unresolved)')).toBeInTheDocument();
  });

  it('filters unresolved issues when the Unresolved Issues metric card is clicked', () => {
    render(<App />);

    const unresolvedIssuesCard = screen.getByText('Active Issues (Unresolved)').closest('button');
    fireEvent.click(unresolvedIssuesCard);

    expect(screen.getByText(/Quick Filter: unresolved issues/i)).toBeInTheDocument();
  });

  it('opens new record modal when New Entry button is clicked', () => {
    render(<App />);

    const newBtn = screen.getByRole('button', { name: /New Entry/i });
    fireEvent.click(newBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('New Register Entry')).toBeInTheDocument();
  });

  it('opens 5x5 matrix guide when Matrix Guide button is clicked', () => {
    render(<App />);

    const guideBtn = screen.getByRole('button', { name: /Matrix Guide/i });
    fireEvent.click(guideBtn);

    expect(screen.getByText('Risk & Issue Scoring Framework (5×5 Matrix)')).toBeInTheDocument();
    expect(screen.getByText('Documented Severity Thresholds')).toBeInTheDocument();
  });

  it('navigates to About & User Guide page and shows creator info and user manual', () => {
    render(<App />);

    // Click "About & Guide" tab in header
    const aboutBtn = screen.getByRole('button', { name: /About & Guide/i });
    fireEvent.click(aboutBtn);

    // Verify creator details on default Creator Profile tab
    expect(screen.getByText('Krishna Chouhan')).toBeInTheDocument();
    expect(screen.getByText(/Project Manager & Lead/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Vahlay Consulting Inc/i).length).toBeGreaterThan(0);

    // Switch to User Manual & Guide tab
    const guideTab = screen.getByRole('button', { name: /User Manual & Guide/i });
    fireEvent.click(guideTab);

    // Verify User Guide heading
    expect(screen.getByText(/Complete User Guide & Operating Manual/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. Understanding Risks vs\. Active Issues/i)).toBeInTheDocument();

    // Click return to register button
    const backBtn = screen.getAllByRole('button', { name: /Back to Risk & Issue Register/i })[0];
    fireEvent.click(backBtn);

    // Verify we are back on the register
    expect(screen.getByText('Total Register Items')).toBeInTheDocument();
  });
});
